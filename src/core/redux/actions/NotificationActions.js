import * as NotificationTypes from '../../constants/NotificationTypes';

export function hasBeenAlertedOfRefresh(hasBeenAlerted) {
  console.log("INSIDE HAS BEEN...", hasBeenAlerted);
  return {
    type: NotificationTypes.HAS_BEEN_ALERTED_OF_REFRESH,
    hasBeenAlerted,
  }
}
