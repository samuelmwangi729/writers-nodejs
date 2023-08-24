const mongoose = require('mongoose')
var connStatus = false 
const connectDB = async ()=>{
    try{
       await mongoose.connect('mongodb+srv://bh4534927:iaFkXLJxfhgzdEze@writers-project-cluster.7z8twgs.mongodb.net/writers-project-cluster?retryWrites=true&w=majority')
       .then(response=>{
           console.log('db successfully connected')
            connStatus = true
       })
       .catch(e=>{
        console.log('could not connect to the database')
       })
    }catch(e){
        console.log(`Could not connect to the database connection ${e.message}`)
    }
}
module.exports ={connectDB,connStatus}
// iaFkXLJxfhgzdEze