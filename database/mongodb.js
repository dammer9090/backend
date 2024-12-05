const mongoose = require('mongoose');


const DBconnect = async ()=>{
    try{
        await mongoose.connect('mongodb://127.0.0.1:27017/clubDatabaseCSE6')
        console.log('connected to database successfully')
    }catch(err){
        console.log('failed to connect Database')
        process.exit(1);
    }
}


module.exports = DBconnect;