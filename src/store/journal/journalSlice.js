import { createSlice } from '@reduxjs/toolkit';

export const journalSlice = createSlice({
    name: 'journal',
    initialState: {
        isSaving: false, // --> guardando
        messageSaved: '', // --> mensaje de grabacion
        notes: [], // --> notas almacenadas
        active: null // --> nota activa
    },
    reducers: {
        // guardando nota...
        savingNewNote: (state) => {
            state.isSaving = true;
        },
        // crear nueva entrada
        addNewEmptyNote: (state, action) => {
            state.notes.push(action.payload);
            state.isSaving = false;
        },
        // nota activa
        setActiveNote: (state, action) => {
            state.active = action.payload;
            state.messageSaved = '';
        },
        // leer notas
        setNotes: (state, action) => {
            state.notes = action.payload;
        },
        // guardar nota
        setSaving: (state) => {
            state.isSaving = true;
            state.messageSaved = '';

            // TODO: mensaje de error
        },
        // actualizar estado de nota
        updateNote: (state, action) => {
            state.isSaving = false;
            state.notes = state.notes.map(note => {

                if (note.id === action.payload.id) {
                    return action.payload;
                }

                return note;

                // TODO: mostrar mensaje de actualizacion
            })
            state.messageSaved = `${action.payload.title} actualizada correctamente.`;
        },
        setPhotosToActiveNote: (state, action) => {
            state.isSaving = false;
            state.active.imageUrls = [...state.active.imageUrls, ...action.payload]
        },
        // limpiar notas cerrada la sesion
        clearNotesLogout: (state) => {
            state.isSaving = false;
            state.messageSaved = '';
            state.notes = [];
            state.active = null;
        },
        // eliminacion
        deleteNoteById: (state, action) => {
            state.active = null;
            state.notes = state.notes.filter( note => note.id !== action.payload ); // --> return de notas diferentes a la filtrada
        }
    }
});


// Action creators are generated for each case reducer function
export const { 
    addNewEmptyNote,
    clearNotesLogout,
    deleteNoteById, 
    savingNewNote,
    setActiveNote, 
    setNotes, 
    setPhotosToActiveNote, 
    setSaving,
    updateNote,
} = journalSlice.actions;
