const express=require('express');
const {UserController}=require('../../controllers')
const {AuthMiddleware}=require('../../middlewares')
const router=express.Router();

router.post('/signUp',AuthMiddleware.validateAuthRequest,UserController.signUp);
module.exports=router;
