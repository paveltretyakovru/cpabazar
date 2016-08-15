'use strict';

import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import configureStore from './store/configureStore';
import injectTapEventPlugin from 'react-tap-event-plugin';
import {syncHistoryWithStore} from 'react-router-redux';
import {Router, Route, IndexRoute, hashHistory, browserHistory} from 'react-router';

import {App, Campaigns, Campaign} from './containers';

import './styles/app.css';

const store = configureStore();
const history = syncHistoryWithStore(hashHistory, store);

injectTapEventPlugin();

render(
  <Provider store={store}>
    <Router history={history} >
      <Route path="/" component={App}>
        <IndexRoute component={Campaigns}/>
        <Route path="campaigns/:id" component={Campaign} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
);

browserHistory.push('/');

module.hot.accept();
