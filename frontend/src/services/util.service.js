import axios from 'axios';

export const utilService = {
    makeId,
    upload,
}

function makeId(length = 5) {
    var text = ''
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    for (var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return text
}

// AXIOS
async function upload(ev, url) {
    console.log(url);
    const type = 'image'
    const UPLOAD_PRESET = 'trollo'
    const CLOUD_NAME = 'trollo'
    const UPLOAD_URL = `https://api.cloudinary.com/v1_1/trollo/${type}/upload`
    const FORM_DATA = new FormData();
    FORM_DATA.append('file', url)
    FORM_DATA.append('upload_preset',UPLOAD_PRESET)
    try {
        const res = await axios.post(UPLOAD_URL, FORM_DATA)
        console.log(res.data);
        return res.data;
    } catch(err) {
        console.error('ERROR!', err)
    }
}