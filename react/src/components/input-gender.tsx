export const InputGender = () => {
  return (
    <label className="text-white " htmlFor="gender">
      Gender:
      <select className="px-2 mx-2 rounded text-blue-900" name="gender">
        <option value="male">Male</option>
        <option value="female">Female</option>
        <option value="other">Other</option>
      </select>
    </label>
  );
};
