import { useContextChecker } from '../hooks/context-check';

export function ErrorThrower() {
  const { setErrorMsg } = useContextChecker();

  return (
    <button
      className="m-2 p-2 text-white	bg-red-600 rounded-2xl"
      onClick={() => setErrorMsg('Manually envoked error')}
    >
      Throw error
    </button>
  );
}
