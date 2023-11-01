import { useRef } from 'react';
import { Form } from 'react-router-dom';
import { StorageValues } from '../types';

// interface SearchProps {
// word: string;
// keywordCallback: (word: string) => void;
// }

export function Search() {
  const searchInput = useRef(null);

  return (
    <section className="rounded-2xl bg-slate-500 text-white m-2 p-2">
      <Form className="flex justify-center gap-2">
        <input
          ref={searchInput}
          placeholder="crocodile?"
          className="text-black px-1 rounded"
          type="text"
          name="q"
          defaultValue={localStorage.getItem(StorageValues.Keyword) || ''}
        />
        <input type="submit" value="Search" />
      </Form>
    </section>
  );
}
