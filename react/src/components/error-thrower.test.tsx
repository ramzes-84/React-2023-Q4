import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ErrorThrower } from './error-thrower';

vi.mock('../hooks/context-check', () => {
  return { useContextChecker: vi.fn().mockReturnValue({ setErrorMsg: true }) };
});

describe('ErrorThrower component', () => {
  it('Should render the button for throwing errors', () => {
    render(<ErrorThrower />);

    const btn = screen.getByText('Throw error');
    expect(btn).toBeInTheDocument();
  });
});
