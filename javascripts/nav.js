$(function() {
  var $navbar = $('.navbar');
  var $bars = $('.bars, .navbar-overlay');
  var navToggle = function()  {
    //Inactive class is required for CSS animations
    if (!($navbar.hasClass('navbar--active')) && !($navbar.hasClass('navbar--inactive'))) {
      $navbar.toggleClass('navbar--active');
    }
    else  {
      $navbar.toggleClass('navbar--active').toggleClass('navbar--inactive');
    }
  };
  $bars.click(function(e) {
    //e.preventDefault;
    navToggle();
  });
});
