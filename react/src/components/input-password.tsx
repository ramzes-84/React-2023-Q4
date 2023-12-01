export const InputPassword = () => {
  return (
    <>
      <label className="text-white " htmlFor="password">
        Password:
        <input
          className="px-2 mx-2 rounded text-blue-900"
          //TODO replace type=text with type=password
          type="text"
          name="password"
          id="password"
        />
      </label>
      <label className="text-white " htmlFor="confirm">
        Confirm password:
        <input
          className="px-2 mx-2 rounded text-blue-900"
          type="text"
          name="confirm"
          id="confirm"
        />
      </label>
    </>
  );
};
