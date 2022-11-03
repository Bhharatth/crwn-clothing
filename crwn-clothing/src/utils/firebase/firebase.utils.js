import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import {
    getFirestore,
    doc,
    getDoc,
    setDoc

} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyDstXhdK89hG1GtWatmlg2iUCI3IBojWWQ",
  authDomain: "crwn-clothing-db-788c8.firebaseapp.com",
  projectId: "crwn-clothing-db-788c8",
  storageBucket: "crwn-clothing-db-788c8.appspot.com",
  messagingSenderId: "265519470689",
  appId: "1:265519470689:web:341163022f86787c21b220",
};

const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
    prompt: "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
    const userDoRef = doc(db, 'users', userAuth.uid);
    console.log(userDoRef)


    const userSnapshot = await getDoc(userDoRef);
    console.log(userSnapshot);
    console.log(userSnapshot.exists());

    if(!userSnapshot.exists()) {
        const {displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDoRef, {
                displayName,
                email,
                createdAt
            });
        } catch (error) {
            console.log('error creating the user', error.message);
        }
    }
    return userDoRef;

}