export const InputAge = () => {
  return (
    <label className="text-white " htmlFor="age">
      Age:
      <input
        className="px-2 mx-2 rounded text-blue-900"
        type="number"
        name="age"
        id="age"
        placeholder="Positive numbers only"
      />
    </label>
  );
};
