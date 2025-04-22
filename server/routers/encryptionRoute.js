const express=require('express');
const { uploadPaper } = require('../controller/encrptionController');


const encryptRouter=express.Router();

encryptRouter.post('/uploadPaper',uploadPaper);

module.exports = encryptRouter;
