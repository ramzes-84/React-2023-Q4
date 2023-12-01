// import { useSelector } from 'react-redux';
// import { RootState } from '../store/store';

export const InputCountry = () => {
  // const countryList = useSelector(
  //   (state: RootState) => state.countries.COUNTRIES
  // );

  return (
    <label className="text-white " htmlFor="name">
      Country:
      <input
        className="px-2 mx-2 rounded text-blue-900"
        type="text"
        name="country"
        id="country"
        placeholder="Start typing your contry"
      />
    </label>
  );
};
