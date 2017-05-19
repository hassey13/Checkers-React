import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import promiseMiddleware from 'redux-promise';
import { createStore, applyMiddleware } from 'redux';
import rootReducer from './reducers/index';

import App from './containers/App';
import '../public/stylesheets/index.css';

const store = createStore( rootReducer, applyMiddleware( promiseMiddleware ) );

ReactDOM.render(
  <Provider store={ store }>
    <App />
  </Provider>,
  document.getElementById('root')
);
