/* global $ */
$(function () {
	var headerForm = {
		layout: {
			"name": "form",
			"$type": "block",
			"$items": [
				{
					"$type": "block",
					"$items": [
						{
							"$bind": "themes",
							"$widget": 'objectjson'
						}
					]
				}

			]
		},
		schema: {
			"type": "object",
			"properties": {
				"themes": {
					"type": "array",
					"items": {
						"type": "object",
						"properties": {}
					}
				}
			}
		},
		data: {
			themes: [
				{
					"title": "Axes Analytiques",
					"modules": [
						{
							"title": "Entité",
							"acquis": false
						},
						{
							"title": "Unité de gestion",
							"acquis": false
						},
						{
							"title": "Opération",
							"acquis": false
						}
					]
				}
			]

		}
	};

	var menu = {
		"name": "detail-left.json",
		"$groups": [
			{
				"$title": "Menu",
				"$items": [
					{
						"$title": "Paramétrage",
						"$link": {
							"$page": "settings",
							"$module": "offres"
						}
					},
					{
						"$title": "Données de marché",
						"$link": {
							"$page": "home",
							"$module": "marche"
						}
					},
					{
						"$title": "Analyse des offres"
					},
					{
						"$title": "Liste des consultations",
						"$level": 1,
						"$link": {
							"$page": "home",
							"$module": "offres"
						}
					},
					{
						"$title": "Synthèse des offres",
						"$level": 1,
						"$link": {
							"$page": "summary",
							"$module": "offres"
						}
					},
					{
						"$title": "Cotations",
						"$link": {
							"$page": "cotation",
							"$module": "offres"
						}
					},
					{
						"$title": "Benchmark",
						"$link": {
							"$page": "home",
							"$module": "benchmark"
						}
					}

				]
			}
		]
	};
	var menu2 = {
	"name": "menu-fi-left.json",
	"$moduleTitle": "Dette",
	"$groups": [
		{
			"$title": "Menu",
			"$items": [
				{
					"$title": "Emprunts",
					"$items": [
						{
							"$title": "Liste",
							"$link": {
								"$page": "fi-emp-list"
							}
						},
						{
							"$title": "Séléction",
							"$link": {
								"$page": "fi-emp-selections"
							}
						},
						{
							"$title": "Modules associés",
							"$items": [
								{
									"$title": "Imports",
									"$link": {
										"$page": "fi-emp-modules-imports"
									}
								}
							]
						}
					]
				},
				{
					"$title": "Revolving",
					"$items": [
						{
							"$title": "Liste",
							"$link": {
								"$page": "fi-rev-list"
							}
						},
						{
							"$title": "Séléction",
							"$link": {
								"$page": "fi-rev-sel"
							}
						},
						{
							"$title": "Modules associés",
							"$link": {
								"$page": "fi-rev-mod"
							}
						}
					]
				},
				{
					"$title": "Couvertures",
					"$items": [
						{
							"$title": "Liste",
							"$link": {
								"$page": "fi-couv-list"
							}
						},
						{
							"$title": "Séléction",
							"$link": {
								"$page": "fi-couv-sel"
							}
						},
						{
							"$title": "Modules associés",
							"$link": {
								"$page": "fi-couv-mod"
							}
						}
					]
				},
				{
					"$title": "Courts-terme",
					"$items": [
						{
							"$title": "Liste",
							"$link": {
								"$page": "fi-ct-list"
							}
						},
						{
							"$title": "Séléction",
							"$link": {
								"$page": "fi-ct-sel"
							}
						},
						{
							"$title": "Modules associés",
							"$link": {
								"$page": "fi-ct-mod"
							}
						}
					]
				},
				{
					"$title": "Données de marché",
					"$items": [
						{
							"$title": "Liste",
							"$link": {
								"$page": "fi-dm-list"
							}
						},
						{
							"$title": "Séléction",
							"$link": {
								"$page": "fi-dm-sel"
							}
						},
						{
							"$title": "Modules associés",
							"$link": {
								"$page": "fi-dm-mod"
							}
						}
					]
				},
				{
					"$title": "Obs long terme",
					"$items": [
						{
							"$title": "Liste",
							"$link": {
								"$page": "fi-olt-list"
							}
						},
						{
							"$title": "Séléction",
							"$link": {
								"$page": "fi-olt-sel"
							}
						},
						{
							"$title": "Modules associés",
							"$link": {
								"$page": "fi-olt-mod"
							}
						}
					]
				},
				{
					"$title": "Obs court terme",
					"$items": [
						{
							"$title": "Liste",
							"$link": {
								"$page": "fi-oct-list"
							}
						},
						{
							"$title": "Séléction",
							"$link": {
								"$page": "fi-oct-sel"
							}
						},
						{
							"$title": "Modules associés",
							"$link": {
								"$page": "fi-oct-mod"
							}
						}
					]
				}
			]
		}
	]
};

	var layout = {
		"name": "form",
		"$type": "block",
		"$items": [
			{
				"$type": "block",
				"$title": {
					value: "Description"
				},
				"$items": [
					{
						"$bind": "firstName"
					},
					{
						"$bind": "lastName"
					},
					{
						"$bind": "photo",
						"$widget": "imageurl"
					}
				]
			},
			{
				"$type": "block",
				"$sticky": "top",
				"$items": [
					{
						"$bind": "$links.link3"
					}
				]

			},
			{
				"$type": "block",
				"$title": {
					"value": "Inline"
				},
				"$inline": true,
				"$items": [
					{
						"$bind": "firstName"
					},
					{
						"$bind": "lastName"
					},
					{
						"$bind": "photo",
						"$widget": "imageurl"
					}
				]
			},

			{
				"$type": "block",
				"$title": {
					value: "Column"
				},
				"$items": [
					{
						"$bind": "firstName",
						"options": { "columns": true }

					},
					{
						"$bind": "lastName",
						"options": { "columns": true }

					},
					{
						"$bind": "photo",
						"$widget": "imageurl",
						"options": { "columns": true }
					}
				]
			},
			{
				"$type": "block",
				"$inline": true,
				"$title": {
					value: "Actions"
				},
				"$items": [
					{
						"$bind": "$links.link1"
					},
					{
						"$bind": "$links.link2"
					},
					{
						"$bind": "$links.link3"
					}
				]
			}
		]
	};
	var schema = {
		"type": "object",
		"properties": {
			"firstName": { "title": "First Name", "type": "string" },
			"lastName": { "title": "Last Name", "type": "string" },
			"photo": { "title": "Photo", "type": "string" }
		},
		"states": {
			"firstName": { "isMandatory": true }
		},
		"links": {
			"link1": { "title": "Toggle disabled" },
			"link2": { "title": "Toggle hidden" },
			"link3": { "title": "Toggle photo" }
		}


	};
	var data = { firstName: "John", lastName: "Doe", photo: "./camus.jpg" };

	(function om() {
		Phoenix.application.configuration = {};
		Phoenix.application.configuration.header = {
			"alwaysShow": true,
			"userMenu": {
				"expression": "{{prenom}} {{nom | uppercase}}",
				"items": [
					{
						"$pattern": "logout"
					},
					{
						"title": {
							"fr": "Mon compte",
							"en": "My profile"
						},
						"link": {
							"$page": "profile",
							"$module": "operations"
						},
						"icon": "cog"
					}
				]
			},
			"logo": "bs-salvia-header"
		};
		var h = new Phoenix.ui.Header(null, {
			topMenuPlace: 'menu_top',
			leftMenuPlace: 'menu_left',
			bodyPlace: 'bs-page-content',
			showLocation: true,
			menuModules: {
				form: {
					name: headerForm.layout,
					meta: headerForm.schema
				}
			},
			leftMenuButtonInLocation: true,
			replaceParent: true,
			_alwaysShowBack: true,
			showOnDisconnected: true
		});
		h.page.props.$user = { connected: true, login: "joe", credentials: { nom: 'Joe', prenom: 'Doe' } };
		h.title = 'Hello world!';
		h.render($('#header_top'));

		let menuOptions = {
			auth: false,
			autoClose: true,
			canStayInPage: true,
			type: 'left'
		};

		let menuData = menu;
		menuOptions.bodyId = h.options.bodyId;
		menuOptions.parentId = h.options.leftMenuPlace;
		menu = new Phoenix.menu.Menuleft(menuData, menuOptions);

		Phoenix.ui.OpenForm(
			$('#bs-page-content'), layout, schema, data, {},
			function (action, data) {
				switch (action.property) {
					case "$links.link1":
						data.$states.photo.isDisabled = !data.$states.photo.isDisabled;
						break;
					case "$links.link2":
						data.$states.photo.isHidden = !data.$states.photo.isHidden;
						break;
					case "$links.link3":
						if (!data.photo)
							data.photo = './camus.jpg';
						else
							data.photo = '';
						break;
				}
			});
	})();

});

