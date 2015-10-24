import React from 'react';
import { Route } from 'react-router';
import App from './containers/App';
import RepoPage from './containers/RepoPage';
import IssuePage from './containers/IssuePage';
import GazerPage from './containers/GazerPage';

export default (
  <Route path="/" component={App}>
    <Route path="/:login/:name"
           component={RepoPage} />
         <Route path="/:login/:name/issue/:number"
                component={IssuePage} />
    <Route path="/:login/:name/gazers"
           component={GazerPage} />
  </Route>
);
