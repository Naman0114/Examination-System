const ethers=require('ethers');

async function authController(req,res,next){

    try {
        const {signature}=req.body;
        const {address}=req.query;

    if(!signature){
        throw new Error("Signature is invalid");

    }
    const recoveredAddress=ethers.utils.verifyMessage("Welcome to Authenticate Wallet",signature);
    console.log(recoveredAddress);

    if(address.toLowerCase()===recoveredAddress.toLowerCase()){
        res.status(200).json({message:"Authentication Successful"});
    }
    else{
        res.status(400).json({message:"Authentication failed"});
    }
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"});
    }
    
}

module.exports = { authController };