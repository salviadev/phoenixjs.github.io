/* global $ */
$(function () {
	(function om() {
		var mi = new Phoenix.ui.ImageMenuItem(null, {
			imageSrc: './images/crocodile-color-256x256.png',
			link: 'home',
			title: 'Crocodile'
		});
		mi.render($('#parentMi'));

	})();

});
