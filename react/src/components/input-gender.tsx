import { Gender } from '../utils/types';

export const InputGender = () => {
  return (
    <label className="text-white " htmlFor="gender">
      Gender:
      <select
        className="px-2 mx-2 rounded text-blue-900"
        name="gender"
        id="gender"
      >
        <option value={Gender.Male}>Male</option>
        <option value={Gender.Female}>Female</option>
        <option value={Gender.Other}>Other</option>
      </select>
    </label>
  );
};
