'use strict';

var Controllers = {};

Controllers.renderAdminPage = function (req, res, next) {

	res.render('admin/plugins/dynamic-labels', {});
};

module.exports = Controllers;