// subir un archivo a la vez

export const fileUpload = async (file) => {

    if (!file) throw new Error('No hay ningún archivo en cola.')

    const cloudUrl = 'https://api.cloudinary.com/v1_1/journal-app-prueba/upload';

    // construimos el body de la peticion
    const formData = new FormData(); // --> key - value
    formData.append('upload_preset', 'journal-app');
    formData.append('file', file)

    try {

        const resp = await fetch(cloudUrl, {
            method: 'POST',
            body: formData
        });

        if (!resp.ok) throw new Error('No se pudo subir el archivo.')

        const cloudResp = await resp.json();

        return cloudResp.secure_url;

    } catch (error) {
        console.log(error);
        throw new Error(error.message)
    }


}