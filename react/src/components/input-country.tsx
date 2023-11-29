export const InputCountry = () => {
  return (
    <label className="text-white " htmlFor="name">
      Country:
      <input
        className="px-2 mx-2 rounded text-blue-900"
        type="text"
        name="country"
        placeholder="Start typing your contry"
      />
    </label>
  );
};
