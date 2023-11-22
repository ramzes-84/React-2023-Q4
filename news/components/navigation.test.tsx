import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Navigation } from './navigation';

vi.mock('react-router-dom', () => {
  return {
    Link: vi.fn().mockReturnValue(<div>Main</div>),
    Outlet: vi.fn(),
  };
});

describe('Navigation component', () => {
  it('Should render header image & burger btn', () => {
    render(<Navigation />);

    const logo = screen.getByAltText('Logo');
    const mainBtn = screen.getByText('Main');
    const burgerBtn = screen.getByRole('button');
    const burgerImg = screen.getByAltText('menu');

    expect(logo).toBeInTheDocument();
    expect(burgerBtn).toBeInTheDocument();
    expect(burgerImg).toBeVisible();
    expect(mainBtn).toBeInTheDocument();
    expect(mainBtn).toBeVisible();
  });
});
