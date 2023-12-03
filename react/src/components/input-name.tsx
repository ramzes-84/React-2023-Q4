export const InputName = () => {
  return (
    <label className="text-white " htmlFor="name">
      Name:
      <input
        className="px-2 mx-2 rounded text-blue-900"
        type="text"
        name="name"
        id="name"
        placeholder="Uppercase for 1st letter"
      />
    </label>
  );
};
