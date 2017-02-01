
$(document)
.ready(function () {
    var $window = $(window);
   


    // *** Elements with different scrolling speed (parallax effect) ***
    
    // What I can do section
    var $scroll_bulb = $("#myskills_overlay_bulb");
    var $scroll_einstein = $("#myskills_overlay_einstein");
    var $scroll_html5 = $("#myskills_overlay_html5");
    var $scroll_algo = $("#myskills_overlay_algo");
    var $scroll_smphone = $("#myskills_overlay_smphone");
    var $scroll_htmlcode = $("#myskills_overlay_htmlcode");
    var $scroll_code = $("#myskills_overlay_code");

    // Contact section
    var $scroll_contact = $("#contact");

   


    // Change several elements appearance when scrolling

    $(window).scroll(function() {
        
        // Change navbar    
        if ($(".navbar").offset().top > 50) {
            $(".navbar-fixed-top").addClass("top-nav-collapse")
        } else {
            $(".navbar-fixed-top").removeClass("top-nav-collapse");
        }
        
        // Change the hat's plume in I am section
        if ($window.scrollTop() >= 420) {
            $(".plume").addClass("plume-show");
            $(".iamp").addClass("iamp-anim").removeClass("iamp-hidden");
        }
        else { 
            $(".plume").removeClass("plume-show");
        }



        
        //***** Effects scroll over elements (parallax effect) *****
        var yPos;
        var coords;

        yPos = ($window.scrollTop()/ $scroll_bulb.data('speed'));
        coords = '25% ' + yPos + 'px';
        $scroll_bulb.css({ backgroundPosition: coords });
        
        yPos = ($window.scrollTop()/ $scroll_html5.data('speed'));
        coords = '60% ' + yPos + 'px';
        $scroll_html5.css({ backgroundPosition: coords });
        
        yPos = ($window.scrollTop()/ $scroll_smphone.data('speed'));
        coords = '80% ' + yPos + 'px';
        $scroll_smphone.css({ backgroundPosition: coords });
       
        yPos = ($window.scrollTop()/ $scroll_code.data('speed'));
        coords = '15% ' + yPos + 'px';
        $scroll_code.css({ backgroundPosition: coords });
        

 
        yPos = ($window.scrollTop()/ $scroll_contact.data('speed')) - 1850;
        coords = '50% ' + yPos + 'px';
        $scroll_contact.css({ backgroundPosition: coords });
    });
});

// jQuery for page scrolling feature - requires jQuery Easing plugin
$(function() {
    $('a.page-scroll').bind('click', function(event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top
        }, 1000, 'easeInOutExpo');
        event.preventDefault();
    });
});

// Closes the Responsive Menu on Menu Item Click
$('.navbar-collapse ul li a').click(function() {
    $('.navbar-toggle:visible').click();
});













/***** Check if window.requestAnimationFrame *****/


/**
 * Cache
 */
var $content = $('#content') //$('header .content')
  , $blur    = $('#intro_overlay')
  , wHeight  = $(window).height();

$(window).on('resize', function(){
  wHeight = $(window).height();
});

/**
 * requestAnimationFrame Shim 
 */
window.requestAnimFrame = (function()
{
  return  window.requestAnimationFrame       ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame    ||
          function( callback ){
            window.setTimeout(callback, 1000 / 60);
          };
})();

/**
 * Scroller
 */
function Scroller()
{
  this.latestKnownScrollY = 0;
  this.ticking            = false;
}

Scroller.prototype = {
  /**
   * Initialize
   */
    init: function() {
        window.addEventListener('scroll', this.onScroll.bind(this), false);
    },

  /**
   * Capture Scroll
   */
    onScroll: function() {
        //console.log("A");
        this.latestKnownScrollY = window.scrollY;
        this.requestTick();
    },

  /**
   * Request a Tick
   */
    requestTick: function() {
        if( !this.ticking ) {
            window.requestAnimFrame(this.update.bind(this));
        }
        this.ticking = true;
    },

  /**
   * Update.
   */
    update: function() {
        var currentScrollY = this.latestKnownScrollY;
        this.ticking       = false;
    
    /**
     * Do The Dirty Work Here
     */
    var slowScroll = currentScrollY / 10
        , blurScroll = currentScrollY * 8;
    
    $content.css({
        'transform'         : 'translateY(-' + slowScroll + 'px)',
        '-moz-transform'    : 'translateY(-' + slowScroll + 'px)',
        '-webkit-transform' : 'translateY(-' + slowScroll + 'px)'
    });
    
    $blur.css({
      'opacity' : blurScroll / wHeight
    });
  }
};

/**
 * Attach!
 */
var scroller = new Scroller();  
scroller.init();

