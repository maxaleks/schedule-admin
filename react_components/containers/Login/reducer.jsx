import http from '../../utils/http';
import { push } from 'redux-router';

const initState = {
    loginForm: {
        login: '',
        password: '',
    },
    errorText: null,
};

export function reducer(state = initState, action) {
    switch (action.type) {
        case 'SET_ERROR': {
            return { ...state, errorText: action.payload };
        }
        default:
            return state;
    }
}

export function loginAction(form) {
    return (dispatch, getState) => {
        http.post('http://schedulea.h1n.ru/universities/auth/login', form).then(data => {
            localStorage.setItem('token', data.data.token);
            dispatch(push('/universities'));
            dispatch({ type: 'SET_ERROR', payload: null });
        }, error => {
            dispatch({ type: 'SET_ERROR', payload: JSON.parse(error.responseText).errors[0].message });
        });
    };
}
