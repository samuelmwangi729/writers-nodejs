const BlogCategory = require('../Models/BlogCategories')
const userModel = require('../Models/User')
const bcrypt = require('bcrypt')
const token = require('jsonwebtoken')
const userJwt = require('../Models/usersjwt')
const handleError = e=>{
    let error = {email:'',password:''}

    //check if the email is a duplicate with a specific error code
    if(e.code===11000){
        error.email = 'Kindly use a different email address'
    }
    //check if a phrase is included in the error message 
    if(e.message.includes('user validation failed')){
        Object.values(e.errors).forEach(({properties})=>{
            //updating the error object with the relevant message
           error[properties.path] = properties.message;
        })
    }
    return error
}
let title = ''
const Index = (req,res)=>{
    title = 'HomePage'
    res.render('../views/index',{title:title})
}

const About = (req,res)=>{
    res.render('pages/about.ejs',{title:'About Uss'})
}
const Pricing = (req,res)=>{
    res.render('pages/Pricing.ejs',{title:'Our Pricing Model'})
}
const Portfolio = (req,res)=>{
    res.render('pages/Portfolio.ejs',{title:'Portfolio'})
}
const FAQ = (req,res)=>{
    res.render('pages/Faq.ejs',{title:'Frequently Asked Questions'})
}
const Blog  = (req,res)=>{
    res.render('pages/Blog.ejs',{title:'Our Blog'})
}
const Contact = (req,res)=>{
    res.render('pages/Contact.ejs',{title:'Our Contacts'})
}
const Reset =(req,res)=>{
    res.render('pages/Reset.ejs',{title:'Reset Your Password'})
}
const Login = (req,res)=>{
    res.render('pages/Login.ejs',{title:'Login Your Account'})
}
const Register = (req,res)=>{
    // console.log(req.body)
    res.render('pages/Register.ejs',{title:'Register Your Account'})
}
const tExpiry = 3*24*60*60
const generateJwt = (uniqueKey)=>{
    const jwtoken = token.sign({uniqueKey},'P!@#four5sam',{expiresIn:tExpiry})
    return jwtoken
}

const LoginUser = async (req,res)=>{
    const {email,password} = req.body
    //get the user from the database 
    //create a static method to log the user in 
    const login = await userModel.Login(email,password)
    if(login){
        const splittedString = (login._id).toString().split("\"")
        let userId=splittedString[0]
        const userToken = generateJwt(userId)
        //set a cookie with the token in it 
        res.cookie('jwt',userToken,{
            maxAge:tExpiry*1000,
            httpOnly:true
        })
        res.cookie('userId',`Pro-${userId}-05`,{
            maxAge:tExpiry*1000,
            httpOnly:true
        })
        //save the jwt to the database together with its expiry date 
        const expiryDate = getExpiryDate(3)
        // console.log(expiryDate)
        const dbStat = await userJwt.StoreJwt(userId,userToken,expiryDate)
        if(dbStat){
            // console.log('the jwt token saved to the database')
        }else{
            // console.log('there was an error saving to the database')
        }
        //send the user back as json 
        res.status(201).json({user:login})
    }else{
        res.status(404).json({error:'Invalid Credentials Submitted!!'})
    }
}
const getExpiryDate = d =>{
    let expDate = new Date(new Date().setDate(new Date().getDate()+d))
    return expDate
}
const RegisterData = async (req,res)=>{
    // res.send(req.body)
    const firstName = req.body.firstName
    const lastName = req.body.lastName
    const username = req.body.username
    const email = req.body.email
    const reason = req.body.reason
    const ppassword = req.body.password
    const confirmPassword = req.body.confirmPassword
    // if(!reason.includes('work') || !reason.includes('assignment')){
    //     res.json({
    //         message:'invalid data submitted'
    //     })
    // }
    if(ppassword === confirmPassword){
        try{
            const user = await userModel.create({
                firstName:firstName,
                lastName:lastName,
                username:username,
                email:email,
                regReason:reason,
                password:ppassword
            })
            res.status(201).redirect('/Login')
        }catch(e){
            res.json(handleError(e))
        }
    }else{
        res.json({
            message:'The password do not match'
        })
    }
}
module.exports = {Index,About,Pricing,Portfolio,FAQ,Blog,Contact,Reset,Login,Register,RegisterData,LoginUser}