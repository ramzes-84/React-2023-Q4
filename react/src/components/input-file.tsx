export const InputFile = () => {
  return (
    <label className="text-white " htmlFor="file">
      Upload:
      <input
        className="px-2 mx-2 rounded text-blue-900"
        type="file"
        name="file"
        id="file"
      />
    </label>
  );
};
