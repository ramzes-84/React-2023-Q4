import { boolean, number, object, string } from 'yup';
import { Gender } from './types';

export const age = number()
  .required()
  .positive('Age field must be positive')
  .integer('Age field must be a number');
export const country = string().required();
export const email = string().email('Email is not valid').required();
export const file = string().required('You did not add file');
export const gender = string<Gender>().required();
export const name = string()
  .trim()
  .required()
  .test({
    name: '1stUpperCase',
    skipAbsent: true,
    test(value, ctx) {
      if (value && value[0] === value[0].toUpperCase()) {
        return true;
      }
      return ctx.createError({
        message: 'Name should have first uppercased letter',
      });
    },
  });
export const password = string()
  .min(4, 'Password must be at least 4 characters long')
  .matches(
    /(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{4,}/g,
    {
      message:
        'Please ensure that password contains at least 1 number (0-9), 1 special character(!@#$%^&*), 1 uppercased (A-Z) and 1 lowercased (a-z) latin letter',
    }
  )
  .required('Password is a required field');
export const confirm = string()
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
  });

export const terms = boolean<true>()
  .required()
  .isTrue('You have to agree with T&C');

export const usualFormSchema = object({
  age,
  country,
  email,
  file,
  gender,
  name,
  password,
  confirm,
  terms,
});
