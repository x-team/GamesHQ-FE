import firebase from "firebase/compat/app";

export const firestoreConverter = <T>() => ({
    toFirestore: (data: T) => data,
    fromFirestore: (snap: firebase.firestore.QueryDocumentSnapshot) =>
        snap.data() as T,
});
