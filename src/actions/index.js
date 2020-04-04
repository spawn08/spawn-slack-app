/**
 * Created by Amar on 07-03-2020.
 */

import * as actionTypes from "./types";

export const setUser = user => {
  return {
    type: actionTypes.SET_USER,
    payload: {
      currentUser: user
    }
  };
};

export const clearUser = () => {
  return {
    type: actionTypes.CLEAR_USER
  };
};

export const setCurrentChannel = channel => {
  return {
    type: actionTypes.CURRENT_CHANNEL,
    payload: {
      currentChannel: channel
    }
  };
};

export const setPrivateChannel = isPrivateChannel => {
    return {
      type: actionTypes.SET_PRIVATE_CHANNEL,
      payload:{
        isPrivateChannel
      }

    }
}
