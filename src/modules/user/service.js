import {AsyncStorage} from "react-native";
import firebase from "../../config/firebase";

export const getUser = (callback) => {
    AsyncStorage.getItem('user')
        .then((value) => {
            callback(value !== null ? JSON.parse(value) : null);
        })
        .catch(error => console.log(error));
};

export const getUsers = (sessionUser) => {
    return new Promise((resolve, reject) => {
        let users = [];
        firebase.firestore()
            .collection('users')
            .get()
            .then((snapshot) => {
                snapshot.forEach((doc) => {

                    let user = doc.data();

                    if (sessionUser.uuid !== user.uuid) {
                        users.push({name: user.name, uuid: user.uuid})
                    }

                });
                resolve(users);
            })
    });
};
