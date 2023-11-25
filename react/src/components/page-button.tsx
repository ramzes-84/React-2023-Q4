interface PagesBtnProps {
  num: number;
  handlePageChange: (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => void;
}

export function PagesBtn({ num, handlePageChange }: PagesBtnProps) {
  return (
    <input
      type="button"
      className="inline-block text-lg px-1 mx-1 rounded-2xl text-white bg-slate-500 cursor-pointer"
      name="page"
      value={num}
      onClick={(e) => handlePageChange(e)}
    />
  );
}
