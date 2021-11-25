/* eslint-disable */
import React, { userReducer, useContext, useEffect } from 'react'
import { ChatStateContext, ChatActionContext,initialState } from './context';
import { fetchChatsAction, fetchMyChatAction, setChatConfigAction } from './actions';
import { ChatReducer } from './reducer';
import { newChat, deleteChat, leaveChat } from 'react-chat-engine';
import {useFirebase } from 'service';

export const ChatProvider = ({ children, authUser }) => {
    const { firestore} = useFirebase();
    const [state, dispatch] = userReducer(ChatReducer,initialState)
    
    const chatConfig  = state?.chatConfig;
    
    
   

    const fetchMyChat = chat=> {
        dispatch(fetchMyChatAction(chat))
    }

    const setChatConfig = chatConfig => {
        dispatch(setChatConfigAction(chatConfig))
    }
    const createChatClick = () => {
        newChat(chatConfig,{title:''})
    }

    const deleteChatClick = chat => {
        const isAdmin = chat.admin === chatConfig.userName;

        if (
            isAdmin &&
            window?.confirm('Are you sure you want to delete this chat?')){
            deleteChat(chatConfig, chat.id);
        }
        else if (window?.confirm('Are you sure you want to leave this chat?')) {
            leaveChat(chatConfig, chat.id, chatConfig.userName);
        }
        
    }
    const selectChatClick = messages => {
     
            dispatch(fetchChatsAction(
                {
                 ...chat,
                    messages,
                }
            ))
         
        
    }


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
                    })
                }
                )
        }
    
    },[authUser])

    return (
        <ChatStateContext.Provider value={state}>
          <ChatActionContext.Provider value={{
            selectChatClick,
            createChatClick,
             deleteChatClick,
            fetchMyChat,
            setChatConfig
            }}>
            {children}
          </ChatActionContext.Provider>
        </ChatStateContext.Provider>
  
    )
}

 function useChatState() {
    const context = useContext(ChatStateContext);
    if (context === undefined) {
       throw new Error('You can only access these values if you are within the provider')
   }
    return {
        ...context
    }
}

 function useChatAction() {
    const context = useContext(ChatActionContext);
    if (context === undefined) {
       throw new Error('You can only access these values if you are within the provider')
   }
    return {
        ...context
    }
}

function useChat() {
    return{...useChatState(),...useChatAction()}
}


export {useChatAction,useChatState,useChat}
