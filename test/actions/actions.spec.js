import expect from 'expect';
import * as types from '../../actions/index';
import * as actions from '../../actions/index';

describe('gweetux actions', () => {
  it('loadRepo should exist', () => {
    expect(actions.loadRepo('meteor/meteor')).toExist();
  });
  it('loadIssue should exist', () => {
    expect(actions.loadIssue(9476, 'meteor/meteor')).toExist();
  });
  it('loadComments should exist', () => {
    expect(actions.loadComments(9476, 'meteor/meteor')).toExist();
  });
});
