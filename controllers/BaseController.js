const BlogCategory = require('../Models/BlogCategories')
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
    res.render('pages/Register.ejs',{title:'Register Your Account'})
}
module.exports = {Index,About,Pricing,Portfolio,FAQ,Blog,Contact,Reset,Login,Register}