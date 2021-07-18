import { createAction } from 'redux-actions';


export const ChatsActionEnums ={
    SetChatConfig : 'SET_CHAT_CONFIG',
    FetchChats :'FETCH_CHATS',
    FetchMyChat:'FETCH_MY_CHAT',
    
}


export const setChatConfigAction = createAction(
    ChatsActionEnums.SetChatConfig,
    chatConfig => ({ chatConfig })
);


export const fetchChatsAction = createAction(
    ChatsActionEnums.FetchChats,
    myChats => ({ myChats })
);


export const fetchMyChatAction = createAction(
    ChatsActionEnums.FetchMyChat,
    selectedChat => ({ selectedChat })
);