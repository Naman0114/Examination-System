const { uploadToPinata} = require('../services/pinataServices');

exports.uploadPaper = async (req, res) => {
  
    const payload  = req.body;

    console.log(payload);
  
    const ipfsHash = await uploadToPinata(payload);

    console.log(ipfsHash);

    res.json({
      success: true,
      message: 'Paper uploaded successfully',
      ipfsHash,
    });
  };
