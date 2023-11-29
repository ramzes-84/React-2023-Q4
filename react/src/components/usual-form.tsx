import { Link } from 'react-router-dom';
import { InputName } from './input-name';
import { InputAge } from './input-age';
import { InputEmail } from './input-email';
import { InputPassword } from './input-password';
import { InputGender } from './input-gender';
import { InputTerms } from './input-terms';
import { InputFile } from './input-file';
import { InputCountry } from './input-country';

export const UsualForm = () => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formValues = new FormData(e.target as HTMLFormElement);
    if (formValues.has('name')) {
      // const nameValue = formValues.get('name');
    } else throw new Error('Error in the form');
  };

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
