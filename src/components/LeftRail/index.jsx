import { useState} from 'react';
import { useChat } from 'components/context';
import { useResolved } from 'hooks';
import { ChatList } from 'components';
import { RailHeader } from 'components';
import { ChatBackgroundModal } from 'components';
import { Icon, Loader } from 'semantic-ui-react';
import style from './style.module.scss';

export const LeftRail = () => {
  const { myChats, createChatClick } = useChat();
  const chatsResolved = useResolved(myChats);
  const [isSettings, setisSettings] = useState(false);
  const [open,setOpen] = useState(false);


  
  return (
    <div className={style.LeftRail} >
      <RailHeader />
      {chatsResolved ? (
        <>
          {!!myChats.length ? (
            <div className="chat-list-container">
              <ChatList />
            </div>
          ) : (
            <div className="chat-list-container no-chats-yet">
              <h3>No Chats Yet</h3>
            </div>
            )}
          <div className={style.settings}>
            <button className={style.settingsButton} onClick={()=>setisSettings(prev=>!prev)}><Icon name='settings' />  Options</button>
            {isSettings && (
              <div className={style.settingsOptions}>
                <div className={style.settingOption}>
                <button className={style.settingButton} onClick={()=>setOpen(true)}><Icon name='image' />Chat Background</button>
                <br/>
                <button className={style.settingButton}><Icon name='sound' />Sound</button>
                </div>

              </div>
            )}
          </div>
          <button className={style.CreateChatButton} onClick={createChatClick}>
            Create Chat
          </button>
        </>
      ) : (
        <div className="chats-loading">
          <Loader active size="huge" />
        </div>
        )}
      <ChatBackgroundModal open={open} setOpen={ setOpen}/>
    </div>
  );
};
