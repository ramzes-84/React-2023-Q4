import { HandeledFormData } from '../utils/types';

type ParserProps = {
  obj: HandeledFormData;
};
export const FormDataParser = ({ obj }: ParserProps) => {
  return (
    <div className="text-white border px-2 py-1 rounded-lg list-disc">
      <p>Name: {obj.name}</p>
      <p>Email: {obj.email}</p>
      <p>Age: {obj.age}</p>
      <p>Password: {obj.password}</p>
      <p>Country: {obj.country}</p>
      <p>Sex: {obj.gender}</p>
    </div>
  );
};
