import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, updateProfile } from "firebase/auth";
import { FirebaseAuth } from "./config";

const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {

    try {

        const { user: { displayName, email, photoURL, uid } } = await signInWithPopup(FirebaseAuth, googleProvider);
        // const credentials = GoogleAuthProvider.credentialFromResult(result);

        return {
            ok: true,
            displayName,
            email,
            photoURL,
            uid
        }

    } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;

        return {
            ok: false,
            errorMessage,
            errorCode
        }
    }

}


export const registerUserWithEmailPassword = async ({ email, password, displayName }) => {

    try {

        const { user: { uid, photoURL } } = await createUserWithEmailAndPassword(FirebaseAuth, email, password);

        // TODO: actualizar displayName del usuario
        await updateProfile(FirebaseAuth.currentUser, { displayName })

        return {
            ok: true,
            uid, photoURL, email, displayName
        }

    } catch (error) {

        // validación de correo en uso.
        if (error.message === 'Firebase: Error (auth/email-already-in-use).') {
            return {
                ok: false,
                errorMessage: 'El correo electrónico ya está en uso.'
            }
        }

    }

}


export const loginWithEmailPassword = async ({ email, password }) => {

    try {

        const { user: { uid, photoURL, displayName } } = await signInWithEmailAndPassword(FirebaseAuth, email, password)

        return {
            ok: true,
            uid, photoURL, displayName
        }

    } catch (error) {

        if (error.message === 'Firebase: Error (auth/user-not-found).') {
            return {
                ok: false,
                errorMessage: 'Usuario no existente.'
            }
        }

    }

}


export const logoutFirebase = async () => {
    return await FirebaseAuth.signOut();
}
