import { CALL_API, Schemas } from '../middleware/api';

export const REPO_REQUEST = 'REPO_REQUEST';
export const REPO_SUCCESS = 'REPO_SUCCESS';
export const REPO_FAILURE = 'REPO_FAILURE';

export const ISSUES_REQUEST = 'ISSUES_REQUEST';
export const ISSUES_SUCCESS = 'ISSUES_SUCCESS';
export const ISSUES_FAILURE = 'ISSUES_FAILURE';

export const ISSUE_REQUEST = 'ISSUE_REQUEST';
export const ISSUE_SUCCESS = 'ISSUE_SUCCESS';
export const ISSUE_FAILURE = 'ISSUE_FAILURE';

export const COMMENTS_REQUEST = 'COMMENTS_REQUEST';
export const COMMENTS_SUCCESS = 'COMMENTS_SUCCESS';
export const COMMENTS_FAILURE = 'COMMENTS_FAILURE';


// Fetches a single repository from Github API.
// Relies on the custom API middleware defined in ../middleware/api.js.
function fetchRepo(fullName) {
  console.log('in the Fetch Repo');
  return {
    [CALL_API]: {
      types: [REPO_REQUEST, REPO_SUCCESS, REPO_FAILURE],
      endpoint: `repos/${fullName}`,
      schema: Schemas.REPO
    }
  };
}

// Fetches a single repository from Github API unless it is cached.
// Relies on Redux Thunk middleware.
export function loadRepo(fullName, requiredFields = []) {
  console.log('in the load Repo');
  return (dispatch, getState) => {
    const repo = getState().entities.repos[fullName];
    if (repo && requiredFields.every(key => repo.hasOwnProperty(key))) {
      return null;
    }
    return dispatch(fetchRepo(fullName));
  };
}

function fetchIssue(number, fullName) {
  return {
    [CALL_API]: {
      types: [ISSUE_REQUEST, ISSUE_SUCCESS, ISSUE_FAILURE],
      endpoint: `repos/${fullName}/issues/${number}`,
      schema: Schemas.ISSUE
    }
  };
}

export function loadIssue(number, fullName, requiredFields = []) {
  console.log('in the load issue');
  console.log(number);
  return (dispatch, getState) => {
    const issue = getState().entities.issues[number];
    if (issue && requiredFields.every(key => issue.hasOwnProperty(key))) {
      return null;
    }
    return dispatch(fetchIssue(number, fullName));
  };
}

// Fetches a page of issues for a particular repo.
// Relies on the custom API middleware defined in ../middleware/api.js.
function fetchIssues(fullName, nextPageUrl) {
  return {
    fullName,
    [CALL_API]: {
      types: [ISSUES_REQUEST, ISSUES_SUCCESS, ISSUES_FAILURE],
      endpoint: nextPageUrl,
      schema: Schemas.ISSUE_ARRAY
    }
  };
}

// Fetches a page of issues for a particular repo.
// Bails out if page is cached and user didn’t specifically request next page.
// Relies on Redux Thunk middleware.
export function loadIssues(fullName, nextPage) {
  return (dispatch, getState) => {
    const {
      nextPageUrl = `repos/${fullName}/issues?per_page=25`,
      pageCount = 0
    } = getState().pagination.issuesByRepo[fullName] || {};
    if (pageCount > 0 && !nextPage) {
      return null;
    }
    return dispatch(fetchIssues(fullName, nextPageUrl));
  };
}

function fetchComments(number, nextPageUrl) {
  return {
    number,
    [CALL_API]: {
      types: [COMMENTS_REQUEST, COMMENTS_SUCCESS, COMMENTS_FAILURE],
      endpoint: nextPageUrl,
      schema: Schemas.COMMENT_ARRAY
    }
  };
}

export function loadComments(number, fullName) {
  return (dispatch, getState) => {
    const {
      nextPageUrl = `repos/${fullName}/issues/${number}/comments`,
      pageCount = 0
    } = getState().pagination.commentsByIssue[number] || {};
    if (pageCount > 0 && !nextPage) {
      return null;
    }
    return dispatch(fetchComments(number, nextPageUrl));
  };
}

export const RESET_ERROR_MESSAGE = 'RESET_ERROR_MESSAGE';
export function resetErrorMessage() {
  return {
    type: RESET_ERROR_MESSAGE
  };
}
