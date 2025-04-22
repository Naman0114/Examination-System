const express=require('express');

const { authController } = require('../controller/authController');

const authRouter=express.Router();

authRouter.post('/authentication',authController);

module.exports = authRouter;