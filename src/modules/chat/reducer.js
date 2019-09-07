import {AsyncStorage} from 'react-native';

import * as t from './actionTypes';

let initialState = {chatRoom: {chatRoomRef: null, participants: []}};

const chatReducer = (state = initialState, action) => {
    switch (action.type) {
        case t.ENTER_CHATROOM:
            let chatRoom = {
                chatRoomRef: action.output.chatRoomRef,
                participants: action.output.participants,
                messages: action.output.messages
            };
            return Object.assign({}, state, {chatRoom: chatRoom});
        default:
            return state;
    }
};

export default chatReducer;
