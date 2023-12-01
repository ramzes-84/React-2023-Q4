type ValidationErrorsProps = {
  errArr: string[];
};

export const ValidationErrors = ({ errArr }: ValidationErrorsProps) => {
  const errList = errArr.map((err) => <li key={err}>{err}</li>);
  return (
    <div className="relative w-80">
      <ul className="absolute text-white border px-5 py-1 rounded-lg list-disc">
        Please correct these fields:
        {errList}
      </ul>
    </div>
  );
};
