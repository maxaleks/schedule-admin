import http from '../../utils/http';

const initState = {
    specialities: [],
};

export function reducer(state = initState, action) {
    switch (action.type) {
        case 'SET_SPECIALITIES': {
            return { ...state, specialities: action.payload };
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
