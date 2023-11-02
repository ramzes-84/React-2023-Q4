import { useRef } from 'react';
import { Form } from 'react-router-dom';
import { StorageValues } from '../types';

// interface SearchProps {
//   params: object;
//   paramsCallback: (params: object) => void;
// }

export function Search() {
  const searchInput = useRef(null);

  return (
    <section className="rounded-2xl bg-slate-500 text-white m-2 p-2">
      <Form
        className="flex justify-center gap-2"
        onSubmit={() => {
          // console.log(e.target.sort.value);
        }}
      >
        <input
          placeholder="crocodile?"
          className="text-black px-1 rounded"
          type="text"
          name="q"
          defaultValue={localStorage.getItem(StorageValues.Keyword) || ''}
        />
        <select
          ref={searchInput}
          className="text-black px-1 rounded"
          name="limit"
          defaultValue="10"
        >
          <option value="10">10 items per page</option>
          <option value="20">20 items per page</option>
        </select>
        <select
          className="text-black px-1 rounded"
          name="sort"
          defaultValue="newest"
        >
          <option value="newest">Show newest first</option>
          <option value="oldest">Show oldest first</option>
          <option value="relevance">Sort by relevance</option>
        </select>
        <input type="submit" value="Search" />
      </Form>
    </section>
  );
}
