import { collection, getDocs } from "firebase/firestore/lite";
import { FirebaseDB } from "../firebase/config";


export const loadNotes = async (uid = '') => {

    if (!uid) throw new Error('El UID del usuario no existe.');

    // obtener coleccion
    const collectionRef = collection(FirebaseDB, `${uid}/journal/notes`);

    // obtener documentos
    const docs = await getDocs(collectionRef);

    const notes = [];
    docs.forEach(doc => {
        notes.push({ id: doc.id, ...doc.data() });
    })

    return notes;
}