const mongoose = require('mongoose')
const userJwtSchema = mongoose.Schema({
    userId:{
        type:String,
        required:true
    },
    jwtToken:{
        type:String,
        required:true,
    },
    expiryDate:{
        type:String,
        required:true
    },
    jwtStatus:{
        type:Number,
        requruired:false,
        default:0
    }
},{timestamps:true})
//create a static method to store the details to the database
userJwtSchema.statics.StoreJwt = async (uid,token,expiry) =>{
    //use the model to store the data 
    try{
        //store the item in a user object
        const uObj = await userJwtModel.create({
            userId:uid,
            jwtToken:token,
            expiryDate:expiry
        })
        if(uObj){
            //then the token hase been saved in the database
            return true
        }
    }catch(e){
        //if in case there is an error
        return false
    }
}
//create a model for this 
const userJwtModel = mongoose.model('userJwtModel',userJwtSchema)
module.exports=userJwtModel