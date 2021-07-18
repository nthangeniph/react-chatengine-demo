import { useState, useEffect } from 'react';
import { useChat } from 'components/context';
import { joinUsernames } from 'helpers';
import { Icon } from 'semantic-ui-react';
import { SearchUsers } from 'components/SearchUsers';

export const ChatToolBar = () => {
    const { selectedChat, chatConfig } = useChat();
    const [searching, setSearching] = useState(false);

    useEffect(() => {
        
    })
    
    return (
        <>
            <div className='chat-toolbar'>
                <div className='chat-header-text'>
                    {joinUsernames(selectedChat.people,chatConfig.userName).slice(0,100)}
                </div>
                <div className='add-user-icon'>
                    <Icon
                        color='grey'
                        name='user plus'
                        onClick={() => setSearching(true)}
                        />
                </div>
            </div>
            {!!searching && <SearchUsers visible={searching} closeFn={() => setSearching(false)}/>}  
        </>
    )
    
}