const express=require('express');
const { uploadFile } = require('../controller/uploadController');

const uploadFileRouter=express.Router();

uploadFileRouter.post('/uploadFile',uploadFile);

module.exports=uploadFileRouter;