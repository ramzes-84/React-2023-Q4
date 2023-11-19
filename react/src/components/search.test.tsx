import { describe, it, expect, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { Search } from './search';
import { PageLimitValue, Sort } from '../types';

vi.mock('react-redux', () => {
  return {
    useSelector: vi.fn().mockReturnValue({}),
    useDispatch: vi.fn(),
  };
});

describe('Search component', () => {
  it('Should render the form elements', () => {
    render(<Search />);

    const serchBtn = screen.getByText('Search');
    const serchInput = screen.getByRole('textbox');
    const selectLimit = screen.getByText('10 items per page');
    const selectSort = screen.getByText('Show newest first');

    expect(serchBtn).toBeInTheDocument();
    expect(serchBtn).toBeVisible();
    expect(serchInput).toBeInTheDocument();
    expect(serchInput).toBeVisible();
    expect(selectLimit).toBeInTheDocument();
    expect(selectSort).toBeInTheDocument();
  });

  it('Changing items per page param should trigger params setting', () => {
    render(<Search />);

    const selectLimit: HTMLSelectElement =
      screen.getByText('10 items per page');
    fireEvent.change(selectLimit, { target: { value: PageLimitValue.fifty } });

    expect(selectLimit.value).toEqual('50');
  });

  it('Changing sort param should trigger params setting', () => {
    render(<Search />);

    const orderSelect: HTMLSelectElement =
      screen.getByText('Show newest first');
    expect(orderSelect).toBeInTheDocument();

    fireEvent.change(orderSelect, { target: { value: Sort.Relevance } });

    expect(orderSelect.value).toEqual('relevance');
  });
});
