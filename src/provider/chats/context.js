import { createContext } from 'react';

export const initialState = {
  chatConfig: {},
  myChats: {},
};

export const ChatStateContext = createContext();

export const ChatActionContext = createContext();
