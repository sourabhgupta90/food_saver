/*
 * theory:
 * database -> collections -> documents -> fields
 * Mongoose translates data in the database to JavaScript objects for use in your application. 
 * 
 */
// models/nerd.js
// grab the mongoose module
var mongoose = require('mongoose');

// create nerd schema
    var nerdSchema = new mongoose.Schema({ 
        name : {type : String, default: ''}
    }) ;                        
            
// define our nerd model
    var nerdModel = mongoose.model('Nerds', nerdSchema );
// 
// 
// module.exports allows us to pass this to other files when it is called
// uncomment below to send data from db
module.exports = nerdModel;

// as of now try sending data directly from here
//module.exports = [ "deepak", "sourabh", "sumit" ];
    
