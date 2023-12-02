// import { useRef } from 'react';
// import { convertBase64 } from '../utils/base64-encode';

export const InputFile = () => {
  // const inputFileRef = useRef<HTMLInputElement>(null);
  // const handleAddFile = async () => {
  //   if (!inputFileRef.current) throw Error('ref is not assigned');
  //   if (inputFileRef.current.files) {
  //     const file = inputFileRef.current?.files[0];
  //     const base64 = await convertBase64(file);
  //     console.log(typeof base64);
  //   }
  // };
  return (
    <label className="text-white " htmlFor="file">
      Upload:
      <input
        // ref={inputFileRef}
        className="px-2 mx-2 rounded text-blue-900"
        type="file"
        name="file"
        id="file"
        accept=".png, .jpeg"
        required={true}
        // onChange={handleAddFile}
      />
    </label>
  );
};
