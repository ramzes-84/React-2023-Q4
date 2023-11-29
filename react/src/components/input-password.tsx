export const InputPassword = () => {
  return (
    <>
      <label className="text-white " htmlFor="password">
        Password:
        <input
          className="px-2 mx-2 rounded text-blue-900"
          type="password"
          name="password"
        />
      </label>
      <label className="text-white " htmlFor="confirm">
        Confirm password:
        <input
          className="px-2 mx-2 rounded text-blue-900"
          type="password"
          name="confirm"
        />
      </label>
    </>
  );
};
