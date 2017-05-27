import { invitesAdapter } from '../adapters/invitesAdapter';

const ADD_INVITE = 'ADD_INVITE';
const LOAD_INVITES = 'LOAD_INVITES';
const REMOVE_INVITE = 'REMOVE_INVITE';
const CLEAR_INVITES = 'CLEAR_INVITES';

export const addInvite = ( invite ) => {

  return {
    type: ADD_INVITE,
    payload: invite
  };
};

export const inviteToGame = ( invite ) => {
  const Invite = invitesAdapter.inviteToGame( invite )
    .then( response => response );

  return {
    type: ADD_INVITE,
    payload: Invite
  };
};

export const loadInvites = ( user ) => {
  const pendingGames = invitesAdapter.loadInvites( user )
    .then( response => {
      let pendingGames = [];

      for ( let i = 0; i < response.length; i++ ) {
        if ( response[i].pending ) {
          response[i].boardId = response[i]._id.toString();
          response[i].challenger = response[i].players[0].username;
          response[i].challengee = response[i].players[1].username;
          pendingGames.push( response[i] );
        };
      };
      return pendingGames;
    });

  return {
    type: LOAD_INVITES,
    payload: pendingGames
  };
};

export const respondInvite = ( user, invite ) => {
  invitesAdapter.respondInvite( user, invite )
    .then( response => response.data);

  return {
    type: REMOVE_INVITE,
    payload: invite
  };
};

export const removeInvite = ( invite ) => {

  return {
    type: REMOVE_INVITE,
    payload: invite
  };
};

export const clearInvites = ( ) => {

  return {
    type: CLEAR_INVITES,
    payload: null
  };
};
