const LOAD_NOTIFICATIONS = 'LOAD_NOTIFICATIONS';
const INCREMENT_NOTIFICATIONS = 'INCREMENT_NOTIFICATIONS';
const DECREMENT_NOTIFICATIONS = 'DECREMENT_NOTIFICATIONS';
const CLEAR_NOTIFICATIONS = 'CLEAR_NOTIFICATIONS';

export const loadNotifications = ( count ) => {
  return {
    type: LOAD_NOTIFICATIONS,
    payload: count
  };
};

export const incrementNotifications = ( ) => {
  return {
    type: INCREMENT_NOTIFICATIONS,
    payload: null
  };
};

export const decrementNotifications = ( ) => {
  return {
    type: DECREMENT_NOTIFICATIONS,
    payload: null
  };
};

export const clearNotifications = ( ) => {
  return {
    type: CLEAR_NOTIFICATIONS,
    payload: null
  };
};
