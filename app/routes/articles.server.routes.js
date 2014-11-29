'use strict';

/**
 * Module dependencies.
 */
// get the controllers which are required for this route
var users = require('../../app/controllers/users.server.controller'),
	articles = require('../../app/controllers/articles.server.controller');

module.exports = function(app) {
	// Article Routes
	app.route('/articles')
		.get(articles.list)
		.post(users.requiresLogin, articles.create);

	app.route('/articles/:articleId')
		.get(articles.read)
		.put(users.requiresLogin, articles.hasAuthorization, articles.update) //  articles.hasAuthorization has next()
		.delete(users.requiresLogin, articles.hasAuthorization, articles.delete);

	// Finish by binding the article middleware, pass articleId to articleByID method in controller
	//due to this middleware read, update, authorization, delete are working on requested articleId
	app.param('articleId', articles.articleByID); // articles.articleByID has next()

};