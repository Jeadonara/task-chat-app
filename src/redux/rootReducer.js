import {combineReducers} from 'redux';

import {reducer as chatReducer} from "../modules/chat"
import {reducer as userReducer} from "../modules/user"

const rootReducer = combineReducers({chatReducer,userReducer});

export default rootReducer;

