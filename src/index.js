import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import {Provider} from 'react-redux';
import App from './components/App/app.jsx';
import reducer from './reducers/reducer.js';
import thunk from 'redux-thunk';
import {Operation as DataOperation} from './reducers/data/data.js';
import {Operation as UserOperation, ActionCreator, AuthorizationStatus} from "./reducers/user/user.js";
import {createAPI} from '../api.js';

// Выносим код в отдельную функцию, чтобы развязать циклическую зависимость:
// `store` зависит от `api`, а `api` зависит от `store`.
const onUnauthorized = () => {
  store.dispatch(ActionCreator.requireAuthorization(AuthorizationStatus.NO_AUTH));
};

const api = createAPI(onUnauthorized);

const store = createStore(
    reducer,
    // window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : (f) => f
    composeWithDevTools(
        applyMiddleware(thunk.withExtraArgument(api))
    )
);

store.dispatch(DataOperation.loadQuestions());
store.dispatch(UserOperation.checkAuth());

ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>
    , document.getElementById(`root`)
);
