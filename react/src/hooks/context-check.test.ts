import { expect, it, describe, vi } from 'vitest';
import { useContextChecker } from './context-check';

vi.mock('react', () => {
  return {
    useContext: vi.fn().mockReturnValue({}),
    createContext: vi.fn(),
  };
});
vi.mock('../App', () => {
  return {
    AppContext: {},
  };
});

describe('Custom hook', () => {
  it('Should return context', () => {
    const returnedContext = useContextChecker();
    expect(returnedContext).toBeTruthy();
  });
});
