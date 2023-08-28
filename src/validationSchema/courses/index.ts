import * as yup from 'yup';

export const courseValidationSchema = yup.object().shape({
  title: yup.string().required(),
  description: yup.string().nullable(),
  fee: yup.number().integer().required(),
  date_created: yup.date().required(),
  last_updated: yup.date().required(),
  organization_id: yup.string().nullable().required(),
});
