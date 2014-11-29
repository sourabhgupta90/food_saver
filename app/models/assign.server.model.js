'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var NeedySchema = new Schema({
		needy_seq_no: {
			type: Schema.ObjectId,
			ref: 'User'
		},	
		status: {
			type: String,
			default: '',
			trim: true
		}
});

mongoose.model( 'NeedySchema', NeedySchema );

/**
 * Assign Schema
 */
var AssignSchema = new Schema({
	created: {
		type: Date,
		default: Date.now
	},
	donor_seq_no: {
		type: Schema.ObjectId,
		ref: 'Donation'
	},
	needy: [ NeedySchema ],
	food_status: {
		type: String,
		default: '',
		trim: true
	},
	acceptance_method: {
		type: String,
		default: '',
		trim: true
	},	
	food_seq_no: {
		type: Schema.ObjectId,
		ref: 'Donation'
	},
});

mongoose.model('Assign', AssignSchema);