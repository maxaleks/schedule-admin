import http from '../../utils/http';

const initState = {
    specialities: [],
    showManagePopup: false,
};

export function reducer(state = initState, action) {
    switch (action.type) {
        case 'SET_SPECIALITIES': {
            return { ...state, specialities: action.payload };
        }
        case 'OPEN_SPECIALITIES_POPUP': {
            return { ...state, showManagePopup: true };
        }
        case 'CLOSE_SPECIALITIES_POPUP': {
            return { ...state, showManagePopup: false };
        }
        default:
            return state;
    }
}

export function loadSpecialities() {
    return (dispatch, getState) => {
        const id = getState().router.params.facultyId;
        return http.post(`http://www.schedulea.h1n.ru/universities/admin/specialties/${id}`).then(data => {
            dispatch({ type: 'SET_SPECIALITIES', payload: data.data });
        }, data => {
        });
    };
}

export function addSpeciality(name) {
    return (dispatch, getState) => {
        const idFaculty = getState().router.params.facultyId;
        return http.post('http://www.schedulea.h1n.ru/universities/admin/speciality/add', { name, idFaculty }).then(data => {
            dispatch(loadSpecialities());
        }, data => {
        });
    };
}

export function editSpeciality(form) {
    return (dispatch, getState) => {
        const idFaculty = getState().router.params.facultyId;
        return http.post('http://www.schedulea.h1n.ru/universities/admin/speciality/edit', { ...form, idFaculty }).then(data => {
            dispatch(loadSpecialities());
        });
    };
}

export function deleteSpeciality(id) {
    return (dispatch, getState) => {
        return http.post('http://www.schedulea.h1n.ru/universities/admin/speciality/delete', { id }).then(data => {
            dispatch(loadSpecialities());
        });
    };
}

export function openManagePopup() {
    return (dispatch, getState) => {
        dispatch({ type: 'OPEN_SPECIALITIES_POPUP' });
    };
}

export function closeManagePopup() {
    return (dispatch, getState) => {
        dispatch({ type: 'CLOSE_SPECIALITIES_POPUP' });
    };
}
