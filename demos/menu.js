/* global $ */
$(function () {

	var menuData = {
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
									"spoform": true,
									"name": "fi-emp-list"
								}
							},
							{
								"$title": "Séléction",
								"$link": {
									"spoform": true,
									"name": "fi-emp-selections"
								}
							},
							{
								"$title": "Modules associés",
								"$items": [
									{
										"$title": "Imports",
										"$link": {
											"spoform": true,
											"name": "fi-emp-modules-imports"
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
									"spoform": true,
									"name": "fi-rev-list"
								}
							},
							{
								"$title": "Séléction",
								"$link": {
									"spoform": true,
									"name": "fi-rev-sel"
								}
							},
							{
								"$title": "Modules associés",
								"$link": {
									"spoform": true,
									"name": "fi-rev-mod"
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
									"spoform": true,
									"name": "fi-couv-list"
								}
							},
							{
								"$title": "Séléction",
								"$link": {
									"spoform": true,
									"name": "fi-couv-sel"
								}
							},
							{
								"$title": "Modules associés",
								"$link": {
									"spoform": true,
									"name": "fi-couv-mod"
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
									"spoform": true,
									"name": "fi-ct-list"
								}
							},
							{
								"$title": "Séléction",
								"$link": {
									"spoform": true,
									"name": "fi-ct-sel"
								}
							},
							{
								"$title": "Modules associés",
								"$link": {
									"spoform": true,
									"name": "fi-ct-mod"
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
									"spoform": true,
									"name": "fi-dm-list"
								}
							},
							{
								"$title": "Séléction",
								"$link": {
									"spoform": true,
									"name": "fi-dm-sel"
								}
							},
							{
								"$title": "Modules associés",
								"$link": {
									"spoform": true,
									"name": "fi-dm-mod"
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
									"spoform": true,
									"name": "fi-olt-list"
								}
							},
							{
								"$title": "Séléction",
								"$link": {
									"spoform": true,
									"name": "fi-olt-sel"
								}
							},
							{
								"$title": "Modules associés",
								"$link": {
									"spoform": true,
									"name": "fi-olt-mod"
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
									"spoform": true,
									"name": "fi-oct-list"
								}
							},
							{
								"$title": "Séléction",
								"$link": {
									"spoform": true,
									"name": "fi-oct-sel"
								}
							},
							{
								"$title": "Modules associés",
								"$link": {
									"spoform": true,
									"name": "fi-oct-mod"
								}
							}
						]
					}
				]
			}
		]
	};


	(function om() {
		var _p = Phoenix, _menu = _p.menu, _link = _p.link;

		let menuOptions = {
			auth: false,
			inline: true,
			type: 'left',
			parentId: 'menu_left'

		};
		let mi = new Phoenix.menu.Menuleft(menuData, menuOptions);


		_link.registerLinkExecutor({
			test: function (link) {
				return link.spoform;
			},
			hnd: function (link) {
				mi.selectItem(link.name);
			},
			equal: function (value, link) {
				return value === link.name;
			}
		});


		mi.show();
		mi.selectItem("fi-oct-list");
	})();

});

