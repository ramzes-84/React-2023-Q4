import { useState } from 'react';

interface SearchProps {
  word: string;
  keywordCallback: (word: string) => void;
}

export function Search({ word, keywordCallback }: SearchProps) {
  const [keyword, setKeyword] = useState(word);

  return (
    <section className="rounded-2xl bg-slate-500 text-white m-2 p-2">
      <div className="flex justify-center gap-2">
        <input
          placeholder="crocodile?"
          className="text-black px-1 rounded"
          type="text"
          name="keyword"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
        <input
          type="button"
          value="Search"
          onClick={() => keywordCallback(keyword)}
        />
      </div>
    </section>
  );
}
