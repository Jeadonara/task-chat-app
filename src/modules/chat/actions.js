import * as t from "./actionTypes";
import firebase from '../../config/firebase';


export const enterChatRoom = (chatRoom) => {
    return (dispatch) => {
        return new Promise((resolve, reject) => {
            let chatRoomsRef = firebase.firestore()
                .collection('chatRooms');

            chatRoomsRef
                .where("participants", "array-contains", chatRoom.participants[0])
                .get()
                .then((snapshot) => {
                    let output = {
                        participants: chatRoom.participants,
                        chatRoomRef: null,
                    };

                    let createNewRecord = true;

                    if (false === snapshot.empty) {
                        snapshot
                            .forEach((doc) => {
                                let data = doc.data();
                                if (data.participants.includes(chatRoom.participants[0]) && data.participants.includes(chatRoom.participants[1])) {
                                    createNewRecord = false;
                                    output.chatRoomRef = doc.ref;
                                }
                            });
                    }

                    if (createNewRecord) {
                        chatRoomsRef.add({messages: [], participants: chatRoom.participants})
                            .then((docRef) => {
                                output.chatRoomRef = docRef;
                                dispatch({type: t.ENTER_CHATROOM, output});
                                resolve()
                            });
                    } else {
                        dispatch({type: t.ENTER_CHATROOM, output});
                        resolve();
                    }
                })
        })
    }
}
