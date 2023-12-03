import { useForm, SubmitHandler } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { Gender } from '../utils/types';
import { ChangeEvent, ReactElement, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { yupResolver } from '@hookform/resolvers/yup';
import { usualFormSchema } from '../utils/usual-form-validator';
import { reactHookFormDataSlice } from '../store/useform-data-slice';

export type Inputs = {
  name: string;
  age: number;
  email: string;
  country: string;
  file: string;
  gender: NonNullable<Gender | undefined>;
  password: string;
  confirm: string;
  terms: true;
};

export const ReactHookForm = () => {
  const dispatch = useDispatch();
  const navigator = useNavigate();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: yupResolver(usualFormSchema),
  });
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    dispatch(reactHookFormDataSlice.actions.updateData(data));
    setTimeout(() => navigator('/'), 1000);
  };

  const countryList = useSelector(
    (state: RootState) => state.countries.COUNTRIES
  );
  const [searchResults, setSearchResults] = useState<ReactElement[]>([]);

  const handleChangeCountry = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value) {
      const transformedKeyword =
        e.target.value[0].toUpperCase() + e.target.value.slice(1).toLowerCase();
      const searchResults = countryList
        .filter((country) => country.includes(transformedKeyword))
        .map((country) => (
          <li
            className="hover:bg-white"
            key={country}
            onClick={() => {
              setValue('country', country);
              setSearchResults([]);
            }}
          >
            {country}
          </li>
        ));
      setSearchResults(searchResults);
    } else setSearchResults([]);
  };

  return (
    <section className="flex flex-col gap-3 items-center bg-gradient-to-r from-pink-500 to-cyan-500 h-screen py-5">
      <form
        className="flex flex-col justify-center items-center gap-2"
        onSubmit={handleSubmit(onSubmit)}
      >
        <label className="text-white " htmlFor="name">
          Name:
          <input
            {...register('name', { required: true })}
            className="px-2 mx-2 rounded text-blue-900"
            type="text"
            name="name"
            id="name"
            placeholder="Uppercase for 1st letter"
          />
          <p>{errors.name?.message}</p>
        </label>
        <label className="text-white " htmlFor="age">
          Age:
          <input
            {...register('age')}
            className="px-2 mx-2 rounded text-blue-900"
            type="number"
            name="age"
            id="age"
            placeholder="Positive numbers only"
          />
          <p>{errors.age?.message}</p>
        </label>
        <label className="text-white " htmlFor="email">
          E-mail:
          <input
            {...register('email')}
            className="px-2 mx-2 rounded text-blue-900"
            type="text"
            name="email"
            id="email"
          />
          <p>{errors.email?.message}</p>
        </label>
        <label className="text-white " htmlFor="password">
          Password:
          <input
            {...register('password')}
            className="px-2 mx-2 rounded text-blue-900"
            type="text"
            name="password"
            id="password"
          />
          <p>{errors.password?.message}</p>
        </label>
        <label className="text-white " htmlFor="confirm">
          Confirm password:
          <input
            {...register('confirm')}
            className="px-2 mx-2 rounded text-blue-900"
            type="text"
            name="confirm"
            id="confirm"
          />
          <p>{errors.confirm?.message}</p>
        </label>
        <label className="text-white relative" htmlFor="name">
          Country:
          <input
            {...register('country')}
            className="px-2 mx-2 rounded text-blue-900"
            type="text"
            name="country"
            id="country"
            placeholder="Start typing your contry"
            onChange={handleChangeCountry}
          />
          {searchResults.length > 0 ? (
            <ul className="absolute border-2 bg-green-200 rounded left-20  text-slate-800">
              {searchResults}
            </ul>
          ) : null}
          <p>{errors.country?.message}</p>
        </label>
        <label className="text-white " htmlFor="gender">
          Gender:
          <select
            {...register('gender')}
            className="px-2 mx-2 rounded text-blue-900"
            name="gender"
            id="gender"
          >
            <option value={Gender.Male}>Male</option>
            <option value={Gender.Female}>Female</option>
            <option value={Gender.Other}>Other</option>
          </select>
          <p>{errors.gender?.message}</p>
        </label>
        <label className="text-white " htmlFor="file">
          Upload:
          <input
            {...register('file')}
            className="px-2 mx-2 rounded text-blue-900"
            type="file"
            name="file"
            id="file"
            accept=".png, .jpeg"
            required={true}
          />
          <p>{errors.file?.message}</p>
        </label>
        <label className="text-white " htmlFor="terms">
          I agree with T&C:
          <input
            {...register('terms')}
            className="px-2 mx-2 rounded text-blue-900"
            type="checkbox"
            name="terms"
            id="terms"
          />
          <p>{errors.terms?.message}</p>
        </label>

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
