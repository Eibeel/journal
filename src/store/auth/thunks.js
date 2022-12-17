import { loginWithEmailPassword, logoutFirebase, registerUserWithEmailPassword, signInWithGoogle } from "../../firebase/providers"
import { clearNotesLogout } from "../journal"
import { checkingCredentials, login, logout } from "./"

export const checkingAuthentication = () => {

    return async (dispatch) => {
        dispatch(checkingCredentials()) // --> Chequear credenciales
    }

}

export const startGoogleSignIn = () => {

    return async (dispatch) => {
        dispatch(checkingCredentials()); // --> Chequear credenciales

        const result = await signInWithGoogle();

        if (!result.ok) return dispatch(logout(result.errorMessage))

        dispatch(login(result))
    }

}


export const startCreatingUserWithEmailPassword = ({ email, password, displayName }) => {

    return async (dispatch) => {
        dispatch(checkingCredentials()); // --> Chequear credenciales

        const { ok, uid, photoURL, errorMessage } = await registerUserWithEmailPassword({ email, password, displayName });

        // !ok --> false
        if (!ok) return dispatch(logout({ errorMessage }));

        dispatch(login({ uid, displayName, email, photoURL }));
    }

}


export const startLoginWithEmailPassword = ({ email, password }) => {

    return async (dispatch) => {
        dispatch(checkingCredentials())

        const {ok, uid, displayName, photoURL, errorMessage} = await loginWithEmailPassword({ email, password });

        if (!ok) return dispatch(logout({errorMessage}));

        dispatch(login({uid, displayName, photoURL, email}));

    }

}


export const startLogout = () => {
    
    return async (dispatch) => {

        await logoutFirebase();

        dispatch(clearNotesLogout());
        dispatch(logout());

    }
}
