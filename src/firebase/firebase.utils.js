import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyCag7_VAsMpCO7TmQjm3CFMP2Qs5wVIMSw",
    authDomain: "test-project-de963.firebaseapp.com",
    projectId: "test-project-de963",
    storageBucket: "test-project-de963.appspot.com",
    messagingSenderId: "652428755555",
    appId: "1:652428755555:web:1d289b2996546433b26e56",
    measurementId: "G-MWPDZBKR4X"
};

export const createUserProfileDocument = async (userAuth, addtionalData) => {
    if(!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);

    const snapShot = await userRef.get();

    if(!snapShot.exists) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...addtionalData
            })
        } catch (error) {
            console.log('error creating user', error.message);
        }
    }

    return userRef;
}


firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWIthGoogle = () => auth.signInWithPopup(provider);

export default firebase;
