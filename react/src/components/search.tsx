import { useRef } from 'react';
import { Form } from 'react-router-dom';

interface SearchProps {
  word: string;
  keywordCallback: (word: string) => void;
}

export function Search({ word, keywordCallback }: SearchProps) {
  const searchInput = useRef(null);

  return (
    <section className="rounded-2xl bg-slate-500 text-white m-2 p-2">
      <Form
        className="flex justify-center gap-2"
        onSubmit={() => {
          const input = searchInput.current as unknown as HTMLInputElement;
          keywordCallback(input.value);
        }}
      >
        <input
          ref={searchInput}
          placeholder="crocodile?"
          className="text-black px-1 rounded"
          type="text"
          name="key"
          defaultValue={word}
        />
        <input type="submit" value="Search" />
      </Form>
    </section>
  );
}
