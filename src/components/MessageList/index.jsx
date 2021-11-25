import { useChat } from 'components/context';
import { groupMessages } from 'helpers';
//import { useScrollToBottom } from 'hooks';
import { Icon } from 'semantic-ui-react';
import style from './style.module.scss';

export const MessageList = () => {
  const { selectedChat, chatConfig } = useChat();
 // useScrollToBottom(selectedChat, style.chatmessages);

  return (
    <div className={style.chatmessages}>
      {!!selectedChat.messages.length ? (
          <div
            className={style.chatMessageLeft}
          >
            {groupMessages(selectedChat.messages).map((m, index) => {
            
            
              return (
                <div key={index} className="chat-message">
                  <div className="message-content">
                    {m.map((individualMessage, index) => {
                      const time = new Date(individualMessage?.created);
                      const isOwner = individualMessage.sender.username === chatConfig.userName;
                      const classHolder = isOwner ? style.chatMessageRight : style.chatMessageLeft;
                      const classmessage = isOwner ? style.messageTextRight : style.messageTextLeft;
                      return (
                        <div key={index} className={classHolder}>
                          <div className={classmessage}>
                            {individualMessage.text}
                            <div className="time-stamp">
                              <span className="time-created">
                                {time?.toTimeString().substring(0, 5)}
                              </span>
                              {isOwner &&<span>
                              <Icon name="eye" className="seen-read" />
                            </span>}
                            </div>
                    
                          </div>

                          {!!individualMessage.attachments.length && (
                            <img
                              className="message-image"
                              src={individualMessage.attachments[0].file}
                              alt={individualMessage.id + '-attachment'}
                            />
                          )}
                        </div>
                      )
                    })}
                  </div>
                </div>
              )
            })}
          
          {/* <div
            className={style.chatMessageRight}
          >
            {groupMessages(selectedChat.messages).map((userM, index) => (
              <div
                key={index}
                className="chat-message"
                style={{ display: 'grid', gridTemplateColumns: '90% 10%' }}
              >
                <div className="message-content">
                  {userM.map((individualMessage, index) => {
                    const time = new Date(individualMessage?.created);
                    return (
                      <div key={index}>
                        <div
                          className={style.messageText}
                        >
                          {individualMessage.text}
                          <div className="time-stamp">
                            <span className="time-created">
                              {time?.toTimeString().substring(0, 5)}
                            </span>
                            <span>
                              <Icon name="eye" className="seen-read" />
                            </span>
                          </div>
                        </div>

                        {!!individualMessage.attachments.length && (
                          <img
                            className="message-image"
                            src={individualMessage.attachments[0].file}
                            alt={individualMessage.id + '-attachment'}
                          />
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div> */}
        </div>
      ) : (
        <div className="no-messages-yet">No messages yet</div>
      )}
    </div>
  );
};


