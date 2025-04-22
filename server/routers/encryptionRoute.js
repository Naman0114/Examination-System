const express=require('express');
const { uploadPaper } = require('../Controller/encrptionController');


const encryptRouter=express.Router();

encryptRouter.post('/uploadPaper',uploadPaper);

module.exports = encryptRouter;
