import { ChatsActionEnums } from './actions';

export function ChatReducer(currentState, action) {
  const { type, payload } = action;

  switch (type) {
    case ChatsActionEnums.SetChatConfig:
    case ChatsActionEnums.FetchChats:
    case ChatsActionEnums.FetchMyChat:
    case ChatsActionEnums.FetchUserById:
      return {
        ...currentState,
        ...payload,
      };
    default:
      return {
        myChats: {},
        ...currentState,
        ...payload,
      };
  }
}
