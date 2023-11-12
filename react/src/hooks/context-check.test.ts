import { expect, it, describe, vi } from 'vitest';
import { useContextChecker } from './context-check';

vi.mock('react', () => {
  return {
    useContext: vi.fn().mockReturnValueOnce({}).mockReturnValueOnce(false),
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

  it('Should throw error when there is no Context', () => {
    let errorMsg = '';
    try {
      useContextChecker();
    } catch (error) {
      errorMsg = (error as Error).message;
    }
    expect(errorMsg).toEqual(
      'AppContext has to be used within <AppContext.Provider>'
    );
  });
});
