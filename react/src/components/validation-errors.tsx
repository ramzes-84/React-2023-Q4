type ValidationErrorsProps = {
  errArr: string[];
};
export const ValidationErrors = ({ errArr }: ValidationErrorsProps) => {
  const errList = errArr.map((err) => <li key={err}>{err}</li>);
  return (
    <ul className="list-disc px-3">
      Please correct these fields:
      {errList}
    </ul>
  );
};
