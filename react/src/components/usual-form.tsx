import { Link } from 'react-router-dom';
import { InputName } from './input-name';
import { InputAge } from './input-age';
import { InputEmail } from './input-email';
import { InputPassword } from './input-password';
import { InputGender } from './input-gender';
import { InputTerms } from './input-terms';
import { InputFile } from './input-file';
import { InputCountry } from './input-country';
import {
  FormElements,
  Gender,
  HandeledFormData,
  UsualFormData,
} from '../utils/types';
import { usualFormSchema } from '../utils/usual-form-validator';
import { ObjectSchema } from 'yup';

const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  const formElements = e.target as unknown as FormElements;
  const formData: UsualFormData = {
    age: formElements.age.value,
    country: formElements.country.value,
    email: formElements.email.value,
    file: formElements.file.value,
    gender: formElements.gender.value as Gender,
    name: formElements.name.value,
    password: formElements.password.value,
    confirm: formElements.confirm.value,
    terms: formElements.terms.checked,
  };
  console.log(formData);
  const errors: ObjectSchema<HandeledFormData> =
    usualFormSchema.validate(formData);
};

export const UsualForm = () => {
  return (
    <section className="flex items-center justify-center bg-gradient-to-r from-pink-500 to-cyan-500 h-screen">
      <form
        className="flex flex-col justify-center items-center gap-2"
        onSubmit={handleSubmit}
      >
        <InputName />
        <InputAge />
        <InputEmail />
        <InputPassword />
        <InputCountry />
        <InputGender />
        <InputFile />
        <InputTerms />

        <div className="flex flex-row gap-2">
          <input
            className="text-white border px-3 py-1 rounded-lg"
            type="submit"
            value="Submit"
          />
          <Link to={'/'} className="text-white border px-3 py-1 rounded-lg">
            Back
          </Link>
        </div>
      </form>
    </section>
  );
};
