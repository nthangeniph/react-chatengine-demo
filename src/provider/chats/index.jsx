/* eslint-disable */
import React, { useReducer, useContext, useEffect } from 'react';
import { ChatStateContext, ChatActionContext, initialState } from './context';
import {
  fetchChatsAction,
  fetchMyChatAction,
  setChatConfigAction,
  fetchUserByIdAction,
} from './actions';
import { ChatReducer } from './reducer';
import { newChat, deleteChat, leaveChat } from 'react-chat-engine';
import { useFirebase } from 'service';

export const ChatsProvider = ({ children, authUser }) => {
  const { firestore } = useFirebase();
  const [state, dispatch] = useReducer(ChatReducer, initialState);

  const chatConfig = state?.chatConfig;

  useEffect(() => {
    if (authUser) {
      firestore
        .collection('chatUsers')
        .doc(authUser.uid)
        .onSnapshot(snap => {
          setChatConfig({
            userSecret: authUser.uid,
            avatar: snap.data().avatar,
            userName: snap.data().userName,
            projectID: 'f2ec2674-1412-45b3-9058-87ad0f0c03f3',
          });
        });
    }
  }, [authUser]);

  const fetchMyChat = chat => {
    dispatch(fetchMyChatAction(chat));
  };

  const setChatConfig = chatConfig => {
    dispatch(setChatConfigAction(chatConfig));
  };
  const createChatClick = () => {
    newChat(chatConfig, { title: '' });
  };

  const deleteChatClick = chat => {
    const isAdmin = chat.admin === chatConfig.userName;

    if (
      isAdmin &&
      window?.confirm('Are you sure you want to delete this chat?')
    ) {
      deleteChat(chatConfig, chat.id);
    } else if (window?.confirm('Are you sure you want to leave this chat?')) {
      leaveChat(chatConfig, chat.id, chatConfig.userName);
    }
  };

  const fetchUserById = (userId) => {
    firestore
      .collection('chatUsers')
      .doc(userId)
      .onSnapshot(snap => {
        dispatch(
          fetchUserByIdAction({
            userDetails: {
              userName: snap.data().userName,
              avatar: snap.data().avatar,
            },
          }),
        );
      });
  };

  const selectChatClick = messages => {
    dispatch(
      fetchChatsAction({
        ...chat,
        messages,
      }),
    );
  };

  return (
    <ChatStateContext.Provider value={state}>
      <ChatActionContext.Provider
        value={{
          selectChatClick,
          createChatClick,
          deleteChatClick,
          fetchMyChat,
          fetchUserById,
          setChatConfig,
        }}
      >
        {children}
      </ChatActionContext.Provider>
    </ChatStateContext.Provider>
  );
};

function useChatState() {
  const context = useContext(ChatStateContext);
  if (context === undefined) {
    throw new Error(
      'You can only access these values if you are within the provider',
    );
  }
  return {
    ...context,
  };
}

function useChatAction() {
  const context = useContext(ChatActionContext);
  if (context === undefined) {
    throw new Error(
      'You can only access these values if you are within the provider',
    );
  }
  return {
    ...context,
  };
}

function useChats() {
  return { ...useChatState(), ...useChatAction() };
}

export { useChatAction, useChatState, useChats };
