/* global $ */
$(function () {
	var layout1 = {
		"name": "form1",
		"$type": "block",
		"$items": [

			{
				"$type": "block",
				"$title": {
					"value": "Master Form"
				},
				"$inline": true,
				"$items": [
					{
						"$bind": "$links.eventSTART"
					},
					{
						"$bind": "$links.eventSTOP"
					}
				]
			}
		]
	};
	
	var schema1 = {
		"type": "object",
		"properties": {
		},
		"links": {
			"eventSTART": {
				"title": "Send START"
			},
			"eventSTOP": {
				"title": "Send STOP"
			}
		}
	};
	
	
	var layout2 = {
		"name": "form2",
		"$type": "block",
		"$items": [

			{
				"$type": "block",
				"$title": {
					"value": "Slave Form"
				},
				"$inline": true,
				"$items": [
					{
						"$bind": "eventName"
					
					}
				]
			}
		]
	};

	
	var schema2 = {
		"type": "object",
		"properties": {
			"eventName": {
				"title": "Event Name",
				"type": "string"
				
			}
		}
	};




	(function om() {
		Phoenix.ui.OpenForm(
			$('#form1'), layout1, schema1, {}, {},
			function (action, data, formControl) {
				switch (action.property) {
					case "$links.eventSTART":
						formControl.broadcast("event-operation", { op: "start" });
						break;
					case "$links.eventSTOP":
						formControl.broadcast("event-operation", { op: "stop" });
						break;

				}
			});
		Phoenix.ui.OpenForm(
			$('#form2'), layout2, schema2, {}, {},
			function (action, data, formControl) {
				switch (action.property) {
					case "event-operation":
					    data.eventName = action.actionParams.op;
						break;

				}
			});
	})();



});

