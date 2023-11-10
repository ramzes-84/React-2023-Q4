import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Navigation } from './navigation';

vi.mock('react-router-dom', () => {
  return {
    Link: vi.fn(),
    Outlet: vi.fn(),
  };
});

describe('Navigation component', () => {
  it('Should render header image & burger btn', () => {
    render(<Navigation />);

    const logo = screen.getByAltText('Logo');
    const burgerBtn = screen.getByRole('button');
    const burgerImg = screen.getByAltText('menu');
    // const middleSegment = screen.getByText('6');

    expect(logo).toBeInTheDocument();
    expect(burgerBtn).toBeInTheDocument();
    expect(burgerImg).toBeVisible();

    // expect(middleSegment).toBeInTheDocument();
  });
});
