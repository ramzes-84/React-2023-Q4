import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Pagination } from './pagination';

vi.mock('react-redux', () => {
  return {
    useSelector: vi.fn().mockReturnValueOnce(100).mockReturnValueOnce({}),
    useDispatch: vi.fn(),
  };
});
vi.mock('../utils/pagination-mapper', () => {
  return {
    paginationMapper: vi.fn().mockReturnValue({
      firstPage: 1,
      middleSegment: [6],
      lastPage: 100,
    }),
  };
});

describe('Pagination component', () => {
  it('Should render three segments of buttons if provided', () => {
    render(<Pagination />);

    const startSegment = screen.getByText('1');
    const endSegment = screen.getByText('100');
    const middleSegment = screen.getByText('6');

    expect(startSegment).toBeInTheDocument();
    expect(endSegment).toBeInTheDocument();
    expect(middleSegment).toBeInTheDocument();
  });
});
