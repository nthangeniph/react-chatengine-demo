import { useState } from 'react';
import { useChat } from 'components/context';
import { joinUsernames, notMe } from 'helpers';
import { Icon } from 'semantic-ui-react';
import { SearchUsers } from 'components/SearchUsers';
import { ChatAvatar} from 'components/ChatAvatar';

export const ChatToolBar = () => {
    const { selectedChat, chatConfig ,myChats} = useChat();
    const [searching, setSearching] = useState(false);

    console.log('my chat List',myChats)

   
    
    return (
        <>
            <div className='chat-toolbar'>

                <ChatAvatar chat={myChats[1]} username={notMe(chatConfig,myChats[1])}/>
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