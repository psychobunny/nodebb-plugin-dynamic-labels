'use strict';
/* globals $, app, socket */

define('admin/plugins/dynamic-labels', ['settings', 'admin/modules/colorpicker'], function(settings, colorpicker) {

	var admin = {};

	admin.init = function () {
		settings.load('dynamic-labels', $('.dynamic-labels-settings'), renderStatusList);

		$('#save').on('click', saveSettings);

		$('#newStatus').on('click', createNewStatus);
	};

	function saveSettings() {
		settings.save('dynamic-labels', $('.dynamic-labels-settings'), function () {
			app.alertSuccess('Successfully saved settings');
		});
	}

	function createNewStatus(ev) {
		var modal = $('#newStatus-modal').modal('show');
		var preview = modal.find('#preview');
		var id = modal.find('[name="id"]');
		var bgColor = modal.find('[name="bgColor"]');
		var borderColor = modal.find('[name="borderColor"]');
		var color = modal.find('[name="color"]');
		var status = modal.find('[name="status"]');
		var days = modal.find('[name="days"]');
		var type = modal.find('[name="type"]');

		colorpicker.enable(modal.find('.colorinput'), function () {
			preview.css('color', color.val());
			preview.css('background-color', bgColor.val());
			preview.css('border-color', borderColor.val());
		});

		status.on('keyup change', function () {
			preview.html(status.val());
		});

		modal.find('#saveStatus').on('click', function () {
			if (!id.val() || !status.val() || !days.val()) {
				return app.alertError('Please fill in id, status, and days.');
			}

			if (!id.val().match(/^[a-z0-9]+$/i)) {
				return app.alertError('Invalid unique identifier. Please use alphanumeric characters only.');
			}

			var data = $('#standaloneStatuses');
			var statuses = JSON.parse(data.val() || '{}');

			statuses[id.val()] = {
				status: status.val(),
				color: color.val(),
				bgColor: bgColor.val(),
				borderColor: borderColor.val(),
				days: days.val(),
				type: type.val(),
			};

			data.val(JSON.stringify(statuses));
			renderStatusList();

			modal.modal('hide');
			saveSettings();
		});
		ev.preventDefault();
		return false;
	}

	function renderStatusList() {
		var data = $('#standaloneStatuses');
		var list = $('#standaloneStatusesList');

		list.html('');
		var statuses = JSON.parse(data.val() || '{}');
		for (var status in statuses) {
			if (statuses.hasOwnProperty(status)) {
				list.append('<span class="label" data-status="' + status + '" style="background-color:' + statuses[status].bgColor + '; color: ' + statuses[status].color + '; border: 1px solid ' + statuses[status].color + ';">' + statuses[status].status + ' <a><i class="fa fa-times"></i></a></span> <small>' + statuses[status].type + ' at most ' + statuses[status].days + ' days ago.</small><br /><br />');
			}
		}

		list.find('[data-status] a').on('click', function (ev) {
			var status = $(this).parents('[data-status]').attr('data-status');
			var data = $('#standaloneStatuses');
			var statuses = JSON.parse(data.val() || '{}');
			delete statuses[status];
			data.val(JSON.stringify(statuses));

			renderStatusList();
			ev.preventDefault();
			return false;
		});
	}

	return admin;
});