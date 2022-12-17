import { collection, deleteDoc, doc, setDoc } from "firebase/firestore/lite";
import { FirebaseDB } from "../../firebase/config";
import { fileUpload, loadNotes } from "../../helpers";
import { addNewEmptyNote, setActiveNote, savingNewNote, setNotes, setSaving, updateNote, setPhotosToActiveNote, deleteNoteById } from "./";

export const startNewNote = () => {

    return async (dispatch, getState) => {

        dispatch(savingNewNote());

        // uid (user id)
        const { auth: { uid } } = getState();

        // body
        const newNote = {
            title: "",
            body: "",
            imageUrls: [],
            date: new Date().getTime(),
        };

        const newDoc = doc(collection(FirebaseDB, `${uid}/journal/notes`)); // --> añadir nota a la ruta
        await setDoc(newDoc, newNote);

        newNote.id = newDoc.id;

        // dispatch
        dispatch(addNewEmptyNote(newNote));
        dispatch(setActiveNote(newNote));
    };
};

export const startLoadingNotes = () => {

    return async (dispatch, getState) => {

        const { auth: { uid } } = getState();
        if (!uid) throw new Error('El UID del usuario no existe.');

        const notes = await loadNotes(uid);

        dispatch(setNotes(notes));

    }

}

export const startSaveNote = () => {

    return async (dispatch, getState) => {

        dispatch(setSaving());

        const { auth: { uid } } = getState();
        const { journal: { active: note } } = getState();

        const noteToFirestore = { ...note };
        delete noteToFirestore.id;

        // referencia a la nota
        const docRef = doc(FirebaseDB, `${uid}/journal/notes/${note.id}`);

        // establecemos cambios de la nota en firestore
        await setDoc(docRef, noteToFirestore, { merge: true });

        // actualizamos estado de la nota visual
        dispatch(updateNote(note));
    }

}

export const startUploadingFiles = (files = []) => {

    return async (dispatch) => {

        dispatch(setSaving());

        const filesUploadPromises = [];

        for (const file of files) {
            filesUploadPromises.push(fileUpload(file))
        }

        // promesa iterable
        const photoUrls = await Promise.all(filesUploadPromises);

        dispatch(setPhotosToActiveNote(photoUrls));
    }

}

export const startDeletingNotes = () => {

    return async (dispatch, getState) => {

        const { auth: { uid } } = getState();
        const { journal: { active: note } } = getState();

        // eliminamos de firebase
        const docRef = doc(FirebaseDB, `${uid}/journal/notes/${note.id}`);
        await deleteDoc(docRef);

        // eliminamos locamente
        dispatch(deleteNoteById(note.id))
    }

}