export const InputEmail = () => {
  return (
    <label className="text-white " htmlFor="email">
      E-mail:
      <input
        className="px-2 mx-2 rounded text-blue-900"
        type="email"
        name="email"
        id="email"
      />
    </label>
  );
};
