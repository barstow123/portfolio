function setDefaultFormView() {
	$('.name-input').hide();
	$('.message-input').hide();
	function updateText(event){
		console.log('updating text!');
		var input=$(this);
	    setTimeout(function(){
	    	var val=input.val();
	    	if(val!=""){
	    		$('.email-catcher').html('');
	    		$('.name-catcher').html('');
	    	}
	    },1)
	}

    $(".name-input").keydown(updateText);
 	$(".name-input").change(updateText);

 	$(".email-input").keydown(updateText);
 	$(".email-input").change(updateText);

 	$(".email-catcher").click(function() {
	  $(".email-input").focus();
	});

	$(".name-catcher").click(function() {
	  $(".name-input").focus();
	});
}

function animateForm(version='desktop') {
	console.log('animating form');

	if ($('.name').hasClass('unfilled')) {

		//animates into the name field of the form
		//this field of the form is animated if the name div element has class "unfilled" on the animateForm() call

		emailOut();
		nameIn();

	} else if ($('.message').hasClass('unfilled')){

		//animates the name out and message in
		
		if ($('.show').hasClass('name')) {
			nameOut();
		} else if ($('.show').hasClass('return-email')) {
			emailOut();
		}
		messageIn(version);
	}
}

function setFormHandlers() {

	console.log('setting form handlers');

	$('.mobile-next-btn').click(function() {

		if(!$('interactive-words').hasClass('visible')) {
			displayInteractiveText('mobile');
			$('.interactive-words').addClass('visible');
		}

		if($('.show').hasClass('return-email')) {
			$('.return-email').removeClass('unfilled').addClass('filled');
			animateEmailIcon('mobile');
		} else if ($('.show').hasClass('name')) {
			$('.name').removeClass('unfilled').addClass('filled');
			animateUserIcon('mobile');
		}
		if (!$('.message').hasClass('show')) {
			animateForm('mobile');
		}
		setTimeout(() => {
			setFormHandlers();
		}, 800);
		$('.next-btn').unbind('click');
		$('.mobile-next-btn').unbind('click');
	});


	$('.next-btn').click(function() {

		console.log('clicking-buttons');

		if(!$('interactive-words').hasClass('visible')) {
			displayInteractiveText('desktop');
			$('.interactive-words').addClass('visible');
		}

		if($('.show').hasClass('return-email')) {
			$('.return-email').removeClass('unfilled').addClass('filled');
			animateEmailIcon();
		} else if ($('.show').hasClass('name')) {
			$('.name').removeClass('unfilled').addClass('filled');
			animateUserIcon();
		}
		if (!$('.message').hasClass('show')) {
			animateForm('desktop');
		}
		setTimeout(() => {
			setFormHandlers();
		}, 800);
		$('.next-btn').unbind('click');
		$('.mobile-next-btn').unbind('click');	
	})
}

const nameLabelStyler = popmotion.styler(document.querySelector('.name-label'));
const emailLabelStyler = popmotion.styler(document.querySelector('.email-label'));
const messageLabelStyler = popmotion.styler(document.querySelector('.message-label'));
const emailContainerStyler = popmotion.styler(document.querySelector('.email-container'));
const emailActiveStyler = popmotion.styler(document.querySelector('.email-active'));
const userContainerStyler = popmotion.styler(document.querySelector('.user-container'));
const userActiveStyler = popmotion.styler(document.querySelector('.user-active'));

function emailOut() {

	popmotion.tween({
		from: {
			x: 0,
			opacity: 1
		},
		to: {
			x: -300,
			opacity: 0
		},
		duration: 400,
		ease: popmotion.easing.easeOut
	}).start(emailLabelStyler.set);

	$('.email-input').hide();
	$('.email-catcher').html('');

}
function emailIn() {

	$('.return-email').addClass('show').removeClass('hide');
	$('.name').addClass('hide').removeClass('show');
	$('.message').addClass('hide').removeClass('show');

	$('.email-input').show();

	popmotion.tween({
		from: {
			opacity: 0
		},
		to: {
			opacity: 1
		},
		duration: 0
	}).start(emailLabelStyler.set);

	popmotion.tween({
		from: {
			x: 300,
			opacity: 0
		},
		to: {
			x: 0,
			opacity: 1
		},
		duration: 400,
		ease: popmotion.easing.easeOut
	}).start(emailLabelStyler.set);

	if ($('.email-input').val().length < 1) {

		setTimeout(function() {
			var formEmailScript = new Typed('.email-catcher', {
				strings: ['this@example.com'],
				typeSpeed: 10,
				onComplete: function() {
			    	document.querySelector('.typed-cursor').remove();
			    }
			});
		}, 600);
	}

}
function nameOut() {

	popmotion.tween({
		from: {
			x: 0,
			opacity: 1
		},
		to: {
			x: -300,
			opacity: 0
		},
		duration: 400,
		ease: popmotion.easing.easeOut
	}).start(nameLabelStyler.set);

	$('.name-input').hide();
	$('.name-catcher').html('');

}
function nameIn() {

	$('.return-email').addClass('hide').removeClass('show');
	$('.message').addClass('hide').removeClass('show');
	$('.name').addClass('show').removeClass('hide');

	$('.name-input').show();

	popmotion.tween({
		from: {
			opacity: 0
		},
		to: {
			opacity: 1
		},
		duration: 0
	}).start(nameLabelStyler.set);

	popmotion.tween({
		from: {
			x: 300,
			opacity: 0
		},
		to: {
			x: 0,
			opacity: 1
		},
		duration: 400,
		ease: popmotion.easing.easeOut
	}).start(nameLabelStyler.set);

	if ($('.name-input').val().length < 1) {
		setTimeout(function() {
			var formNameScript = new Typed('.name-catcher', {
				strings: ['John Doe'],
				typeSpeed: 10,
				onComplete: function() {
			    	document.querySelector('.typed-cursor').remove();
			    }
			});
		}, 600);
	}

}
function messageOut() {

	popmotion.tween({
		from: {
			x: 0,
			opacity: 1
		},
		to: {
			x: -300,
			opacity: 0
		},
		duration: 400,
		ease: popmotion.easing.easeOut
	}).start(messageLabelStyler.set);

	$('message-input').hide();

}
function messageIn(version = 'desktop') {

	$('.return-email').addClass('hide').removeClass('show');
	$('.name').addClass('hide').removeClass('show');
	$('.message').addClass('show').removeClass('hide');

	$('.message-input').hide();

	setTimeout(() => {
		$('.message-input').show();
	}, 150)
	

	popmotion.tween({
		from: {
			opacity: 0
		},
		to: {
			opacity: 1
		},
		duration: 0
	}).start(messageLabelStyler.set);

	popmotion.tween({
		from: {
			x: 300,
			opacity: 0
		},
		to: {
			x: 0,
			opacity: 1
		},
		duration: 400,
		ease: popmotion.easing.easeOut
	}).start(messageLabelStyler.set);

	const messageInputStyler = popmotion.styler(document.querySelector('.message-input'));

	if (version == 'desktop') {

		setTimeout(function() {
			popmotion.tween({
				from: {
					width: 5,
					height: 5
				},
				to: {
					width: 600,
					height: 135
				},
					duration: 600,
					ease: popmotion.easing.easeOut
			}).start(messageInputStyler.set);
		}, 100);
	} else if (version =='mobile') {

		let width = $(document).width();

		setTimeout(function() {
			popmotion.tween({
				from: {
					width: 5,
					height: 5
				},
				to: {
					width: width-54,
					height: 135
				},
					duration: 600,
					ease: popmotion.easing.easeOut
			}).start(messageInputStyler.set);
		}, 100);
	}

}

function animateEmailIcon(version = 'desktop') {

	console.log('animating email icon');

	setTimeout(function() {
		$('.email-container, .email-fat-fingers').click(() => {
			reverseAnimateEmailIcon(version);
			if ($('.show').hasClass('name')) {
				nameOut();
			}
			else if ($('.show').hasClass('message')) {
				messageOut();
			}
			$('.return-email').removeClass('filled').addClass('unfilled');
			emailIn();
		})
	}, 600);

	if (version == 'desktop') {

		popmotion.tween({
			from: {
				x: 0,
				y: 0
			},
			to: {
				x: -50,
				y: -30
			},
			duration: 600,
			ease: popmotion.easing.easeInOut
		}).start(emailContainerStyler.set);	

	} else if(version == 'mobile'){

		popmotion.tween({
			from: {
				x: 0,
				y: 0
			},
			to: {
				x: 85,
				y: 55
			},
			duration: 600,
			ease: popmotion.easing.easeInOut
		}).start(emailContainerStyler.set);
	}

	popmotion.tween({
		from: {
			opacity: 0
		},
		to: {
			opacity: 1
		},
		duration: 500,
		ease: popmotion.easing.easeOut
	}).start(emailActiveStyler.set);

	$('.email-container').animate({'border-radius': '5px'}, 150);

}

function animateUserIcon(version = 'desktop') {

	console.log('animateing User Icon');

	setTimeout(function() {

		$('.user-container, .user-fat-fingers').click(() => {
			reverseAnimateUserIcon(version)
			if (!$('.return-email').hasClass('unfilled')) {
				if ($('.show').hasClass('message')) {
					messageOut();
				}
				else if($('.show').hasClass('return-email')) {
					emailOut();
				}
				nameIn();
			}
			$('.name').removeClass('filled').addClass('unfilled');
		});
	}, 600);

	if (version == 'desktop') {

		popmotion.tween({
			from: {
				x: 0,
				y: 0
			},
			to: {
				x: -50,
				y: 20
			},
			duration: 600,
			ease: popmotion.easing.easeInOut
		}).start(userContainerStyler.set);

	} else if (version == 'mobile') {

		popmotion.tween({
			from: {
				x: 0,
				y: 0
			},
			to: {
				x: 35,
				y: 55
			},
			duration: 600,
			ease: popmotion.easing.easeInOut
		}).start(userContainerStyler.set);
	}

	$('.user-container').animate({'border-radius': '5px'}, 150);

	popmotion.tween({
		from: {
			opacity: 0
		},
		to: {
			opacity: 1
		},
		duration: 500,
		ease: popmotion.easing.easeOut
	}).start(userActiveStyler.set);

}

function reverseAnimateEmailIcon(version = 'Desktop') {

	$('.email-container, .email-fat-fingers, .user-container, .user-fat-fingers').unbind('click');
	setTimeout(function() {

		$('.user-container, .user-fat-fingers').click(() => {
			reverseAnimateUserIcon(version)
			if (!$('.return-email').hasClass('unfilled')) {
				if ($('.show').hasClass('message')) {
					messageOut();
				}
				else if($('.show').hasClass('return-email')) {
					emailOut();
				}
				nameIn();
			}
			$('.name').removeClass('filled').addClass('unfilled');
		});
	}, 950);
	setTimeout(() => {
		$('.mobile-next-btn, .next-btn').unbind('click');
		setFormHandlers();
	}, 1100);
	$('.next-btn').unbind('click');
	$('.mobile-next-btn').unbind('click');

	const emailContainerStyler = popmotion.styler(document.querySelector('.email-container'));
	const emailActiveStyler = popmotion.styler(document.querySelector('.email-active'));

	if (version == 'desktop') {

		popmotion.tween({
			from: {
				x: -50,
				y: -30
			},
			to: {
				x: 0,
				y: 0
			},
			duration: 600,
			ease: popmotion.easing.easeInOut
		}).start(emailContainerStyler.set);	
	} else if(version == 'mobile'){

		popmotion.tween({
			from: {
				x: 85,
				y: 55
			},
			to: {
				x: 0,
				y: 0
			},
			duration: 600,
			ease: popmotion.easing.easeInOut
		}).start(emailContainerStyler.set);
	}

	popmotion.tween({
		from: {
			opacity: 1
		},
		to: {
			opacity: 0
		},
		duration: 500,
		ease: popmotion.easing.easeOut
	}).start(emailActiveStyler.set);

	$('.email-container').animate({'border-radius': '15px'}, 150);

}

function reverseAnimateUserIcon(version = 'Desktop') {

	$('.email-container, .email-fat-fingers, .user-container, .user-fat-fingers').unbind('click');
	setTimeout(function() {
		$('.email-container, .email-fat-fingers').click(() => {
			reverseAnimateEmailIcon(version);
			if ($('.show').hasClass('name')) {
				nameOut();
			}
			else if ($('.show').hasClass('message')) {
				messageOut();
			}
			$('.return-email').removeClass('filled').addClass('unfilled');
			emailIn();
		})
	}, 950);
	setTimeout(() => {
		$('.mobile-next-btn, .next-btn').unbind('click');
		setFormHandlers();
	}, 800);
	$('.next-btn').unbind('click');
	$('.mobile-next-btn').unbind('click');

	const userContainerStyler = popmotion.styler(document.querySelector('.user-container'));
	const userActiveStyler = popmotion.styler(document.querySelector('.user-active'));

	if (version == 'desktop') {

		popmotion.tween({
			from: {
				x: -50,
				y: 20
			},
			to: {
				x: 0,
				y: 0
			},
			duration: 600,
			ease: popmotion.easing.easeInOut
		}).start(userContainerStyler.set);	
	} else if(version == 'mobile'){

		popmotion.tween({
			from: {
				x: 35,
				y: 55
			},
			to: {
				x: 0,
				y: 0
			},
			duration: 600,
			ease: popmotion.easing.easeInOut
		}).start(userContainerStyler.set);
	}

	popmotion.tween({
		from: {
			opacity: 1
		},
		to: {
			opacity: 0
		},
		duration: 500,
		ease: popmotion.easing.easeOut
	}).start(userActiveStyler.set);

	$('.user-container').animate({'border-radius': '15px'}, 150);

}

let showedText = false;
function displayInteractiveText(version = 'Desktop') {
	if (!showedText) {
		$('.interactive-words').animate({'opacity': '1.0'});
		setTimeout(() => {
			$('.interactive-words').animate({'opacity': '0'});
		}, 1800);
		showedText = true;
	}
}