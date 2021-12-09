import axios from 'axios'

export const imgService = {
    getImgs
}

// i7fEMhHrCH8rG01ZJSS1H_1fNykJydAkaL4PKPDB8vU
// https://api.unsplash.com/search/photos?page=1&per_page=12&query=dog&client_id=i7fEMhHrCH8rG01ZJSS1H_1fNykJydAkaL4PKPDB8vU

async function getImgs(searchBy) {
    // return console.log('Service', searchBy);
    const url = `https://api.unsplash.com/search/photos?page=1&per_page=12&query=${searchBy}&client_id=i7fEMhHrCH8rG01ZJSS1H_1fNykJydAkaL4PKPDB8vU`
    try {
        const res = await axios.get(url)
        console.log('Res', res);
        console.log('Data', res.data);
        return res.data.results.map(result => {
            return {
                // fullImg: { backgroundImg: result.urls.full },
                // smallImg: { backgroundImg: result.urls.smaill },
                fullImg: result.urls.full,
                smallImg: result.urls.small,
                id: result.id
            }
        })
    }
    catch (err) {
        console.log('Couldnt get images', err);
        throw err
    }
}