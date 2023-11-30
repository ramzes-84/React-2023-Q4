import Yup, { boolean, number, object, string } from 'yup';
import { Gender } from './types';

export const usualFormSchema = object({
  age: number().required().positive().integer(),
  country: string().required(),
  email: string().email().required(),
  // file: string().required(),
  gender: string<Gender>().required(),
  name: string().required(),
  password: string().required(),
  confirm: string().required(),
  terms: boolean<true>().required(),
});
// : ObjectSchema<
//   HandeledFormData,
//   AnyObject,
//   UsualFormData,
//   ''
// >
