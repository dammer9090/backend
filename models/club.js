const mongoose = require('mongoose');
 
 


const clubSchema =  new mongoose.Schema({
    title:{
        type:String,
    },
    description:{
        type:String,
    },
    venue:{
        type:String,
    },
    image:{
        type:String
    }
})

module.exports = mongoose.model('Club', clubSchema)
