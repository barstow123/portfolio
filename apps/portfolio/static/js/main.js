function toggleImage(image) {
	var source = $(image).attr('src');
	var altSource = $(image).attr('data-alt-src');
	$(image).attr('src', altSource);
	$(image).attr('data-alt-src', source);
	// console.log(`source: ${source}\n altSource: ${altSource}`);
}

function setSlideHandlers() {

	$('.sidebar-btn').click(function() {
		let name = $(this).attr('data-window-id');
		animateWindow(name)
		window.history.pushState({}, '', `/${name}`);
	})

	$('.home-note').click(function() {
		let name = $(this).attr('data-window-id');
		animateWindow(name);
		window.history.pushState({}, '', '/');
	})

	$('.unslid').hover(function() {}, function() {});

	$('.active').hover(function() {
		$(this).stop().animate({
			backgroundColor: '#777'
		}, 300);
	}, function() {
		$(this).stop().animate({backgroundColor: '#222'}, 300);
	});

	$('.awake').hover(function() {
		toggleImage(this);
	}, function() {
		toggleImage(this);
	});
};

function manageWindowsView() {
	$('.disabled').hide();
	if (!$('.able').hasClass('home')) {
		$('.able').css({'margin-left': '0%', 'margin-top': '0%'});
	}
}

function animateWindow(window) {

	if ($('#'+window).hasClass('able')){ return; }

	function setActiveWindow() {
		console.log('setting active window');
		$('.able').addClass('disabled').removeClass('able');
		$('#'+window).addClass('able').removeClass('disabled');
		$('.disabled.slideable').css('margin-left', '100%');
		$('.disabled.slideable-up').css('margin-top', '100%');
	}

	function prepareWindow() {
		if (window == 'home-page'){
			$('#'+window).css({'margin-left': '0px'});
			$('#'+window).fadeIn();
		} else if($('#'+window).hasClass('window')) {
			$('#'+window).show();
			//$('#'+window).css({'height': '100%', 'width': '100%'});
		} 

		if ($('#'+window).hasClass('slideable-up')) {
			$('#'+window).scrollTop(0);
		}
	}

	function doAnimation() {
		if (window == 'home-page') {
			//$('.home').fadeIn();
			animateMainContent();
			return;
		}
		if(window == 'contact') {
			$('.show input').val('');
			$('.email-catcher').html('');
			$('.name-catcher').html('');
			if ($('.show').hasClass('return-email')) {
				setTimeout(function() {
					formScript = new Typed('.email-catcher', {
						strings: ['this@example.com'],
						typeSpeed: 10,
						onComplete: function() {
					    	document.querySelector('.typed-cursor').remove();
					    }
					});
				}, 600);
				$('.email-catcher').click(() => {$('.show input').focus()});
			}
			if ($('.show').hasClass('name')) {
				setTimeout(function() {
					formScript = new Typed('.email-catcher', {
						strings: ['John Doe'],
						typeSpeed: 10,
						onComplete: function() {
					    	document.querySelector('.typed-cursor').remove();
					    }
					});
				}, 600);
				$('.name-catcher').click(() => {$('.show input').focus()});
			}
		}
		if ($('#'+window).hasClass('slideable')) {
			console.log('animating window: '+window);
			$('#'+window).animate({'margin-left': '0px'}, 300);
		} else if($('#'+window).hasClass('slideable-up')){
			console.log('animating window-up: '+window);
			$('#'+window).animate({'margin-top': '0px'}, 300);
		}
	}

	prepareWindow();
	$('.able').fadeOut();
	setTimeout(setActiveWindow, 300);
	doAnimation();
}

function setHandlers() {

	setFormHandlers();

}

function animateMainContent() {

	setTimeout(function() {
		openScript = new Typed('.open-script', {
			strings: ['<strong><span style="color: #F10404; font-family: &quot;Inconsolata&quot;, monospace;">&#60;script&#62;</span></strong>'],
			typeSpeed: 10,
			onComplete: function() {
		    	document.querySelector('.typed-cursor').remove();
		    }
		});
		}, 200); 

	setTimeout(function() {
		closeScript = new Typed('.close-script', {
		    strings: ['<strong><span style="color: #F10404; font-family: &quot;Inconsolata&quot;, monospace;">&#60;/script&#62;</span></strong>'],
		    typeSpeed: 10,
		    onComplete: function () {
		    	document.querySelector('.typed-cursor').remove();
		    }
		});
	}, 600); 

	const artworkStyler = popmotion.styler(document.querySelector('.artwork'));

	setTimeout(() => {popmotion.tween({
		from: {
			opacity: 0
		},
		to: {
			opacity: 1
		},
		easing: popmotion.easing.easeInOut,
		duration: 500
	}).start(artworkStyler.set)}, 1200);
	
	function prepareMainWindow() {
		$('.artwork').css('opacity', '0');
		$('.main-header').css('opacity', '0');
		$('.open-script').html('');
		$('.close-script').html('');
	}

	prepareMainWindow();
	setTimeout(() => $('.main-header').animate({'opacity':'1'},200), 2000);
}

$(document).ready(function() {

	function fadeContentIn() {
		let delay = 400;
		$('.home-note').delay(100).animate({'opacity':'1'},600);
		
		$('.sidebar-btn').map(function() {
			$(this).delay(delay).animate({'opacity':'1'},400);
			$(this).addClass('active');
			delay += 50;
		});

		$('.icon').addClass('awake');

		const iconContainer = document.querySelector('.icon-container')

		const iconStylers = Array
			.from(iconContainer.children)
			.map(popmotion.styler)

		const iconAnimations = Array(iconStylers.length)
			.fill(popmotion.spring({ from: 0, to: 40}))

		popmotion.stagger(iconAnimations, 200)
			.start((v) => v.forEach((x, i) => iconStylers[i].set('x', x)));

	}
		
	
	if ($('.able').hasClass('home')) {
		animateMainContent();
		setTimeout(fadeContentIn, 2000);
		setTimeout(animateMobileContentIn, 2000);
	} else {
		fadeContentIn();
		animateMobileContentIn();
	}
	setHandlers();
	manageWindowsView();
	setDefaultFormView();
	setMobileHandlers();
	setTimeout(setSlideHandlers, 2500);
});