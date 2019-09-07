import * as t from "./actionTypes";
import firebase from '../../config/firebase';
import {AsyncStorage} from "react-native";
import {generateUUID} from "../../utils/keyUtils";

export const login = (name) => {
    return (dispatch) => {
        return new Promise((resolve, reject) => {
            firebase.auth()
                .signInAnonymously()
                .then(() => {
                    let usersRef = firebase.firestore()
                        .collection('users').doc(name);

                    usersRef.get().then((doc) => {
                        let user;
                        if (false === doc.exists) {
                            let uuid = generateUUID();
                            user = {
                                uuid: uuid,
                                name: name
                            };
                            usersRef.set(user)
                        } else {
                            user = doc.data();
                        }
                        AsyncStorage.setItem('user', JSON.stringify(user));

                        dispatch({type: t.LOGGED_IN, user});

                        resolve();
                    })

                })
                .catch(error => console.log(error));
        });
    }
}

