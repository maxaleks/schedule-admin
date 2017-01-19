import { combineReducers } from 'redux';
import { routerStateReducer } from 'redux-router';
import { reducer as formReducer } from 'redux-form';

import { reducer as auth } from './modules/auth';
import { reducer as login } from './containers/Login/reducer';
import { reducer as schedule } from './containers/Schedule/reducer';
import { reducer as universities } from './containers/Universities/reducer';
import { reducer as faculties } from './containers/Faculties/reducer';
import { reducer as specialities } from './containers/Specialities/reducer';


export default combineReducers({
    auth,
    schedule,
    login,
    universities,
    faculties,
    specialities,
    router: routerStateReducer,
    form: formReducer,
});
