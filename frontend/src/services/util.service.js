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

async function upload(ev) {
    const type = ev.target.files[0].type.substring(0, ev.target.files[0].type.indexOf('/'))
    const UPLOAD_PRESET = 'trollo'
    const CLOUD_NAME = 'trollo'
    const UPLOAD_URL = `https://api.cloudinary.com/v1_1/trollo/${type}/upload`
    const FORM_DATA = new FormData();
    FORM_DATA.append('file', ev.target.files[0])
    FORM_DATA.append('upload_preset',UPLOAD_PRESET)
    try {
        const res = await axios.post(UPLOAD_URL, FORM_DATA)
        console.log(res.data);
        return res.data;
    } catch(err) {
        console.error('ERROR!', err)
    }
}