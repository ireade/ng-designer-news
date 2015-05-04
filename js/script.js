$(document).ready(function() {

	$('#signin-button').on('click', function() {

		$('.login-register-container').slideToggle(400);

		return false;
	})

	$('#account-name, .account-info').on('mouseover', function() {

		$('.account-info').show();
		// $('.account-info').addClass('open');
	})

	$('#account-name, .account-info').on('mouseleave', function() {

		$('.account-info').hide();
		// $('.account-info').addClass('open');
	})

});