import { createContext } from 'react';

export const initialState = {
  chatConfig: {},
  myChats: {},
  userDetails: {
    userName: '',
    avatar: '',
  },
};

export const ChatStateContext = createContext(initialState);

export const ChatActionContext = createContext();
