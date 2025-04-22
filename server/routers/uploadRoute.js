const express=require('express');
const { uploadFile } = require('../Controller/uploadController');

const uploadFileRouter=express.Router();

uploadFileRouter.post('/uploadFile',uploadFile);

module.exports=uploadFileRouter;