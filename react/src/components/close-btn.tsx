interface CloseBtnProps {
  paramsCallback: () => void;
}

export const CloseBtn = ({ paramsCallback }: CloseBtnProps) => {
  return (
    <button
      className="sticky top-2 self-end m-2 p-2 text-white bg-red-600 rounded-2xl"
      onClick={paramsCallback}
    >
      Close
    </button>
  );
};
