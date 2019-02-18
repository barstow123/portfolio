function calculateMobileCols(num) {
    return (document.body.clientWidth*.9+20)*num
}

function calculateMobileRows(num) {
    return (document.body.clientWidth*.9+11)*num
}

function prepareProjectsWindow() {
    const windowStyler = popmotion.styler(document.getElementById('projects'));
    $('#projects').show();
    windowStyler.set({opacity: 0});
    $('.projects-bar').css('opacity', '0');

    setTimeout(() => {
        $('#projects-container').css('opacity','1')	//this line needs to be fixed to hide parent content, but show projects-container
    }, 20);
    setTimeout(() => {
        $('.selected').find('.projects-bar').animate({'opacity': '1', 'height': '4px'}, 150);
    }, 800);
}

function animateProjectsWindowIn() {

    
    //animates projects into document
    const projectsContainer = document.getElementById('projects-container');
    const projectsStylers = Array
                    .from(projectsContainer.children)
                    .map(popmotion.styler);

    //calculates offsets for projects starting locations prior to animation
    let projectsStartingOffsets = Array(projectsStylers.length).fill(0);
    // if cols == 1
    if (document.body.clientWidth < 600) {
        if ($('.selected').is('.projects-nav-link-code')) {
            projectsStartingOffsets[1] = calculateMobileRows(-1);
        } else if ($('.selected').is('.projects-nav-link-not-code')) {
            projectsStartingOffsets[2] = calculateMobileRows(-1);
        }
    }
    console.log('projects starting offsets: '+projectsStartingOffsets);

    let projectsPreparations = Array(projectsStylers.length);
    for (let i=0; i<projectsPreparations.length; i++) {
        projectsPreparations[i] = popmotion.tween({from: 0, to: projectsStartingOffsets[i]+300, duration: 0});
    }

    let projectsAnimations = Array(projectsStylers.length);
        //.fill(popmotion.spring({ from: 300, to: 10, stiffness: 150, damping: 15, mass: .7}));
    for (let i=0; i<projectsPreparations.length; i++) {
        projectsAnimations[i] = popmotion.spring({
            from: projectsStartingOffsets[i]+300,
            to: projectsStartingOffsets[i]+10,
            stiffness: 150,
            damping: 15,
            mass: .7
        });
    }

    popmotion.stagger(projectsPreparations, 0)
        .start((v) => v.forEach((y, i) => projectsStylers[i].set('y', y)));

    //prevents scrolling during initial animation of projects window
    $('#projects').on('scroll touchmove mousewheel', function(e){
        e.preventDefault();
        e.stopPropagation();
        return false;
    });

    function setProjectsContainerSize() {
        if (document.body.clientWidth >= 985) {
            // if 3 collums
            $('#projects-container').css('height', '322px');
        } else if (document.body.clientWidth >= 600) {
            //if 2 collums
            $('#projects-container').css('height', '632px');
        }
    }

    window.onresize = null;
    if (document.body.clientWidth >= 985) {
        // if 3 collums
        $('#projects-container').css('height', '450px')
    }
    

    setTimeout(function() {
        $('#projects').off('scroll touchmove mousewheel');
        setProjectsContainerSize();
        window.onresize = setProjectsContainerSize;
    }, 200);
    
    
    setTimeout(() => {
        popmotion.stagger(projectsAnimations, 75)
        .start((v) => v.forEach((y, i) => projectsStylers[i].set('y', y)));
    }, 0);

    $('#projects').animate({'opacity': '1'}, 300);

    //animates navbar bars
    const projectsNavbarBars = document.getElementsByClassName('projects-bar');
    const navbarStylers = Array
                    .from(projectsNavbarBars)
                    .map(popmotion.styler);


    const navbarAnimations = Array(navbarStylers.length)
        .fill(
            popmotion.tween({ from: 50, to: 0, duration: 400, ease: popmotion.easing.easeOut})
            );

    var i = 0;
    
    setTimeout( () => {
        var navPrepare = setInterval(() => {
            $('.projects-bar').eq(i).animate({'opacity': '.5'}, 50);
            i++;
            if (!$('.projects-bar').get(i)) {
                clearInterval(navPrepare);
            }
        }, 200);
    }, 0);

    setTimeout(() => {
        popmotion.stagger(navbarAnimations, 200)
        .start((v) => v.forEach((x, i) => navbarStylers[i].set('x', x)));
    }, 0);
}

function setProjectsHandlers() {



    /*
    first, we will set the proper display properties for each clicked category
    -
    -
    -
    */

    function everythingNavLinkClickEvent() {
        $('.project').animate({'opacity': '1'}, 200);
        animateProjects('everything');
        $('.projects-bar').animate({'opacity': '.5', 'height': '2px'}, 100)
        $(this).find('.projects-bar').stop().animate({'opacity': '1', 'height': '6px'}, 100)
            .animate({'opacity': '1', 'height': '4px'}, 150);
        $('.selected').removeClass('selected');
        $(this).addClass('selected');
        $('.projects-nav-link').off('click');
        setTimeout(function() {
            setProjectsHandlers();
        }, 352);
    }

    function notCodeNavLinkClickEvent() {
        $('.not-code').css('opacity', 1);
        if (document.body.clientWidth < 600 && $('.selected').hasClass('projects-nav-link-code')) {
            //if cols == 1 && code was selected prior to click
            setTimeout(function() {
                $('.playchessgames').css('opacity', 0)
            }, 400);

        } else {
            $('.playchessgames').animate({'opacity': 0}, 200);
        }
        
        animateProjects('not-code');
        $('.projects-bar').animate({'opacity': '.5', 'height': '2px'}, 150)
        $(this).find('.projects-bar').stop().animate({'opacity': '1', 'height': '6px'}, 150)
            .animate({'opacity': '1', 'height': '4px'}, 150);
        $('.selected').removeClass('selected');
        $(this).addClass('selected');
        $('.projects-nav-link').off('click');
        setTimeout(function() {
            setProjectsHandlers();
        }, 352);
    }

    function codeNavLinkClickEvent() {
        $('.code').css('opacity', 1);
        if (document.body.clientWidth < 600) {
            //if cols == 1 
            setTimeout(function() {
                $('.dakota-jiminez').css('opacity', 0)
            }, 400);
        }
        $('.not-code').animate({'opacity': 0}, 200);
        animateProjects('code');
        $('.projects-bar').animate({'opacity': '.5', 'height': '2px'}, 150)
        $(this).find('.projects-bar').stop().animate({'opacity': '1', 'height': '6px'}, 150)
            .animate({'opacity': '1', 'height': '4px'}, 150);
        $('.selected').removeClass('selected');
        $(this).addClass('selected');
        $('.projects-nav-link').off('click');
        setTimeout(function() {
            setProjectsHandlers();
        }, 352);
    }


    $('.project').hover(function() {
        $(this).find('.project-main-image').stop().animate({'opacity': '0'}, 300);
        $(this).find('.top-box').stop().animate({'top': '50px', 'opacity': '1'}, 350);
        if (document.body.clientWidth < 600) {
            // if cols == 1
            $(this).find('.bottom-box').stop().animate({'bottom': '70px', 'opacity': '1'}, 350);
            setTimeout(function() {
                $('.project a').css('pointer-events', 'auto');
            }, 50)
        } else {
            // if cols != 1
            $(this).find('.bottom-box').stop().animate({'bottom': '30px', 'opacity': '1'}, 350);
        }
        $(this).find('.visit-site').stop().animate({'opacity': '1'}, 300);
    }, function() {
        $(this).find('.project-main-image').stop().animate({'opacity': '1'}, 200);
        $(this).find('.top-box').stop().animate({'top': '-55px', 'opacity': '0'}, 350);
        if (document.body.clientWidth < 600) {
            // if cols == 1
            setTimeout(function() {
                $('.project a').css('pointer-events', 'none');
            }, 350)
        }
        $(this).find('.bottom-box').stop().animate({'bottom': '-100px', 'opacity': '0'}, 350);
        $(this).find('.visit-site').stop().animate({'opacity': '0'}, 200);
    })

    $('.projects-nav-link').hover(function() {
        $(this).find('.projects-bar').stop().animate({'opacity': '1', 'height': '4px'}, 150);
    }, function() {
        if (!$(this).hasClass('selected')) {
            $(this).find('.projects-bar').stop().animate({'opacity': '.5', 'height': '2px'}, 150);
        }
    });

    $('.projects-nav-link-everything').click(everythingNavLinkClickEvent);
    $('.projects-nav-link-not-code').click(notCodeNavLinkClickEvent);
    $('.projects-nav-link-code').click(codeNavLinkClickEvent);
}

function animateProjects(category) {

    /*
    -
    -
    Then we will animate the content on the page with popmotion animation
    -
    -
    */

    const dakotaProjectStyler = popmotion.styler(document.querySelector('.dakota-jiminez'));
    const chessProjectStyler = popmotion.styler(document.querySelector('.playchessgames'));
    const axelProjectStyler = popmotion.styler(document.querySelector('.tames-music'));
    const projectWindowStyler = popmotion.styler(document.getElementById('projects-container'));

    function delayProjectsScrolling(delay = 300) {
        $('#projects').on('scroll touchmove mousewheel', function(e){
            e.preventDefault();
            e.stopPropagation();
            return false;
        });

        setTimeout(function() {
            $('#projects').off('scroll touchmove mousewheel');
        }, delay);
    }

    if (document.body.clientWidth >= 985) {
        var cols = 3;
    } else if (document.body.clientWidth >= 600) {
        var cols = 2;
    } else {
        var cols = 1;
    }

    if (category == 'code' && !$('.selected').hasClass('projects-nav-link-code')) {
        //if code is selected, and was not already selected prior to clicking

        if (cols == 3) {
            var chessToX = -285;
            var chessToY = 10;
        } else if (cols == 2) {
            var chessToX = -285;
            var chessToY = 10; //-206
        } else {
            var chessToX = 0;
            var chessToY = calculateMobileRows(-1);

            delayProjectsScrolling();

            if ($('.selected').hasClass('projects-nav-link-not-code')) {
                chessProjectStyler.set('x', calculateMobileCols(1));
                chessProjectStyler.set('y', calculateMobileRows(-1));
            }

            let projectsHeight = $('#projects-container').height();
            let delay = 200;
            if ($('.selected').hasClass('projects-nav-link-not-code')) {
                var numRows = -1;
            }
            if ($('.selected').hasClass('projects-nav-link-everything')) {
                var numRows = -2;
            }

            setTimeout(function() {
                popmotion.tween({
                    from: {
                        'height': projectsHeight+'px'
                    },
                    to: {
                        'height': projectsHeight + calculateMobileRows(numRows) +'px'
                    },
                    ease: popmotion.easing.easeOut,
                    duration: 200
                }).start(projectWindowStyler.set);
            }, delay);

            popmotion.tween({
                from: {
                    x: dakotaProjectStyler.get('x')
                }, to: {
                    x: calculateMobileCols(1)
                },
                ease: popmotion.easing.reversed(popmotion.easing.createBackIn(.75)),
                duration: 350
            }).start(dakotaProjectStyler.set);

        }

        if ((chessProjectStyler.get('x') == chessToX && chessProjectStyler.get('y') == chessToY)) {
            //special edge case to handle animations
            if (cols == 3 || cols == 2) {
                chessProjectStyler.set('x', 0)
            }
            if (cols == 1 && $('.selected').hasClass('projects-nav-link-not-code')) {
                chessProjectStyler.set('x', (document.body.clientWidth*.9+20)*-1);
            } else if (cols == 1) {
                chessProjectStyler.set('y', 10)
            }
        }

        popmotion.tween({
            from: {
                x: chessProjectStyler.get('x'),
                y: chessProjectStyler.get('y')
            },
            to: {
                x: chessToX,
                y: chessToY
            },
            ease: popmotion.easing.reversed(popmotion.easing.createBackIn(.75)),
            duration: 350
        }).start(chessProjectStyler.set);
    }
    if (category == 'not-code' && !$('.selected').hasClass('projects-nav-link-not-code')) {

        if (cols == 3) {
            var dakotaToX = -285;
            var dakotaToY = 10;
        } else if (cols == 2) {
            var dakotaToX = 285;
            var dakotaToY = -306;
        } else {
            var dakotaToX = 0;
            var dakotaToY = calculateMobileRows(-1);
            dakotaProjectStyler.set('x', 0)

            delayProjectsScrolling();

            let projectsHeight = $('#projects-container').height();
            let delay = 200;
            if ($('.selected').hasClass('projects-nav-link-code')) {
                var numRows = 1;
                delay = 0;
            }
            if ($('.selected').hasClass('projects-nav-link-everything')) {
                var numRows = -1;
            }

            setTimeout(function() {
                popmotion.tween({
                    from: {
                        'height': projectsHeight+'px'
                    },
                    to: {
                        'height': projectsHeight + calculateMobileRows(numRows) +'px'
                    },
                    ease: popmotion.easing.easeOut,
                    duration: 200
                }).start(projectWindowStyler.set);
            }, delay);
        }

        if ((dakotaProjectStyler.get('x') == dakotaToX && dakotaProjectStyler.get('y') == dakotaToY)) {
            //special edge case for animations
            //prepares dakota to animate
            if (cols == 3) {
                dakotaProjectStyler.set('y', 10);
                dakotaProjectStyler.set('x', -570);
            } else if (cols == 2) {
                dakotaProjectStyler.set('y', -306);
                dakotaProjectStyler.set('x', 0);
            }  else if (cols == 1) {
                dakotaProjectStyler.set('y', -306);
            }
        }
        if (cols == 1 && $('.selected').hasClass('projects-nav-link-code')) {
            //if prior window was code, and on mobile   
            var chessToX = calculateMobileCols(1);
            var chessToY = calculateMobileRows(-1);
            axelProjectStyler.set('x', calculateMobileCols(-1));
            dakotaProjectStyler.set('y', 0);

            popmotion.tween({
                from: {
                    x: chessProjectStyler.get('x'),
                    y: chessProjectStyler.get('y')
                },
                to: {
                    x: chessToX,
                    y: chessToY
                },
                ease: popmotion.easing.reversed(popmotion.easing.createBackIn(.75)),
                duration: 350,
            }).start(chessProjectStyler.set);


            popmotion.tween({
                from: {
                    x: axelProjectStyler.get('x'),
                    y: axelProjectStyler.get('y')
                },
                to: {
                    x: 0,
                    y: 10
                },
                ease: popmotion.easing.reversed(popmotion.easing.createBackIn(.75)),
                duration: 350,
            }).start(axelProjectStyler.set);
        }

        popmotion.tween({
            from: {
                x: dakotaProjectStyler.get('x'),
                y: dakotaProjectStyler.get('y')
            },
            to: {
                x: dakotaToX,
                y: dakotaToY
            },
            ease: popmotion.easing.reversed(popmotion.easing.createBackIn(.75)),
            duration: 350,
        }).start(dakotaProjectStyler.set);
    }
    if (category == 'everything' && !$('.selected').hasClass('projects-nav-link-everything')) {

        if (cols == 1) {

            if ($('.selected').hasClass('projects-nav-link-not-code')) {
                chessProjectStyler.set('y', 10);
                chessProjectStyler.set('x', 0);
            }

            delayProjectsScrolling();

            let projectsHeight = $('#projects-container').height();
            let delay = 0;
            if ($('.selected').hasClass('projects-nav-link-code')) {
                var numRows = 2;
            }
            if ($('.selected').hasClass('projects-nav-link-not-code')) {
                var numRows = 1;
            }

            setTimeout(function() {
                popmotion.tween({
                    from: {
                        'height': projectsHeight+'px'
                    },
                    to: {
                        'height': projectsHeight + calculateMobileRows(numRows) +'px'
                    },
                    ease: popmotion.easing.easeOut,
                    duration: 200
                }).start(projectWindowStyler.set);
            }, delay);
        }

        popmotion.tween({
            from: {
                x: dakotaProjectStyler.get('x'),
                y: dakotaProjectStyler.get('y')
            },
            to: {
                x: 0,
                y: 10
            },
            ease: popmotion.easing.reversed(popmotion.easing.createBackIn(.75)),
            duration: 350,
        }).start(dakotaProjectStyler.set);

        popmotion.tween({
            from: {
                x: chessProjectStyler.get('x'),
                y: chessProjectStyler.get('y')
            },
            to: {
                x: 0,
                y: 10
            },
            ease: popmotion.easing.reversed(popmotion.easing.createBackIn(.75)),
            duration: 350,
        }).start(chessProjectStyler.set);
    }
}