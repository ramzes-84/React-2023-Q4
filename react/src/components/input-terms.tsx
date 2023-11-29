export const InputTerms = () => {
  return (
    <label className="text-white " htmlFor="terms">
      I agree with T&C:
      <input
        className="px-2 mx-2 rounded text-blue-900"
        type="checkbox"
        name="terms"
      />
    </label>
  );
};
