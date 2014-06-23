$(function () {

	var backgroundWidth = 20 - 0.1;

	$('.Rates').click(function () {
		if (!$(this).hasClass('Selected')) {
			$(this).addClass('Selected');
			$('.Calculator').removeClass('Selected');

			$('.ForexTable-Controls-Selected').css('-webkit-transform', 'translate3d(0,0,0');
			rotate(0);
		} else {
			return;
		}
		
	});

	$('.Calculator').click(function () {
		if (!$(this).hasClass('Selected')) {
			$('.Rates').removeClass('Selected');
			$(this).addClass('Selected');
			$('.ForexTable-Controls-Selected').css('-webkit-transform', 'translate3d(' + backgroundWidth + 'em,0,0');
			rotate(360);
		} else {
			return;
		}

	});

	function rotate (deg) {
		$('.ForexTable-Item-Animate').css('-webkit-transform', 'rotateX(' + deg + 'deg)');
	}
});

