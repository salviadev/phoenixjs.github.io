/* global $ */
$(function () {
	var layout = {
		"name": "form",
		"$type": "block",
		"$items": [
			{
				"$type": "block",
				"$items": [
					{
						"$type": "block",
						"$inline": true,
						"$items": [
							{
								"$bind": "hidden",
								"options":
								{
									"placeHolder": true,
									"titleIsHidden": true
								}
							},
							{
								"$bind": "$links.hidden"
							}
						]
					},
					{
						"$type": "block",
						"$items": [
							{
								"$bind": "readOnly"
							}
						]
					},
					{
						"$type": "block",
						"$inline": true,
						"$items": [
							{
								"$bind": "disabled",
								"options":
								{
									"titleIsHidden": true
								}
							},
							{
								"$bind": "$links.disabled"
							},
							{
								"$bind": "$links.e"
							}
						]
					}
				]
			},
			{
				"$type": "block",
				"$inline": true,
				"$items": [
					{
						"$type": "block",
						"$inline": true,
						"$items": [
							{
								"$bind": "hidden",
								"options":
								{
									"placeHolder": "Custom place holder",
									"titleIsHidden": true
								}
							},
							{
								"$bind": "$links.hidden"
							}
						]
					},
					{
						"$type": "block",
						"$items": [
							{
								"$bind": "readOnly"
							}
						]
					},
					{
						"$type": "block",
						"$inline": true,
						"$items": [
							{
								"$bind": "disabled",
								"options":
								{
									"titleIsHidden": true
								}
							},
							{
								"$bind": "$links.disabled"
							}
						]
					}
				]
			},
			{
				"$type": "block",
				"$items": [
					{
						"$type": "block",
						"$items": [
							{
								"$bind": "edit"
							}
						]
					},
					{
						"$type": "block",
						"$inline": true,
						"$items": [
							{
								"$bind": "grp",
								"$widget": "grpbtn",
								"options":
								{
									"titleIsHidden": true
								}
							}
						]
					},
					{
						"$type": "block",
						"$title": {
							"value": "N° {{hidden}}"
						},
						"$items": [
							{
								"$bind": "Capital"
							},
							{
								"$bind": "Email"
							}
							,
							{
								"$bind": "$$meta-label",
								"options": {
									"$bind": "Email",
									"columns": true
								}
							}

						]
					},
					{
						"$type": "block",
						"$inline": true,
						"$items": [
							{
								"$bind": "$links.addFormErrors"
							},
							{
								"$bind": "$links.validate"
							}
						]
					}
				]
			}
		]
	};
	var schema = {
		"type": "object",
		"properties": {
			"hidden": { "title": "Hidden + Mandatory", "type": "string", "description": "Mandatory field : <br /> <span>- can be hidden</span><br /> <span>- can be hidden</span>" },
			"readOnly": { "title": "Read Only", "type": "string", "description": "Read only field" },
			"disabled": { "title": "Disabled", "type": "string", "description": "<div class='tooltip-cotation' style='text-align:left;'><h6>Cotation</h6>xx</div>" },
			"edit": { "title": "My Edit", "type": "string" },
			"grp": {
				"title": "My Group", "type": "string", "enum": [
					"Hidden",
					"Disabled",
					"ReadOnly",
					"Mandatory"
				]
			},
			"Capital": {
				"title": "Capital",
				"type": "number",
				"format": "money",
				"minimum": 10
			},
			"Email": {
				"title": "Email",
				"type": "string",
				"format": "email"
			}

		},
		"states": {
			"hidden": { "isMandatory": true },
			"readOnly": { "isReadOnly": true }
		},
		"links": {
			"hidden": { "title": "Toggle Hidden" },
			"disabled": { "title": "Toggle Disabled" },
			"h": { "title": "Hidden" },
			"d": { "title": "Disabled" },
			"r": { "title": "ReadOnly" },
			"m": { "title": "Mandatory" },
			"e": { "title": "Toggle Error" },
			"addFormErrors": { "title": "Add form error" },
			"validate": { "title": "Validate" }
		}


	};
	var data = { hidden: "", readOnly: "ReadOnly", disabled: "Disabled", edit: "My Edit" };

	(function om() {
		Phoenix.ui.OpenForm(
			$('#form'), layout, schema, data, {},
			function (action, data) {
				switch (action.property) {
					case "grp":
						data.$states.edit.isHidden = (data.grp === "Hidden");
						data.$states.edit.isDisabled = (data.grp === "Disabled");
						data.$states.edit.isReadOnly = (data.grp === "ReadOnly");
						data.$states.edit.isMandatory = (data.grp === "Mandatory");
						break;
					case "$links.hidden":
						data.$states.hidden.isHidden = !data.$states.hidden.isHidden;
						break;
					case "$links.disabled":
						data.$states.disabled.isDisabled = !data.$states.disabled.isDisabled;
						break;
					case "$links.h":
						data.$states.edit.isHidden = !data.$states.edit.isHidden;
						break;
					case "$links.d":
						data.$states.edit.isDisabled = !data.$states.edit.isDisabled;
						break;
					case "$links.r":
						data.$states.edit.isReadOnly = !data.$states.edit.isReadOnly;
						break;
					case "$links.m":
						data.$states.edit.isMandatory = !data.$states.edit.isMandatory;
						break;
					case "$links.e":
						if (data.$errors.disabled.hasErrors())
							data.$errors.disabled.addErrors(null);
						else
							data.$errors.disabled.addErrors([{ message: "Hi hi hi." }, { message: "This is an error" }]);
						break;
					case "$links.addFormErrors":
						data.$errors.$.addErrors([{ message: "Data saved!.", severity: "success" }, { message: "This is an error" }]);
						break;
					case "$links.validate":
						data.validate();
						break;

				}
			});
	})();
});

