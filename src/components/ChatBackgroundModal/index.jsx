/* eslint-disable */
import React from 'react';
import { Button, Icon, Modal, Search } from 'semantic-ui-react';
import { useRef, useState, useEffect } from 'react';
import { useChat } from 'components/context';
import style from './style.module.scss';
import { useBackgrounds ,useChats} from 'provider';

export const ChatBackgroundModal = ({ open, setOpen }) => {
  const { chatConfig } = useChat();
  const { fetchUserById,userDetails} = useChats();
  const {
    fetchAvailableBackgrounds,
    availableBackgrounds,
    isInProgress,
    resetBackgrounds,
    currentBackground,
    setCurrentBackground,
    uploadingNewBackground
     
  } = useBackgrounds();
  const inputRef = useRef(null);
  const [image, setImage] = useState(new Blob());
  const [imageSrc, setImageSrc] = useState(null);
 

  useEffect(() => {
    if (chatConfig?.userSecret && open) {
      fetchAvailableBackgrounds();
      fetchUserById(chatConfig?.userSecret)

    }

    return resetBackgrounds();
  }, [chatConfig?.userSecret,open]);

  useEffect(() => {
    const fr = new FileReader();
    fr.onload = () => setImageSrc(fr.result);
    fr.readAsDataURL(image);
  }, [image]);

  const onUpload = () => {
    const input = inputRef.current;
    if (input) {
      input.value = '';
      input.click();
    }
  };
 

  console.log('userfetched',userDetails)

  return (
    <div>
      <Modal
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        className={style.mainFrame}
        open={open}
        dimmer={'blurring'}
      >
  

        <Modal.Header>Chat wallpaper Configuration</Modal.Header>

        <Modal.Content className={style.modalContent}>
          <input
            type="file"
            ref={inputRef}
            className="file-input"
            accept="image/jpeg,image/png"
            onChange={e => {
              const file = e.target?.files?.[0];
              if (file) {
                setImage(file);
              }
            }}
          />

          <div className={style.backgroundImage}>
            <div className={style.availbleImages}>
              <div className={style.toolBar}>
                <Search
                  className={style.search}
                  size={'huge'}
                  loading={false}
                  showNoResults={false}
                  onSearchChange={() => {}}
                />
                <Button className={style.uploadNew} disabled={isInProgress} onClick={onUpload}>
                  {' '}
                  <Icon name="upload" />
                  {isInProgress ? 'Uploading File...' : ' Upload New'}
                </Button>
              </div>

              <div className={style.mainContainer}>
                {availableBackgrounds.map(file => {
                  return (
                    <div className={style.container}>
                      <img
                        src={file}
                        alt="Avatar"
                        className={style.image}
                        onDoubleClick={() => setCurrentBackground(file)}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
            <div className={style.preview}>
              <h1>Preview</h1>
              <img
                className={style.previewImage}
                src={currentBackground}
                width="100%"
                height="100%"
              />
            </div>
          </div>
        </Modal.Content>

        <Modal.Actions>
          <Button
            color="red"
            disabled={isInProgress} 
            onClick={() => setOpen(false)}
          >
            Back
          </Button>
          <Button
            content="Done"
            labelPosition="right"
            disabled={isInProgress} 
            icon="checkmark"
            onClick={() => {
              uploadingNewBackground(imageSrc,setImage,image);
            }}
            positive
          />
        </Modal.Actions>
      </Modal>
    </div>
  );
};
