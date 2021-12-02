import { createContext } from 'react';

export const initialBackgroundState = {
  currentBackground: '',
  newUrl: '',
  availableBackgrounds: [],
  isInProgress: false,
};

export const BackgroundStateContext = createContext();

export const BackgroundActionContext = createContext();
