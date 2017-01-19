import React from 'react';
import { Route, IndexRoute, IndexRedirect } from 'react-router';

import { makeRequireAuth } from './modules/auth';

import Login from './containers/Login';
import Schedule from './containers/Schedule';
import Universities from './containers/Universities';
import Faculties from './containers/Faculties';
import Specialities from './containers/Specialities';
import Courses from './containers/Courses';


function getWaite(dispatch) {
    return (action) =>
            (nextState, replace, next) =>
            dispatch(action(nextState.params, nextState.location.query, next));
}

export default ({ dispatch, getState }) => {
    const dispatchAction = getWaite(dispatch);
    const requireAuth = makeRequireAuth(dispatch, getState);
    return (
        <Route path='/'>
            <Route onEnter={requireAuth}>
                <IndexRedirect to='/universities' />
                <Route path='universities' component={Universities}/>
                <Route path='universities/:universityId/faculties' component={Faculties}/>
                <Route path='universities/:universityId/faculties/:facultyId/specialities' component={Specialities}/>
                <Route path='universities/:universityId/faculties/:facultyId/specialities/:specialityId/courses' component={Courses}/>
                <Route path='universities/:universityId/faculties/:facultyId/specialities/:specialityId/courses/:courseNumber/schedules' component={Schedule}/>
            </Route>
            <Route path='login' component={Login} />
        </Route>
    );
};
