import { useContext } from 'react';
import { AppContext } from '../App';

export const useContextChecker = () => {
  const appContext = useContext(AppContext);

  if (!appContext) {
    throw new Error('AppContext has to be used within <AppContext.Provider>');
  }

  return appContext;
};
