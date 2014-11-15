	'use strict';
	/*
	 * Schemas define the structure of documents within a collection and 
	 * models are used to create instances of data that will be stored in documents.
	 * flexibility doesn't mean : forgo some safety checks like type and range checking.
	 * Numbers have min and max validators. Strings have enum and match validators.
	 * 
	 */

	/**
	 * Module dependencies.
	 */
	var mongoose = require('mongoose'),
		moment = require('moment'), // good lib we will use it later
		Schema = mongoose.Schema;


	/**
	 * A Validation function for local strategy properties
	 */
	var validateBestBefore = function( bestBeforeDate ) {
		if( this.bestBefore < Date.now ) return false;
	        else return true;
	};


	var validateDurationAA = function( duration ) {
		if( this.bestBefore - Date.now > duration ) return true;
	        else return false;
	};

	/**
	 * Donation Schema
	 */

	var DonationSchema = new Schema({
	    
		user: {
			type: Schema.ObjectId,
			ref: 'User'
		},
	    type: {  // veg: V or non-veg: N
			type: String,
			default: 'V',
			//trim: true,
			required: 'Please choose Veg/Non-Veg donation'
		},
        refrigeration: { // needs refrigeration Y/N
			type: String,
			default: 'N',
			//trim: true            
        },
        bestBefore: { // create check to be > current date
			type: Date,
			default: Date.now, // different from Date.now()
            required: 'Please choose expected expiry date for donation',   
            validate: [validateBestBefore, 'Please, best before date should be greater than current time']
        },
	    desc: {
			type: String,
			default: '',
			trim: true
		},
	    state: { // raw/cooked
			type: String,
			default: 'C',
			trim: true            
	    },
	    durationAA: { 
            // interval before expire-date when auto assignment can start            
			type: Number,		
			trim: true,
	        validate: [validateDurationAA, 'Please, your duration is more than expiry time']
	    },        
	    timeStamp: {
			type: Date,
			default: Date.now
		}
	});

	mongoose.model('Donation', DonationSchema);