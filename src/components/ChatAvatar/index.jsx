import { useFirebase } from 'service';
import { useChat } from 'components/context';
import { Image } from 'semantic-ui-react';
import React, { useEffect, useState } from 'react';

export const ChatAvatar = ({ chat, username, className }) => {
  const { chatConfig } = useChat();
  const { firestore} = useFirebase();
  const [avatar, setAvatar] = useState('');

  useEffect(() => {
    firestore
      .collection('chatUsers')
      .where('userName', '==', username)
      .get()
      .then(snap => {
        const data = snap.docs[0]?.data();
        if (data?.avatar) {
          
          setAvatar(data.avatar);
        }
      });
  }, [chat, chatConfig, username,firestore]);

  return avatar ? (
    <Image className={className || 'chat-list-avatar'} src={avatar} />
  ) : (
    <div className={className || 'empty-avatar'}>
      {chat.people
        .find(p => p.person.username !== chatConfig.userName)
        .person.username[0].toUpperCase()}
    </div>
  );
};