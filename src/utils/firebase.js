import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app();
}

export default firebase;

const facebookProvider = new firebase.auth.FacebookAuthProvider();
const googleProvider = new firebase.auth.GoogleAuthProvider();

const db = firebase.firestore();
const storage = firebase.storage();

const docRef = (collection, currentUserEmail) => {
  return db.collection(collection).doc(currentUserEmail);
};

const teacherSnapshot = (
  teachersRef,
  currentUserEmail,
  teacherDoc,
  callback
) => {
  if (teacherDoc.data().email === currentUserEmail) {
    teachersRef.onSnapshot((doc) => {
      callback(doc.data());
      console.log("老師資料", doc.data());
    });
  }
};

const studentSnapshot = (
  studentsRef,
  currentUserEmail,
  studentDoc,
  callback
) => {
  if (studentDoc.data().email === currentUserEmail) {
    return studentsRef.onSnapshot((doc) => {
      callback(doc.data());
      console.log("學生資料", doc.data());
    });
  }
};

const teacherData = async (currentUserEmail) => {
  try {
    return await docRef("teachers", currentUserEmail).get();
  } catch (error) {
    console.log("資料讀取錯誤", error);
  }
};

const studentData = async (currentUserEmail) => {
  try {
    return await docRef("students", currentUserEmail).get();
  } catch (error) {
    console.log("資料讀取錯誤", error);
  }
};

const onUserChanged = (callback) => {
  firebase.auth().onAuthStateChanged((currentUser) => {
    if (currentUser) {
      callback(currentUser);
    } else {
      callback(currentUser);
    }
  });
};

const nativeUserSignup = (email, password) => {
  return firebase.auth().createUserWithEmailAndPassword(email, password);
};

const setNewUserData = (collection, name, user) => {
  return docRef(collection, user.email).set({
    name: name,
    email: user.email,
    uid: user.uid,
    photo: user.photoURL,
  });
};

const nativeUserSignin = (email, password) => {
  return firebase.auth().signInWithEmailAndPassword(email, password);
};

const signInWithPopup = (provider) => {
  return firebase.auth().signInWithPopup(provider);
};

const userSignOut = () => {
  return firebase.auth().signOut();
};

const uploadProfileImage = async (value, currentUserEmail) => {
  const fileRef = storage.ref("profile-picture/" + currentUserEmail);
  const metadata = {
    contentType: value.type,
  };

  try {
    await fileRef.put(value, metadata);
    const imageURL = await fileRef.getDownloadURL();

    const teacherDoc = await teacherData(currentUserEmail);
    if (teacherDoc.exists) {
      docRef("teachers", currentUserEmail).update({
        photo: imageURL,
      });
    }

    const studentDoc = await studentData(currentUserEmail);
    if (studentDoc.exists) {
      docRef("students", currentUserEmail).update({
        photo: imageURL,
      });
    }
  } catch (error) {
    console.log("資料讀取有誤：", error);
  }
};

export {
  facebookProvider,
  googleProvider,
  docRef,
  onUserChanged,
  teacherData,
  studentData,
  teacherSnapshot,
  studentSnapshot,
  nativeUserSignup,
  setNewUserData,
  nativeUserSignin,
  signInWithPopup,
  userSignOut,
  uploadProfileImage,
};
