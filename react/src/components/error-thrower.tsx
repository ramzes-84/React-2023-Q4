interface ErrorThrowerProps {
  callback: () => void;
}

export function ErrorThrower({ callback }: ErrorThrowerProps) {
  return (
    <button
      className="m-2 p-2 text-white	bg-red-600 rounded-2xl"
      onClick={callback}
    >
      Throw error
    </button>
  );
}
