'use strict';

/**
 * Module dependencies.
 */
var _ = require('lodash');

/**
 * Extend user's controller
 * load all of the user authentication, authorization, password, profile controllers
 */
module.exports = _.extend(
        // return back the array of functions from users/ dir
	require('./users/users.authentication.server.controller'),
	require('./users/users.authorization.server.controller'),
	require('./users/users.password.server.controller'),
	require('./users/users.profile.server.controller')
);