import React, { useContext } from 'react';
import {
  BackgroundActionContext,
  initialBackgroundState,
  BackgroundStateContext,
} from './contex';
import {
  fetchAvailableBackgroundsAction,
  isLoadingAction,
  resetBackgrounsAction,
  updateAvailableBackgroundsAction,
  getCurrentBackgroundAction,
} from './actions';
import { backgroundsReducer } from './reducer';
import { useFirebase } from 'service';
import { useChat } from 'components/context';
import { useReducer } from 'react';

export const BackgroundsProvider = ({ children }) => {
  const { firestore, storage,firebase} = useFirebase();
  const { chatConfig } = useChat();
  const [state, dispatch] = useReducer(
    backgroundsReducer,
    initialBackgroundState,
  );

  async function fetchAvailableBackgrounds() {
    dispatch(isLoadingAction(true));
    await firestore
      .collection('chatBackgrounds')
      .doc(chatConfig?.userSecret)
      .get()
      .then(doc => {
        if (doc?.exists) {
          let arrHolder = doc?.data().backgroundImages;
          let urls = arrHolder.map(img => JSON.parse(img).url);
          dispatch(fetchAvailableBackgroundsAction(urls));
        }
      });
    dispatch(isLoadingAction(false));
  }
  const updateAvailableBackgrounds = url => {
    dispatch(isLoadingAction(true));
    dispatch(updateAvailableBackgroundsAction(url));
    dispatch(isLoadingAction(false));
  };

  const setCurrentBackground = url => {
    dispatch(getCurrentBackgroundAction(url));
  };

  const uploadingNewBackground = async (imgSrc,setImage,image) => {

    let isUpdatingProfile;
    dispatch(isLoadingAction(true));
    await firestore
      .collection('chatBackgrounds')
      .doc(chatConfig.userSecret)
      .get()
      .then(doc => {
        isUpdatingProfile = doc.exists;
      });

    fetch(imgSrc)
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
                updateAvailableBackgrounds(url);
                if (!isUpdatingProfile) {
                  firestore
                    .collection('chatBackgrounds')
                    .doc(chatConfig.userSecret)
                    .set({
                      backgroundImages: firebase.firestore.FieldValue.arrayUnion(
                        JSON.stringify({ name: image?.name, url }),
                      ),
                    });
                    dispatch(updateAvailableBackgroundsAction(url));
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
                      dispatch(updateAvailableBackgroundsAction(url));
                      setImage(new Blob());
                    });
                }
              })
              .catch(e => console.log(e));
          })
          .catch(e => console.log(e));
      });
      dispatch(isLoadingAction(false));
    
  }

  const resetBackgrounds = () => {
    dispatch(resetBackgrounsAction(initialBackgroundState));
  };

  return (
    <BackgroundStateContext.Provider value={state}>
      <BackgroundActionContext.Provider
        value={{
          fetchAvailableBackgrounds,
          updateAvailableBackgrounds,
          setCurrentBackground,
          uploadingNewBackground,
          resetBackgrounds,
        }}
      >
        {children}
      </BackgroundActionContext.Provider>
    </BackgroundStateContext.Provider>
  );
};
function useBackgroundState() {
  const context = useContext(BackgroundStateContext);
  if (context === undefined) {
    throw new Error(
      'You can only access these values if you are within the provider',
    );
  }
  return {
    ...context,
  };
}

function useBackgroundAction() {
  const context = useContext(BackgroundActionContext);
  if (context === undefined) {
    throw new Error(
      'You can only access these values if you are within the provider',
    );
  }
  return {
    ...context,
  };
}

function useBackgrounds() {
  return { ...useBackgroundAction(), ...useBackgroundState() };
}
export { useBackgroundState, useBackgroundAction, useBackgrounds };
