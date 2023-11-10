import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Search } from './search';

vi.mock('../hooks/context-check', () => {
  return {
    useContextChecker: vi
      .fn()
      .mockReturnValue({ params: {}, setParams: vi.fn() }),
  };
});

describe('Search component', () => {
  it('Should render the form elements', () => {
    render(<Search />);

    const serchBtn = screen.getByText('Search');

    expect(serchBtn).toBeInTheDocument();
  });
});
