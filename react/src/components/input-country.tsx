import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { ChangeEvent, ReactElement, useRef, useState } from 'react';

export const InputCountry = () => {
  const countryList = useSelector(
    (state: RootState) => state.countries.COUNTRIES
  );
  const [searchResults, setSearchResults] = useState<ReactElement[]>([]);
  const ref = useRef<HTMLInputElement>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
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
              if (!ref.current) throw Error('ref is not assigned');
              ref.current.value = country;
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
    <label className="text-white relative" htmlFor="name">
      Country:
      <input
        ref={ref}
        className="px-2 mx-2 rounded text-blue-900"
        type="text"
        name="country"
        id="country"
        placeholder="Start typing your contry"
        onChange={handleChange}
      />
      {searchResults.length > 0 ? (
        <ul className="absolute border-2 bg-green-200 rounded left-20  text-slate-800">
          {searchResults}
        </ul>
      ) : null}
    </label>
  );
};
