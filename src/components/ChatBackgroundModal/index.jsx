import firebase from 'firebase/app';
import React from 'react';
import { Button, Icon, Modal, Search } from 'semantic-ui-react';
import { useRef, useState, useEffect } from 'react';
import { useFirebase } from 'service';

import { useChat } from 'components/context';
import style from './style.module.scss';

export const ChatBackgroundModal = ({ open, setOpen }) => {
  const { storage, firestore } = useFirebase();
  const { chatConfig } = useChat();
  const inputRef = useRef(null);
  const [image, setImage] = useState(new Blob());
  const [imageSrc, setImageSrc] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [urls,setUrls] = useState([]);


  useEffect(() => {
   
    async function fetchImages() {
      await firestore
        .collection('chatBackgrounds')
        .doc(chatConfig?.userSecret)
        .get()
        .then(doc => {
          if (doc?.exists) {
            let arrHolder = doc?.data().backgroundImages;
            arrHolder.map(img => {
              setUrls(prev=>[...prev,(JSON.parse(img)).url])
            })
            
          }
      
        });
    };
    if(chatConfig?.userSecret)fetchImages();
      
    return setUrls([])
  },[chatConfig?.userSecret])

  useEffect(() => {
    const fr = new FileReader();
    fr.onload = () => setImageSrc(fr.result);
    fr.readAsDataURL(image);
  }, [image]);


  const backGroundImg = './../../static/img/cool-background-2.png';

  const onUpload = () => {
    const input = inputRef.current;
    if (input) {
      input.value = '';
      input.click();
    }
  };
  const onSubmit = async () => {
    let profile;
    setIsUploading(true);
    await firestore
      .collection('chatBackgrounds')
      .doc(chatConfig.userSecret)
      .get()
      .then(doc => {
        profile = doc.exists;
      });

    fetch(imageSrc)
      .then(res => res.blob())
      .then(blob => {
        const storageRef = storage.ref();
        const uploadRef = storageRef.child(`${image?.lastModified}`);
        uploadRef
          .put(blob)
          .then(() => {
            uploadRef
              .getDownloadURL()
              .then(url => {
                if (!profile) {
                  firestore
                    .collection('chatBackgrounds')
                    .doc(chatConfig.userSecret)
                    .set({
                      backgroundImages: firebase.firestore.FieldValue.arrayUnion(
                        JSON.stringify({ name: image?.name, url }),
                      ),
                    });
                } else {
                  firestore
                    .collection('chatBackgrounds')
                    .doc(chatConfig.userSecret)
                    .update({
                      backgroundImages: firebase.firestore.FieldValue.arrayUnion(
                        JSON.stringify({ name: image?.name, url }),
                      ),
                    })
                    .then(() => {
                      setImage(new Blob());
                    });
                }
              })
              .catch(e => console.log(e));
          })
          .catch(e => console.log(e));
      });
    setIsUploading(false);
  };
 console.log('urls',urls)
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

          <div
            className={style.backgroundImage}
            style={{ backgroundImage: `url(${backGroundImg})` }}
          >
            <div className={style.availbleImages}>
              <div className={style.toolBar}>
                <Search
                  className={style.search}
                  size={'huge'}
                  loading={true}
                  showNoResults={false}
                  onSearchChange={() => {}}
                />
                <Button className={style.uploadNew} onClick={onUpload}>
                  {' '}
                  <Icon name="upload" />
                  {isUploading ? 'Uploading File...' : ' Upload New'}
                </Button>
              </div>

              <div className={ style.mainContainer}>
                {urls.map(file => {
                  return (
                    <div className={style.container}>
                      <img src={file} alt="Avatar" className={style.image} />
                    
                    </div>)
                })
                }
                </div>
        
            </div>
            <div className={style.preview}></div>
          </div>
        </Modal.Content>

        <Modal.Actions>
          <Button
            color="red"
            disabled={isUploading}
            onClick={() => setOpen(false)}
          >
            Back
          </Button>
          <Button
            content="Done"
            labelPosition="right"
            disabled={!imageSrc}
            icon="checkmark"
            onClick={() => {
              onSubmit();
            }}
            positive
          />
        </Modal.Actions>
      </Modal>
    </div>
  );
};
