const { PINATA_API_KEY, PINATA_SECRET_KEY } = require('../config.js');

async function uploadFile(req, res, next) {

    try {
        const pinataSDK = require('@pinata/sdk');
        const pinata = new pinataSDK({ pinataApiKey: PINATA_API_KEY, pinataSecretApiKey: PINATA_SECRET_KEY });
        const result = await pinata.testAuthentication();

        console.log(result);
        res.status(200).json({ success: 'authenticate success' });
    } catch (error) {
        console.log(error);
    }

}

module.exports = { uploadFile };