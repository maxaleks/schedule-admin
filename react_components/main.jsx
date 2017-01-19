import React, { PropTypes } from 'react';
import { render } from 'react-dom';

import getRoutes from './routes';

import { appStart } from './actions';

import { Provider } from 'react-redux';
import { ReduxRouter } from 'redux-router';
import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';

import useScroll from 'scroll-behavior';

import createHistory from 'history/lib/createHashHistory';
import rootReducer from './reducers';
import { reduxReactRouter } from 'redux-router';

import './css/main.scss';


const middleware = applyMiddleware(thunk);

const createHistoryCustom = (options) => useScroll(createHistory({ queryKey: false, ...options }));

const createStoreWithMiddleware = compose(
    middleware,
    reduxReactRouter({ createHistory: createHistoryCustom })
);

const _store = createStoreWithMiddleware(createStore)(rootReducer);

const Root = ({ store }) => (
    <Provider store={store}>
        <ReduxRouter>
            {getRoutes(store)}
        </ReduxRouter>
    </Provider>
);

Root.propTypes = {
    store: PropTypes.object.isRequired,
};

window.onload = function() {
    _store.dispatch(appStart(() => {
    render((
        <Root store={_store} />
    ), document.getElementById('content'));
    }));
};
