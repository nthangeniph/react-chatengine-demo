import React from 'react';
import { useChat } from 'components/context';
import { Icon } from 'semantic-ui-react';
import { notMe, joinUsernames } from 'helpers';
import { ChatAvatar } from 'components';
export const ChatList = () => {
    const { myChats, chatconfig, selectedChat, selectedChatClick, deleteChatClick } = useChat();
    return (
        <div className='chat-list'>
            {myChats.map((chat, index) => (
                <div className={`chat-list ${selectedChat?.id === chat.id ? 'selected-chat-item' : ''}`} key={index}>
                    <div className='chat-list-item-content' onClick={() => selectedChatClick(chat)} >
                        {chat?.people?.length === 1 ? (
                            <>
                                <Icon circular inverted color='violet' name='use cancel' />
                                <div className='chat-list-preview'>
                                    <div className='preview-username'>No one Added Yet</div>
                                </div>
                            </>
                        ) : chat.people?.length === 2 ? (
                                <>
                                    <ChatAvatar username={notMe(chatconfig, chat)} chat={chat} />
                                    <div className='chat-list-preview'>
                                        <div className='preview-username'>{notMe(chatconfig,chat)}</div>
                                        <div className='preview-message'>
                                          {chat.last_message.attachments.length?`${chat.last_message.sender.username} sent an attachment`:chat.last_message.text.slice(0,50)+ '....' }  
                                        </div>
                                    </div>
                                </>
                        ):
                                <>
                                    <Icon circular inverted color='brown' name='users' />
                                    <div className='preview-username'>
                                      {joinUsernames(chat?.people,chatconfig?.userName).slice(0,50) + '...'}
                                    </div>
                                    <div className='preview-message'>
                                        {
                                           chat.last_message.attachments.length?`${chat.last_message.sender.username} sent an attachment`:chat.last_message.text.slice(0,50) + '....' 
                                        }
                                    </div>
                                </>      
                        
                        }
                    </div>
                    <div onClick={() => deleteChatClick(chat)} className='chat-item-delete'>
                        <Icon name='delete' />
                    </div>
                </div>
            ))}
        </div>
    )
}
