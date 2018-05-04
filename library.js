"use strict";

var controllers = require('./lib/controllers');
var plugin = {};
var db = require.main.require('./src/database');
var posts = require.main.require('./src/posts');
var async = require.main.require('async');

plugin.init = function(params, callback) {
	var router = params.router,
		hostMiddleware = params.middleware,
		hostControllers = params.controllers;

	router.get('/admin/plugins/dynamic-labels', hostMiddleware.admin.buildHeader, controllers.renderAdminPage);
	router.get('/api/admin/plugins/dynamic-labels', controllers.renderAdminPage);

	callback();
};

plugin.addAdminNavigation = function(header, callback) {
	header.plugins.push({
		route: '/plugins/dynamic-labels',
		icon: 'fa-tint',
		name: 'Dynamic Labels'
	});

	callback(null, header);
};

plugin.getTopics = async (data, callback) => {
	db.getObjectField('settings:dynamic-labels', 'labels', function(err, labels) {
		if (err || !labels) {
			return callback(err, data);
		}

		labels = JSON.parse(labels);

		var mainPids = data.topics.map(function(topic) {
			return topic.mainPid;
		});

		var updatedLabels = [];
		var createdLabels = [];

		Object.values(labels).forEach(function(label) {
			if (label.type === 'updated') {
				updatedLabels.push(label);
			} else if (label.type === 'created') {
				createdLabels.push(label);
			}
		});

		updatedLabels = updatedLabels.sort(function(a, b){
			return parseInt(a.days, 10) < parseInt(b.days, 10) ? 1 : -1
		});

		createdLabels = createdLabels.sort(function(a, b){
			return parseInt(a.days, 10) < parseInt(b.days, 10) ? 1 : -1
		});

		
		if (!updatedLabels.length && !createdLabels.length) {
			return callback(false, data);
		}

		posts.getPostsByPids(mainPids, data.uid, function(err, posts) {
			posts.forEach(function(post, index) {
				var postLabel;
				var today = new Date();
				var createtime = new Date(post.timestamp);
				var edittime = new Date(post.edited);

				if (err) {
					return callback(err);
				}

				if (post.edited) {
					updatedLabels.forEach(function(label) {
						var days = parseInt(label.days, 10);
						if (days >= ((today - edittime) / 3600 / 24 / 1000)) {
							postLabel = label;
						}
					});
				}

				if (!postLabel) {
					createdLabels.forEach(function(label) {
						var days = parseInt(label.days, 10);
						if (days >= ((today - createtime) / 3600 / 24 / 1000)) {
							postLabel = label;
						}
					});
				}

				if (postLabel) {
					data.topics[index].label = '<span class="dynamic-label label" data-status="' + postLabel.status + '" style="background-color:' + postLabel.bgColor + '; color: ' + postLabel.color + '; border: 1px solid ' + postLabel.color + ';">' + postLabel.status + '</span>';
				}
			});
		
			callback(false, data);
		});
	});
};

module.exports = plugin;