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

const collectionRef = (collection) => {
  return db.collection(collection);
};

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

const teacherData = (email) => {
  try {
    return docRef("teachers", email).get();
  } catch (error) {
    console.log("資料讀取錯誤", error);
  }
};

const studentData = (email) => {
  try {
    return docRef("students", email).get();
  } catch (error) {
    console.log("資料讀取錯誤", error);
  }
};

const allTeachersData = async () => {
  try {
    const teachersData = await collectionRef("teachers").get();
    return teachersData.docs;
  } catch (error) {
    console.log("資料讀取錯誤", error);
  }
};

const findTeacherData = (params) => {
  try {
    return collectionRef("teachers").where("uid", "==", params).get();
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

const updateTeacherData = (email, data) => {
  return docRef("teachers", email).update(data);
};

const updateStudentData = (email, data) => {
  return docRef("students", email).update(data);
};

const arrayUnion = (data) => {
  return firebase.firestore.FieldValue.arrayUnion(data);
};

const arrayRemove = (data) => {
  return firebase.firestore.FieldValue.arrayRemove(data);
};

const deleteField = () => {
  return firebase.firestore.FieldValue.delete();
};

const createOffer = async (pc, roomIdRef) => {
  const callDoc = db.collection("calls").doc(); // create id
  const offerCandidates = callDoc.collection("offerCandidates");
  const answerCandidates = callDoc.collection("answerCandidates");

  roomIdRef.current.textContent = callDoc.id;
  console.log(roomIdRef.current.textContent);

  // Get candidates for caller, save to db
  pc.onicecandidate = (event) => {
    event.candidate && offerCandidates.add(event.candidate.toJSON());
  };

  // Create offer
  const offerDescription = await pc.createOffer();
  await pc.setLocalDescription(offerDescription);

  const offer = {
    sdp: offerDescription.sdp,
    type: offerDescription.type,
  };

  await callDoc.set({ offer });

  // Listen for remote answer
  callDoc.onSnapshot((snapshot) => {
    const data = snapshot.data();
    if (!pc.currentRemoteDescription && data?.answer) {
      const answerDescription = new RTCSessionDescription(data.answer);
      pc.setRemoteDescription(answerDescription);
    }
  });

  // When answered, add candidate to peer connection
  answerCandidates.onSnapshot((snapshot) => {
    snapshot.docChanges().forEach((change) => {
      if (change.type === "added") {
        const candidate = new RTCIceCandidate(change.doc.data());
        pc.addIceCandidate(candidate);
      }
    });
  });
};

const answerCall = async (pc, joinRoomRef) => {
  const callId = joinRoomRef.current.textContent;
  const callDoc = db.collection("calls").doc(callId);
  const offerCandidates = callDoc.collection("offerCandidates");
  const answerCandidates = callDoc.collection("answerCandidates");

  pc.onicecandidate = (event) => {
    event.candidate && answerCandidates.add(event.candidate.toJSON());
  };

  const callData = (await callDoc.get()).data();
  const offerDescription = callData.offer;
  await pc.setRemoteDescription(new RTCSessionDescription(offerDescription));

  const answerDescription = await pc.createAnswer();
  await pc.setLocalDescription(answerDescription);

  const answer = {
    type: answerDescription.type,
    sdp: answerDescription.sdp,
  };

  await callDoc.update({ answer });

  offerCandidates.onSnapshot((snapshot) => {
    snapshot.docChanges().forEach((change) => {
      console.log(change);
      if (change.type === "added") {
        let data = change.doc.data();
        pc.addIceCandidate(new RTCIceCandidate(data));
      }
    });
  });
};

export {
  facebookProvider,
  googleProvider,
  docRef,
  onUserChanged,
  allTeachersData,
  findTeacherData,
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
  updateTeacherData,
  updateStudentData,
  arrayUnion,
  arrayRemove,
  deleteField,
  createOffer,
  answerCall,
};
