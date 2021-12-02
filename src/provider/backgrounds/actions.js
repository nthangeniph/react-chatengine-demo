import { createAction } from 'redux-actions';

export const BackgroundsActionEnums = {
  SetCurrentBAck: 'SET_CURRENT_BACK',
  UpdateAvailableBackgrounds: 'UPDATE_AVAILABLE_BACKGROUNDS',
  FetchAvailableBackgrounds: 'FETCH_AVAILABLE_BACKGROUNDS',
  UploadingNewBackground: 'UPLOADING_NEW_BACKGROUND',
  IsInProgress: 'IS_IN_PROGRESS',
  ResetBackgrounds: 'RESET_BACKGROUNDS',
};

export const getCurrentBackgroundAction = createAction(
  BackgroundsActionEnums.SetCurrentBAck,
  currentBackground => ({ currentBackground }),
);

export const updateAvailableBackgroundsAction = createAction(
  BackgroundsActionEnums.UpdateAvailableBackgrounds,
  newUrl => ({ newUrl }),
);

export const fetchAvailableBackgroundsAction = createAction(
  BackgroundsActionEnums.FetchAvailableBackgrounds,
  availableBackgrounds => ({ availableBackgrounds }),
);

export const isLoadingAction = createAction(
  BackgroundsActionEnums.IsInProgress,
  isInProgress => ({ isInProgress }),
);

export const resetBackgrounsAction = createAction(
  BackgroundsActionEnums.ResetBackgrounds,
  initialBackgrounds => ({ initialBackgrounds }),
);
