$(document).ready(function() {

	$('#signin-button').on('click', function() {
		$('.login-register-container').slideToggle(400);
		return false;
	});

	$('.login-register-container button, .login-register-container a').on('click', function() {
		$('.login-register-container').slideUp(400);
	});



	$('#account-name, .account-info').on('mouseover', function() {
		$('.account-info').show();
		$('#account-name').addClass('js-active');
	})

	$('#account-name, .account-info').on('mouseleave', function() {
		$('.account-info').hide();
		$('#account-name').removeClass('js-active');
	})

});