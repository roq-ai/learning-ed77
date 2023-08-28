import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  Flex,
  Center,
} from '@chakra-ui/react';
import Breadcrumbs from 'components/breadcrumb';
import DatePicker from 'components/date-picker';
import { Error } from 'components/error';
import { FormWrapper } from 'components/form-wrapper';
import { NumberInput } from 'components/number-input';
import { SelectInput } from 'components/select-input';
import { AsyncSelect } from 'components/async-select';
import { TextInput } from 'components/text-input';
import AppLayout from 'layout/app-layout';
import { FormikHelpers, useFormik } from 'formik';
import { useRouter } from 'next/router';
import { FunctionComponent, useState, useRef } from 'react';
import * as yup from 'yup';
import useSWR from 'swr';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';
import { ImagePicker } from 'components/image-file-picker';
import { getCertificateById, updateCertificateById } from 'apiSdk/certificates';
import { certificateValidationSchema } from 'validationSchema/certificates';
import { CertificateInterface } from 'interfaces/certificate';
import { ExamInterface } from 'interfaces/exam';
import { UserInterface } from 'interfaces/user';
import { getExams } from 'apiSdk/exams';
import { getUsers } from 'apiSdk/users';

function CertificateEditPage() {
  const router = useRouter();
  const id = router.query.id as string;

  const { data, error, isLoading, mutate } = useSWR<CertificateInterface>(
    () => (id ? `/certificates/${id}` : null),
    () => getCertificateById(id),
  );
  const [formError, setFormError] = useState(null);

  const handleSubmit = async (values: CertificateInterface, { resetForm }: FormikHelpers<any>) => {
    setFormError(null);
    try {
      const updated = await updateCertificateById(id, values);
      mutate(updated);
      resetForm();
      router.push('/certificates');
    } catch (error: any) {
      if (error?.response.status === 403) {
        setFormError({ message: "You don't have permisisons to update this resource" });
      } else {
        setFormError(error);
      }
    }
  };

  const formik = useFormik<CertificateInterface>({
    initialValues: data,
    validationSchema: certificateValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout
      breadcrumbs={
        <Breadcrumbs
          items={[
            {
              label: 'Certificates',
              link: '/certificates',
            },
            {
              label: 'Update Certificate',
              isCurrent: true,
            },
          ]}
        />
      }
    >
      <Box rounded="md">
        <Box mb={4}>
          <Text as="h1" fontSize={{ base: '1.5rem', md: '1.875rem' }} fontWeight="bold" color="base.content">
            Update Certificate
          </Text>
        </Box>
        {(error || formError) && (
          <Box mb={4}>
            <Error error={error || formError} />
          </Box>
        )}

        <FormWrapper onSubmit={formik.handleSubmit}>
          <TextInput
            error={formik.errors.title}
            label={'Title'}
            props={{
              name: 'title',
              placeholder: 'Title',
              value: formik.values?.title,
              onChange: formik.handleChange,
            }}
          />

          <TextInput
            error={formik.errors.description}
            label={'Description'}
            props={{
              name: 'description',
              placeholder: 'Description',
              value: formik.values?.description,
              onChange: formik.handleChange,
            }}
          />

          <FormControl id="date_created" mb="4">
            <FormLabel fontSize="1rem" fontWeight={600}>
              Date Created
            </FormLabel>
            <DatePicker
              selected={formik.values?.date_created ? new Date(formik.values?.date_created) : null}
              onChange={(value: Date) => formik.setFieldValue('date_created', value)}
            />
          </FormControl>
          <FormControl id="last_updated" mb="4">
            <FormLabel fontSize="1rem" fontWeight={600}>
              Last Updated
            </FormLabel>
            <DatePicker
              selected={formik.values?.last_updated ? new Date(formik.values?.last_updated) : null}
              onChange={(value: Date) => formik.setFieldValue('last_updated', value)}
            />
          </FormControl>
          <AsyncSelect<ExamInterface>
            formik={formik}
            name={'exam_id'}
            label={'Select Exam'}
            placeholder={'Select Exam'}
            fetcher={getExams}
            labelField={'title'}
          />
          <AsyncSelect<UserInterface>
            formik={formik}
            name={'user_id'}
            label={'Select User'}
            placeholder={'Select User'}
            fetcher={getUsers}
            labelField={'email'}
          />
          <Flex justifyContent={'flex-start'}>
            <Button
              isDisabled={formik?.isSubmitting}
              bg="state.info.main"
              color="base.100"
              type="submit"
              display="flex"
              height="2.5rem"
              padding="0rem 1rem"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              mr="4"
              _hover={{
                bg: 'state.info.main',
                color: 'base.100',
              }}
            >
              Submit
            </Button>
            <Button
              bg="neutral.transparent"
              color="neutral.main"
              type="button"
              display="flex"
              height="2.5rem"
              padding="0rem 1rem"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              mr="4"
              onClick={() => router.push('/certificates')}
              _hover={{
                bg: 'neutral.transparent',
                color: 'neutral.main',
              }}
            >
              Cancel
            </Button>
          </Flex>
        </FormWrapper>
      </Box>
    </AppLayout>
  );
}

export default compose(
  requireNextAuth({
    redirectTo: '/',
  }),
  withAuthorization({
    service: AccessServiceEnum.PROJECT,
    entity: 'certificate',
    operation: AccessOperationEnum.UPDATE,
  }),
)(CertificateEditPage);
