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
		if (name != 'calendar') {
			window.history.pushState({}, '', `/${name}`);
		}
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

function animateWindow(windowName, firstLoad=false) {

	function setActiveWindow() {
		$('.able').addClass('disabled').removeClass('able');
		$('#'+windowName).addClass('able').removeClass('disabled');
	}

	function prepareWindow(delay = 205) {
		if (windowName == 'home-page'){
			$('#'+windowName).css({'margin-left': '0px'});
			$('#'+windowName).fadeIn();
		}
		if($('#'+windowName).hasClass('window')) {
			setTimeout(function() {
				$('#'+windowName).show();
			}, delay);
			//$('#'+windowName).css({'height': '100%', 'width': '100%'});
		}

		if (windowName == 'projects') {
			prepareProjectsWindow();
		}
		if ($('#'+windowName).hasClass('slideable-up')) {
			$('#'+windowName).scrollTop(0);
		}
	}

	function doAnimation(delay = 200) {
		if (windowName == 'home-page') {
			//$('.home').fadeIn();
			animateMainContent();
			return;
		}
		if(windowName == 'contact') {
			setTimeout(function() {
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
			}, delay);
		}
		if (windowName == 'projects') {
			animateProjectsWindowIn();
		}
		if ($('#'+windowName).hasClass('slideable')) {

			setTimeout(function() {
				const windowStyler = popmotion.styler(document.getElementById(windowName));
				console.log('animating window: '+windowName);
				popmotion.tween({
					from: {
						x: '100%'
					},
					to: {
						x: '0%'
					},
					duration: 300,
					ease: popmotion.easing.easeOut
				}).start(windowStyler.set);
			}, delay);
	
		} else if($('#'+windowName).hasClass('slideable-up')){

			setTimeout(function() {
				const windowStyler = popmotion.styler(document.getElementById(windowName));

				console.log('animating window-up: '+window);
				popmotion.tween({
					from: {
						y: '100%'
					},
					to: {
						y: '0%'
					},
					duration: 300,
					ease: popmotion.easing.easeOut
				}).start(windowStyler.set);
			}, delay);
		}
	}

	if (windowName == 'calendar') {
		//					THIS IS THE BLOCK OF CODE WHICH PREVENTS THE CALENDAR PAGE FROM DISPLAYING
		//		
		//				to enable the calendar:
		//					* delete the following block of code
		//					* add a route for /calendar in the routes file of this project	
		//					* remove the if statement testing for the calendar window on the handlers' setHandlers() method		
		if (!$('.calendar-alert').hasClass('displaying')) {
			$('.calendar-alert').addClass('displaying');
			$('.calendar-alert').animate({'opacity': 1}, 300);
			setTimeout(function() {
				$('.calendar-alert').animate({'opacity': 0}, 300);
			}, 1200);
			setTimeout(function() {
				$('.calendar-alert').removeClass('displaying');
			}, 1500);
		}
		return;
	}
	if ($('#'+windowName).hasClass('able') && firstLoad == false) { return; }
	if (firstLoad) {
		prepareWindow(delay = 0);
		doAnimation(delay = 0);
	} else {
		prepareWindow();
		$('.able').fadeOut();
		setActiveWindow();
		doAnimation();
	}
}

function setHandlers() {

	setFormHandlers();
	setProjectsHandlers();

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
		$('#main-content').removeClass('unloaded');
	}

	prepareMainWindow();
	setTimeout(() => $('.main-header').animate({'opacity':'1'},200), 2000);
}

$(document).ready(function() {

	function fadeContentIn() {

		$('.unloaded').removeClass('unloaded');

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
		// if the page is loaded from the home page
		animateMainContent();
		setTimeout(fadeContentIn, 2000);
		setTimeout(animateMobileContentIn, 2000);
		setTimeout(setSlideHandlers, 2500);
	} else {
		// if the page is loaded from a location other than the home page
		var curPage = $('.able').attr('id');
		animateWindow(curPage, firstLoad=true);
		setTimeout( () => {
			fadeContentIn();
		}, 100);
		animateMobileContentIn();
		setTimeout(setSlideHandlers, 730);
	}
	setHandlers();
	setMobileHandlers();
	manageWindowsView();
	setDefaultFormView();
});