import firebase from 'firebase';
import firestore from 'firebase/firestore'


const config = {
        apiKey: "AIzaSyAh8gYYx5tzy77LQDN1fUO0liLjD0ffP3A",
        authDomain: "can-tasks-chat.firebaseapp.com",
        databaseURL: "https://can-tasks-chat.firebaseio.com",
        projectId: "can-tasks-chat",
        storageBucket: "can-tasks-chat.appspot.com",
        messagingSenderId: "590043290878",
        appId: "1:590043290878:web:54074c54612fbd7f"
    }
;

firebase.initializeApp(config);
firebase.firestore();

export default firebase;
