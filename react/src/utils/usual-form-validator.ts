import { boolean, number, object, string } from 'yup';
import { Gender } from './types';

export const usualFormSchema = object({
  age: number()
    .required()
    .positive('Age field must be positive')
    .integer('Age field must be a number'),
  country: string().required(),
  email: string().email('Email is not valid').required(),
  // file: string().required(),
  gender: string<Gender>().required(),
  name: string()
    .required()
    .test({
      name: '1stUpperCase',
      skipAbsent: true,
      test(value, ctx) {
        if (value[0] === value[0].toUpperCase()) {
          return true;
        }
        return ctx.createError({
          message: 'Name should have first uppercased letter',
        });
      },
    }),
  password: string()
    .min(4, 'Password must be at least 4 characters long')
    .matches(
      /(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{4,}/g,
      {
        message:
          'Please ensure that password contains at least 1 number (0-9), 1 special character(!@#$%^&*), 1 uppercased (A-Z) and 1 lowercased (a-z) latin letter',
      }
    )
    .required('Password is a required field'),
  confirm: string()
    .required('Confirm password is a required field')
    .test({
      name: 'checkTwoPasswds',
      skipAbsent: true,
      test(value, ctx) {
        if (value === this.parent.password) {
          return true;
        }
        return ctx.createError({
          message: 'Passwords should be identical',
        });
      },
    }),

  terms: boolean<true>().required(),
});
// : ObjectSchema<
//   HandeledFormData,
//   AnyObject,
//   UsualFormData,
//   ''
// >
