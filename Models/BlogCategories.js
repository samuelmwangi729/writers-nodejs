const mongoose = require('mongoose')
const blogCategorySchema =  mongoose.Schema({
    categoryName:{
        type:String,
        required:true
    },
    status:{
        type:Number,
        default:0
    }
},{
    timestamps:true
})

const BlogCategory = mongoose.model('BlogCategory',blogCategorySchema)

module.exports = BlogCategory