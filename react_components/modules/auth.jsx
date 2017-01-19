
import { push } from 'redux-router';

import http from '../utils/http';

const initState = {
    role: null,
};

export function reducer(state = initState, action) {
    switch (action.type) {
        case 'SET_ROLE': {
            return { ...state, role: action.payload };
        }
        default:
            return state;
    }
}

export function makeRequireAuth(dispatch, getState) {
    return (nextState, replace, next) => {
        const pathname = nextState.location.pathname;
        const isLogged = !!localStorage.getItem('token');
        if (!isLogged) {
            dispatch(push('login'));
        } else {
            http.post('http://www.schedulea.h1n.ru/universities/admin/getRole', {}).then(data => {
                dispatch({ type: 'SET_ROLE', payload: data.data.role });
                next();
            });
        }
    };
}

export function logout() {
    return (dispatch, getState) => {
        localStorage.removeItem('token')
        dispatch(push('login'));
    };
}
