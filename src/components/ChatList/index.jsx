import React,{useEffect} from 'react';
import { useChat } from 'components/context';
import { Icon } from 'semantic-ui-react';
import { notMe, joinUsernames } from 'helpers';
import { ChatAvatar } from 'components';

import { isTyping } from 'react-chat-engine';


export const ChatList = () => {
    const { myChats, chatConfig, selectedChat, selectedChatClick, deleteChatClick } = useChat();


    if (myChats.length && chatConfig) {
        console.log('checking here',chatConfig);
        isTyping(chatConfig, myChats[0]?.id, (data) => console.log(data))
}

    useEffect(() => {
        console.log('checking here',chatConfig);
    }, [chatConfig])

    return (
        <div className='chat-list' style={{width:'100%'}}>
            {myChats.map((chat, index) => (
                <div className={`chat-list ${selectedChat?.id === chat.id ? 'selected-chat-item' : ''}`} style={{display:'grid',gridTemplateColumns:'85% 15%'}} key={index}>
                    <div className='chat-list-item-content' onClick={() => selectedChatClick(chat)} >
                        {chat?.people?.length === 1 ? (
                            <div className='icon-with-names' >
                                <Icon circular inverted color='violet' name='user x' />
                                <div className='chat-list-preview'>
                                    <div className='preview-username'>No one Added Yet</div>
                                </div>
                            </div>
                        ) : chat.people?.length === 2 ? (
                            <div className='icon-with-names' >
                                    <ChatAvatar username={notMe(chatConfig, chat)} chat={chat} />
                                    <div className='chat-list-preview'>
                                        <div className='preview-username'>{notMe(chatConfig,chat)}</div>
                                        <div className='preview-message'>
                                          {chat.last_message.attachments.length?`${chat.last_message.sender.username} sent an attachment`:chat.last_message.text.slice(0,25)+ '....' }  
                                        </div>
                                    </div>
                                </div>
                        ):
                        <div className='icon-with-names' >
                                    <Icon circular inverted color='brown' name='users' />
                                    <div className='preview-username'>
                                      {joinUsernames(chat?.people,chatConfig?.userName).slice(0,25) + '...'}
                                    </div>
                                    <div className='preview-message'>
                                        {
                                           chat.last_message.attachments.length?`${chat.last_message.sender.username} sent an attachment`:chat.last_message.text.slice(0,25) + '....' 
                                        }
                                    </div>
                                </div>      
                        
                        }
                    </div>
                    <div onClick={() => deleteChatClick(chat)} className='chat-item-delete'>
                    <Icon name='trash' />
                    </div>
                </div>
            ))}
        </div>
    )
}
