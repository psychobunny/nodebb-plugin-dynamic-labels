"use strict";

$(document).ready(function() {
	$(window).on('action:ajaxify.end', function(ev, data) {
		if (ajaxify.data.template.category) {
			for (var i = 0, ii = ajaxify.data.topics.length; i < ii; i++) {
				var tid = ajaxify.data.topics[i].tid;
				var label = ajaxify.data.topics[i].label;

				if (label) {
					$('[component="category/topic"][data-tid="' + tid + '"] [component="topic/header"] .hidden-xs').after(label);
				}
			}
		}
	});
});