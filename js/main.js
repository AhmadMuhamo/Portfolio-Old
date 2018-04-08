/** HamyS */
(function ($) {
  "use strict"; // Start of use strict

  // Smooth scrolling using jQuery easing
  $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function () {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ?
        target :
        $('[name=' + this.hash.slice(1) + ']');
      if (target.length) {
        $('html, body').animate({
          scrollTop: (target.offset().top - 54)
        }, 1000, "easeInOutExpo");
        return false;
      }
    }
  });

  // Closes responsive menu when a scroll trigger link is clicked
  $('.js-scroll-trigger').click(function () {
    $('.navbar-collapse').collapse('hide');
  });

  // Activate scrollspy to add active class to navbar items on scroll
  $('body').scrollspy({
    target: '#navbar',
    offset: 54
  });

})(jQuery); // End of use strict
/** HamyS */

/** Random Quote Machine */
function quote() {
  $.ajax({
    url: 'https://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_p' +
      'age]=1',
    success: function (data) {
      var post = data.shift(); // The data is an array of posts. Grab the first one.
      $('#quote-author').text(post.title);
      $('#quote-text').html(post.content);
      $('#twt-btn').attr("href", 'https://twitter.com/intent/tweet?hashtags=quotes&related=ahmadibrahim&text=' + post.content);
    },
    cache: false
  });
};
$(window).on("load", quote());

jQuery(function ($) {
  $('#new-quote')
    .on('click', function (e) {
      e.preventDefault();
      quote();
    });
});
/** Random Quote Machine */