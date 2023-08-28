import * as yup from 'yup';

export const certificateValidationSchema = yup.object().shape({
  title: yup.string().required(),
  description: yup.string().nullable(),
  date_created: yup.date().required(),
  last_updated: yup.date().required(),
  exam_id: yup.string().nullable().required(),
  user_id: yup.string().nullable().required(),
});
