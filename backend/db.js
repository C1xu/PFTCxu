import Firestore from "@google-cloud/firestore"
import {createHmac} from "crypto";

export const GOOGLE_APPLICATION_CREDITIALS = './key.json';

const db = new Firestore({
    projectId: "pftcxu",
    keyFilename: GOOGLE_APPLICATION_CREDITIALS
});

export async function CreateUser(name, surname, email, password){
    const docRef = db.collection("users").doc().email;
    return await docRef.set({
        name: name,
        surname: surname,
        email: email,
        password: HashPassword(password),
    });
}

export async function GetUser(email){
    const docRef = db.collection("users");
    const snapshot = await docRef.where("email", "==", email).get();
    let data = [];
    snapshot.forEach((doc) => {
        data.push(doc.data());
    });
    return data;
}

export function HashPassword(password){
    const secret = "i<3PftC"
    return createHmac("sha256", password).update(secret).digest("hex");
}