import Firestore from "@google-cloud/firestore"

export const GOOGLE_APPLICATION_CREDITIALS = './key.json';

const db = new Firestore({
    projectId: "pftcxu",
    keyFilename: GOOGLE_APPLICATION_CREDITIALS
});

export async function CreateUser(name, surname, email, password){
    const docRef = db.collection("users").doc(email)
    return await docRef.set({
        name: name,
        surname: surname,
        email: email,
        password: password,
    });
}

export async function GetUser(email){
    const docRef = db.collection("users").doc(email)
    return await docRef.get();
}