import axios from 'axios';

import http from '../../utils/http';

const initState = {
    schedules: [],
    couple: {},
    showManagePopup: false,
    showCouplePopup: false,
    copyCouple: {},
    copyArray: [],
    copying: false,
};

export function reducer(state = initState, action) {
    switch (action.type) {
        case 'SET_SCHEDULES': {
            return { ...state, schedules: action.payload };
        }
        case 'OPEN_GROUP_POPUP': {
            return { ...state, showManagePopup: true };
        }
        case 'CLOSE_GROUP_POPUP': {
            return { ...state, showManagePopup: false };
        }
        case 'OPEN_COUPLE_POPUP': {
            return { ...state, showCouplePopup: true };
        }
        case 'CLOSE_COUPLE_POPUP': {
            return { ...state, showCouplePopup: false };
        }
        case 'SET_COUPLE': {
            return { ...state, couple: action.payload };
        }
        case 'SET_COPY_COUPLE': {
            return { ...state, copyCouple: action.payload };
        }
        case 'SET_COPY_ARRAY': {
            return { ...state, copyArray: action.payload };
        }
        case 'SET_COPYING': {
            return { ...state, copying: action.payload };
        }
        default:
            return state;
    }
}

function schedulesMapping(schedules) {
    schedules.sort((a, b) => Number(a.id) > Number(b.id));
    const mappedSchedules = [];
    schedules.forEach(item => {
        const { groupName, id, amountWeeks } = item;
        const weeks = [];
        for (let i = 1; i <= item.amountWeeks; i++) {
            const couples = [];
            const days = [];
            for (let i = 1; i <= 5; i++) {
                couples.push({ serialNumber: i });
            }
            for (let i = 1; i <= 6; i++) {
                days.push({
                    number: i,
                    couples: couples.slice(),
                });
            }
            weeks.push({
                number: i,
                days: days.slice(),
            });
        }
        if (item.periods) {
            item.periods.forEach(couple => {
                const i = couple.week - 1;
                const j = couple.weekday - 1;
                const k = couple.serialNumber - 1;
                weeks[i].days[j].couples[k] = { ...couple };
            });
        }
        mappedSchedules.push({ groupName, id, weeks: weeks.slice() });
    });
    return mappedSchedules;
}

export function loadSchedules() {
    return (dispatch, getState) => {
        const { specialityId, courseNumber } = getState().router.params;
        return http.post(`http://www.schedulea.h1n.ru/universities/admin/schedules/${specialityId}/${courseNumber}`).then(data => {
            dispatch({ type: 'SET_SCHEDULES', payload: schedulesMapping(data.data) });
        });
    };
}

export function openManagePopup() {
    return (dispatch, getState) => {
        dispatch({ type: 'OPEN_GROUP_POPUP' });
    };
}

export function closeManagePopup() {
    return (dispatch, getState) => {
        dispatch({ type: 'CLOSE_GROUP_POPUP' });
    };
}

export function openCouplePopup(couple) {
    return (dispatch, getState) => {
        dispatch({ type: 'SET_COUPLE', payload: couple });
        dispatch({ type: 'OPEN_COUPLE_POPUP' });
    };
}

export function closeCouplePopup() {
    return (dispatch, getState) => {
        dispatch({ type: 'CLOSE_COUPLE_POPUP' });
    };
}

export function addGroup(form) {
    return (dispatch, getState) => {
        const idSpecialty = getState().router.params.specialityId;
        const course = getState().router.params.courseNumber;
        return http.post('http://www.schedulea.h1n.ru/universities/admin/group/add', { ...form, idSpecialty, course }).then(data => {
            dispatch(loadSchedules());
        });
    };
}

export function editGroup(form) {
    return (dispatch, getState) => {
        const idSpecialty = getState().router.params.specialityId;
        const course = getState().router.params.courseNumber;
        return http.post('http://www.schedulea.h1n.ru/universities/admin/group/edit', { ...form, idSpecialty, course }).then(data => {
            dispatch(loadSchedules());
        });
    };
}

export function deleteGroup(id) {
    return (dispatch, getState) => {
        return http.post('http://www.schedulea.h1n.ru/universities/admin/group/delete', { id }).then(data => {
            dispatch(loadSchedules());
        });
    };
}

export function saveCouple(form) {
    return (dispatch, getState) => {
        return http.post('http://www.schedulea.h1n.ru/universities/admin/editPeriod', form).then(data => {
            dispatch(closeCouplePopup());
            dispatch(loadSchedules());
        });
    };
}

export function addCouple(form) {
    return (dispatch, getState) => {
        return http.post('http://www.schedulea.h1n.ru/universities/admin/addPeriod', form).then(data => {
            dispatch(closeCouplePopup());
            dispatch(loadSchedules());
        });
    };
}

export function removeCouple() {
    return (dispatch, getState) => {
        const { id, idSchedule } = getState().schedule.couple;
        return http.post('http://www.schedulea.h1n.ru/universities/admin/deletePeriod', { id, idSchedule }).then(data => {
            dispatch(closeCouplePopup());
            dispatch(loadSchedules());
        });
    };
}

export function startCopying() {
    return (dispatch, getState) => {
        dispatch({ type: 'SET_COPYING', payload: true });
    };
}

export function endCopying() {
    return (dispatch, getState) => {
        dispatch({ type: 'SET_COPY_ARRAY', payload: [] });
        dispatch({ type: 'SET_COPY_COUPLE', payload: {} });
        dispatch({ type: 'SET_COPYING', payload: false });
    };
}

export function copy() {
    return (dispatch, getState) => {
        const { copyArray, copyCouple } = getState().schedule;
        const promiseArray = copyArray.map(item => {
            const form = {
                ...copyCouple,
                id: item.id,
                idSchedule: item.idSchedule,
                week: item.week,
                weekday: item.weekday,
                serialNumber: item.serialNumber,
            }
            if (item.id) {
                return http.post('http://www.schedulea.h1n.ru/universities/admin/editPeriod', form);
            } else {
                return http.post('http://www.schedulea.h1n.ru/universities/admin/addPeriod', form);
            }
        })
        axios.all(promiseArray).then(() => {
            dispatch(endCopying());
            dispatch(loadSchedules());
        });
    };
}

export function addToCopyArray(couple) {
    return (dispatch, getState) => {
        const schedule = getState().schedule;
        if (!schedule.copyCouple.id) {
            if (couple.id) {
                dispatch({ type: 'SET_COPY_COUPLE', payload: couple });
            }
        } else {
            if (couple.id !== schedule.copyCouple.id) {
                const copyArray = schedule.copyArray.slice();
                const index = copyArray.findIndex(item =>
                    item.serialNumber === couple.serialNumber
                    && item.week === couple.week
                    && item.weekday === couple.weekday
                    && item.idSchedule === couple.idSchedule
                );
                if (index + 1) {
                    copyArray.splice(index, 1);
                } else {
                    copyArray.push(couple);
                }
                dispatch({ type: 'SET_COPY_ARRAY', payload: copyArray });
            }
        }
    };
}
