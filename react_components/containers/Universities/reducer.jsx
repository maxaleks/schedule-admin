import http from '../../utils/http';

const initState = {
    universities: [],
    showManagePopup: false,
};

export function reducer(state = initState, action) {
    switch (action.type) {
        case 'SET_UNIVERSITIES': {
            return { ...state, universities: action.payload };
        }
        case 'OPEN_UNIVERSITIES_POPUP': {
            return { ...state, showManagePopup: true };
        }
        case 'CLOSE_UNIVERSITIES_POPUP': {
            return { ...state, showManagePopup: false };
        }
        default:
            return state;
    }
}

export function loadUniversities() {
    return (dispatch, getState) => {
        return http.post('http://www.schedulea.h1n.ru/universities/admin/universities').then(data => {
            dispatch({ type: 'SET_UNIVERSITIES', payload: data.data });
        }, data => {
        });
    };
}

export function addUniversity(name) {
    return (dispatch, getState) => {
        return http.post('http://www.schedulea.h1n.ru/universities/admin/university/add', { name }).then(data => {
            dispatch(loadUniversities());
        }, data => {
        });
    };
}

export function editUniversity(form) {
    return (dispatch, getState) => {
        return http.post('http://www.schedulea.h1n.ru/universities/admin/university/edit', form).then(data => {
            dispatch(loadUniversities());
        });
    };
}

export function deleteUniversity(id) {
    return (dispatch, getState) => {
        return http.post('http://www.schedulea.h1n.ru/universities/admin/university/delete', { id }).then(data => {
            dispatch(loadUniversities());
        });
    };
}

export function openManagePopup() {
    return (dispatch, getState) => {
        dispatch({ type: 'OPEN_UNIVERSITIES_POPUP' });
    };
}

export function closeManagePopup() {
    return (dispatch, getState) => {
        dispatch({ type: 'CLOSE_UNIVERSITIES_POPUP' });
    };
}
