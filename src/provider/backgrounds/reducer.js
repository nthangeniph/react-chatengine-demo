import { BackgroundsActionEnums } from './actions';

export function backgroundsReducer(currentState, action) {
  const { type, payload } = action;

  switch (type) {
    case BackgroundsActionEnums.SetCurrentBAck:
    case BackgroundsActionEnums.FetchAvailableBackgrounds:
    case BackgroundsActionEnums.UpdateAvailableBackgrounds:
    case BackgroundsActionEnums.IsInProgress:
      return {
        ...currentState,
        ...payload,
      };
    case BackgroundsActionEnums.ResetBackgrounds:
      return {
        ...currentState,
        currentBackground: '',
        newUrl: '',
        availableBackgrounds: [],
        isInProgress: false,
      };
    default:
      return {
        ...currentState,
        ...payload,
      };
  }
}
