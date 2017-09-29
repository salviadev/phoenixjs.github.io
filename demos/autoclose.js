/* global $ */
function formData() {
	return {
		schema: {
			"type": "object",
			"properties": {
				"lastName": {
					"type": "string",
					"title": "Last Name"
				},
				"firstName": {
					"type": "string",
					"title": "First Name"
				}
			}
		},
		data: {
			"firstName": "John",
			"lastName": "Doe"
		},
		layout: {
			"name": "customer",
			"$type": "block",
			"$items": [
				{ "$bind": "firstName" },
				{ "$bind": "lastName" }
			]
		}
	};
}

function _openLeft() {
	var p = Phoenix;
	var fd = formData();
	var autoClose = { align: p.autoclose.BOTTOM_LEFT, width: "400px", height: "180px", alignElementId: 'left', showCloseButton: true };
	var opts = {
		autoClose: autoClose,
		name: fd.layout,
		meta: fd.schema,
		controller: 'phoenix.empty.controller',
		options: {}
	};
	p.ui.showAutoCloseForm(opts, fd.data);

}

function _openRight() {
	var p = Phoenix;
	//
	let page = p.pagecontrol.Page();
	if (page && page.popup && page.popup.opener === 'right') {
		page.setPopup(null);
		return;
	}
	
	var fd = formData();
	var autoClose = { opener: 'right',  stayOnTop: true, align: p.autoclose.BOTTOM_RIGHT, width: "400px", height: "180px", alignElementId: 'right', showCloseButton: true };
	var opts = {
		autoClose: autoClose,
		name: fd.layout,
		meta: fd.schema,
		controller: 'phoenix.empty.controller',
		options: {}
	};
	p.ui.showAutoCloseForm(opts, fd.data);

}

function _openCenter() {
	var p = Phoenix;
	var cr = function ($element, autoclose, cb) {
		cb();
	}
	p.autoclose.open(p.autoclose.SCREEN_CENTER, { width: "80%", height: "400px", style: "$bg-gray-light", contentRender: cr });

}




