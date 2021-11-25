import { createContext, useState ,useEffect,useContext} from 'react';
import { newChat, deleteChat, leaveChat, getMessages } from 'react-chat-engine';

import {useFirebase } from 'service';

export const ChatContext = createContext();

export const ChatProvider = ({ children, authUser })=> {
    const [myChats,setMyChats] = useState();
    const [chatConfig,setChatConfig] = useState();
    const [selectedChat, setSelectedChat] = useState();

    const { firestore} = useFirebase();

    
    const createChatClick = () => {
        newChat(chatConfig,{title:''})
    }

    const deleteChatClick = chat => {
        const isAdmin = chat.admin.username === chatConfig.userName;

        if (
            isAdmin &&
            window?.confirm('Are you sure you want to delete this chat?')){
            deleteChat(chatConfig, chat.id);
        }
        else if (window?.confirm('Are you sure you want to leave this chat?')) {
            leaveChat(chatConfig, chat.id, chatConfig.userName);
        }
        
    }
    // const selectedChatClick = chat => {
    //     getMessages(chatConfig, chat.id, messages => {
    //         setSelectedChat(
    //             {
    //              ...chat,
    //                 messages,
    //             }
    //         )
         
    //     })
    // }


    const selectedChatClick = chat => {
        getMessages(chatConfig, chat.id, (chatId, messages) => {
          setSelectedChat({
            ...chat,
            messages,
          });
        });
      };
    useEffect(() => {
        if (authUser) {
            firestore
                .collection('chatUsers')
                .doc(authUser.uid)
                .onSnapshot(snap => {
                    setChatConfig({
                        userSecret: authUser?.uid,
                        avatar: snap.data()?.avatar,
                        userName: snap.data()?.userName,
                        projectID: 'f2ec2674-1412-45b3-9058-87ad0f0c03f3',
                    })
                }
                )
        }
    }, [authUser,firestore]);

    return (
        <ChatContext.Provider value={{
            myChats,
            chatConfig,
            setMyChats,
            selectedChat,
            setSelectedChat,
            selectedChatClick,
            createChatClick,
            deleteChatClick,
            setChatConfig,
             
        }}
        >
            {children}
        </ChatContext.Provider>
    )
}
export const useChat = () => {
    const {
        myChats,
        setMyChats,
        chatConfig,
        selectedChat,
        setSelectedChat,
        selectedChatClick,
        createChatClick,
        deleteChatClick,
        setChatConfig,
    } = useContext(ChatContext);

    return {
        myChats,
        setMyChats,
        selectedChat,
        chatConfig,
        setSelectedChat,
        selectedChatClick,
        createChatClick,
        deleteChatClick,
        setChatConfig,
    }
}