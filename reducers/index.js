import * as ActionTypes from '../actions';
import merge from 'lodash/object/merge';
import paginate from './paginate';
import { routerStateReducer as router } from 'redux-router';
import { combineReducers } from 'redux';

// Updates an entity cache in response to any action with response.entities.
function entities(state = { users: {}, repos: {}, issues: {}, comments: {}, gazers: {} }, action) {
  if (action.response && action.response.entities) {
    return merge({}, state, action.response.entities);
  }
  return state;
}

// Updates error message to notify about the failed fetches.
function errorMessage(state = null, action) {
  const { type, error } = action;
  if (type === ActionTypes.RESET_ERROR_MESSAGE) {
    return null;
  } else if (error) {
    return action.error;
  }
  return state;
}

// Updates the pagination data for different actions.
const pagination = combineReducers({
  issuesByRepo: paginate({
    mapActionToKey: action => action.fullName,
    types: [
      ActionTypes.ISSUES_REQUEST,
      ActionTypes.ISSUES_SUCCESS,
      ActionTypes.ISSUES_FAILURE
    ]
  }),
  commentsByIssue: paginate({
    mapActionToKey: action => action.number,
    types: [
      ActionTypes.COMMENTS_REQUEST,
      ActionTypes.COMMENTS_SUCCESS,
      ActionTypes.COMMENTS_FAILURE
    ]
  }),
  gazersByRepo: paginate({
    mapActionToKey: action => action.fullName,
    types: [
      ActionTypes.GAZERS_REQUEST,
      ActionTypes.GAZERS_SUCCESS,
      ActionTypes.GAZERS_FAILURE
    ]
  })
});

const rootReducer = combineReducers({
  entities,
  pagination,
  errorMessage,
  router
});

export default rootReducer;
