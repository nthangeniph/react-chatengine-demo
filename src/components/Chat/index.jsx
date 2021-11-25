import { useEffect } from 'react';
import { useChat } from 'components/context';
import {
  ChatEngineWrapper,
  Socket,
  getChats,
} from 'react-chat-engine';
import { LeftRail, ChatToolBar, ChatInput, MessageList } from 'components';

export const Chat = () => {
  const {
    myChats,
    setMyChats,
    chatConfig,
    selectedChat,
    selectedChatClick,
    setSelectedChat,
  } = useChat();

  useEffect(() => {
    console.log('My Chats test deployment: ', myChats);
  }, [myChats]);

  useEffect(() => {
    console.log('Selected Chat: ', selectedChat);
  }, [selectedChat]);

  console.log('whats', !!chatConfig);
  return (
    <>
      {!!chatConfig && (
        <ChatEngineWrapper>
          <Socket
            userName={chatConfig.userName}
            projectID={chatConfig.projectID}
            userSecret={chatConfig.userSecret}
            onConnect={() => {
              getChats(chatConfig,chats=>setMyChats(chats));
            }}
            onNewChat={chat => {
              if (chat.admin.username === chatConfig.userName) {
                selectedChatClick(chat);
              }
              setMyChats([...myChats, chat].sort((a, b) => a.id - b.id));
            }}
            onDeleteChat={chat => {
              if (selectedChat?.id === chat.id) {
                setSelectedChat(null);
              }
              setMyChats(
                myChats
                  .filter(c => c.id !== chat.id)
                  .sort((a, b) => a.id - b.id),
              );
            }}
            onNewMessage={(chatId, message) => {
            
              if (selectedChat && chatId === selectedChat.id) {
                setSelectedChat({
                  ...selectedChat,
                  messages: [...selectedChat.messages, message],
                });
              }
              const chatThatMessageBelongsTo = myChats.find(
                c => c.id === chatId,
              );
              const filteredChats = myChats.filter(c => c.id !== chatId);
              const updatedChat = {
                ...chatThatMessageBelongsTo,
                last_message: message,
              };
              setMyChats(
                [updatedChat, ...filteredChats].sort((a, b) => a.id - b.id),
              );
              
            }}
            
  
            
            
          />
        </ChatEngineWrapper>
      )}

      <div className="chat-container">
        <LeftRail />
        <div className="current-chat">
          {selectedChat ? (
            <div className="chat">
              <ChatToolBar />
              <MessageList />
              <ChatInput />
            </div>
          ) : (
            <div className="no-chat-selected">
              <img
                src="static/img/pointLeft.jpeg"
                className="point-left"
                alt="point-left"
              />
              Select A Chat
            </div>
          )}
        </div>
      </div>
    </>
  );
};
