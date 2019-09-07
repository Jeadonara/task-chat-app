import {AsyncStorage} from 'react-native';

import * as t from './actionTypes';

let initialState = {user: {name: null}};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case t.LOGGED_IN:
            let user = {
                name: action.user.name,
                uuid: action.user.uuid
            };

            return Object.assign({},state, {user: user});


        default:
            return state;
    }
};

export default userReducer;
