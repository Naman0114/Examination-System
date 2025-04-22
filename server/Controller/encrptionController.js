const { uploadToPinata} = require('../services/pinataServices');

exports.uploadPaper = async (req, res) => {
  
    const { testData } = req.body;

    console.log(testData);
  
    const ipfsHash = await uploadToPinata(testData);

    console.log(ipfsHash);

    res.json({
      success: true,
      message: 'Paper uploaded successfully',
      ipfsHash,
    });
  };
