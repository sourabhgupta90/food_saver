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

	var validate_avail_from_date = function( avail_from_date ) {
		if( this.avail_from_date < Date.now ) return false;
	        else return true;
	};

	var validate_avail_to_date = function( avail_to_date ) {
		if( this.avail_to_date < Date.now ) return false;
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
		created: {
			type: Date,
			default: Date.now
		},   
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
        food_amount: {
			type: String,
			default: '10',
        },
        avail_from_date: {
			type: Date,
			default: Date.now, // different from Date.now()
            required: 'Please specify date for availability of food',   
            validate: [validate_avail_from_date, 'Please, availability date should be greater than current time']        	
        },
        avail_to_date: {
			type: Date,
			default: Date.now, // different from Date.now()
            required: 'Please specify date for availability of food',   
            validate: [ validate_avail_to_date , 'Please, availability date should be greater than current time']        	        	
        },
        show_contact_num: {
			type: String,
			default: 'N',
			//trim: true,
			//required: 'Do you want to show your contact number to needy'
        },
        allow_chat: {
			type: String,
			default: 'V',
			//trim: true,
			//required: 'Do you want to allow chat with needy'
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
			trim: true
	        //validate: [validateDurationAA, 'Please, your duration is more than expiry time']
	    },        
	    timeStamp: {
			type: Date,
			default: Date.now
		}
	});

	mongoose.model('Donation', DonationSchema);