export const InputEmail = () => {
  return (
    <label className="text-white " htmlFor="email">
      E-mail:
      <input
        className="px-2 mx-2 rounded text-blue-900"
        type="text"
        name="email"
        id="email"
      />
    </label>
  );
};
