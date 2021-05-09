const mongoose = require('mongoose'); 
const connexionString = require('./conf/app-config'); 


const initDB = () => { 
  mongoose.connect(connexionString,  { useNewUrlParser: true,  useUnifiedTopology: true  });
  mongoose.connection.once('open', () => { 
    console.log('connected to database'); 
  }); 
  
  mongoose.connection.on('error', console.error); 
} 
module.exports = initDB;