import expect from 'expect';
import * as middleware from '../../middleware/api'


describe('gweetux middleware tests', () => {
  it('Schemas should exist', () => {
    expect(middleware.Schemas).toExist();
  });
  it('callAPI function should exist', () => {
    expect(middleware.callApi('meteor/meteor', middleware.Schemas.REPO)).toExist();
  });
});
