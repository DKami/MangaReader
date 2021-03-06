import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, hashHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import store from './store/appStore';
import { pullMangas } from './actions/mangas';
import routes from './routes';

const history = syncHistoryWithStore(hashHistory, store);

store.dispatch(pullMangas());

ReactDOM.render(
  <Provider store={store}>
    <Router history={history} routes={routes} />
  </Provider>
  , document.getElementById('root'));
