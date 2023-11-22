interface ErrorThrowerProps {
  cb: () => void;
}

export function ErrorThrower({ cb }: ErrorThrowerProps) {
  return (
    <button className="m-2 p-2 text-white	bg-red-600 rounded-2xl" onClick={cb}>
      Throw error
    </button>
  );
}
