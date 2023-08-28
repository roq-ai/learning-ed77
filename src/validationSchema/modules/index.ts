import * as yup from 'yup';

export const moduleValidationSchema = yup.object().shape({
  title: yup.string().required(),
  description: yup.string().nullable(),
  date_created: yup.date().required(),
  last_updated: yup.date().required(),
  course_id: yup.string().nullable().required(),
});
