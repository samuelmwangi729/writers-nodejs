const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const {isEmail} = require('validator')
const userSchema = mongoose.Schema({
    firstName:{
        type:String,
        required:true,
    },
    lastName:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:[true,'Please enter a username'],
        unique:true,
        
    },
    email:{
        type:String,
        required:[true,'Please enter an email'],
        unque:true,
        lowercase:true,
        validate:[(val)=>{
            isEmail
        },'Please enter a valid email']
    },
    regReason:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true,
        minlength:[8,'The minimum length is 8 characters']
    }
})
userSchema.pre('save',async function(next){
    const salt = await bcrypt.genSalt()
    this.password = await bcrypt.hash(this.password,salt)
    next()
})
//create a model for the schema 
const userModel = mongoose.model('user',userSchema)
module.exports = userModel