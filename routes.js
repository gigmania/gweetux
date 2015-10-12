import React from 'react';
import { Route } from 'react-router';
import App from './containers/App';
import RepoPage from './containers/RepoPage';
import IssuePage from './containers/IssuePage';

export default (
  <Route path="/" component={App}>
    <Route path="/:login/:name"
           component={RepoPage} />
    <Route path="/:login/:name/:number"
           component={IssuePage} />
  </Route>
);
