import { useContext } from 'react';
import { AppContext } from '../App';

export const useContextChecker = (context = AppContext) => {
  const appContext = useContext(context);

  if (!appContext) {
    throw new Error('AppContext has to be used within <AppContext.Provider>');
  }

  return appContext;
};
