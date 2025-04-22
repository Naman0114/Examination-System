const { PINATA_API_KEY, PINATA_SECRET_KEY } = require('../config.js');
const pinataSDK = require('@pinata/sdk');


exports.uploadToPinata = async (data) => {
    try {
        const pinata = new pinataSDK({ pinataApiKey: PINATA_API_KEY, pinataSecretApiKey: PINATA_SECRET_KEY });
        const result = await pinata.pinJSONToIPFS(data);
        console.log({"IPFShash":result.IpfsHash});
        return result.IpfsHash;

    } catch (error) {
        console.error("Error uploading to Pinata:", error);
        throw new Error('Failed to upload to Pinata');
    }
};

