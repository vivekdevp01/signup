const {StatusCodes}=require('http-status-codes');
const AppError=require('../utils/errors/app-error');
const {SuccessResponse,ErrorResponse}=require('../utils/common')
const {UserService}=require('../services');

async function signUp(req,res){
    try{
        const user=await UserService.create({
            email:req.body.email,
            password:req.body.password,
            username:req.body.username
        });
        SuccessResponse.data=user;
        return res
        .status(StatusCodes.CREATED)
        .json(SuccessResponse);


    }
    catch(error){
        console.log(error);
        ErrorResponse.error=error;
        return res
        .status(StatusCodes.BAD_GATEWAY)
        .json(ErrorResponse)

    }
}
module.exports={
    signUp
}