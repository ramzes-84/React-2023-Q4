import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { PagesBtn } from './page-button';

describe('PagesBtn component', () => {
  it('Should render input with correct number', () => {
    render(<PagesBtn num={1} handlePageChange={() => {}} />);

    const input = screen.getByRole('button');
    const button = screen.getByText('1');

    expect(input).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });
});
