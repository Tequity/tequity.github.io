$(function() {
  var $navbar = $('.navbar');
  var $bars = $('.bars, .navbar-overlay');
  var $nestedNav = $('.navbar-navigation a:not(:last-child)');
  var toggleActive = function()  {
    //Inactive class is required for CSS animations
    if (!($navbar.hasClass('navbar--active')) && !($navbar.hasClass('navbar--inactive'))) {
      $navbar.toggleClass('navbar--active');
    }
    else  {
      $navbar.toggleClass('navbar--active').toggleClass('navbar--inactive');
    }
  };
  var toggleFixed = function()  {
    if ($(window).scrollTop() > window.innerHeight * .5)  {
      $navbar.addClass('navbar--fixed');
      $navbar.removeClass('navbar--absolute');
    }
    else  {
      $navbar.removeClass('navbar--fixed');
      $navbar.addClass('navbar--absolute');
    }
  }
  $bars.click(function(e) {
    toggleActive();
  });
  $nestedNav.click(function() {
    if (!($(this).hasClass('navigation--nested--show')))  {
      $(this).addClass('navigation--nested--show');
    }
    else  {
      $(this).removeClass('navigation--nested--show');
    }
  });
  //Because firing events every time a user scrolls is HELLA slow
  toggleFixed = _.throttle(toggleFixed, 500);
  $(window).scroll(function() {
    toggleFixed();
  });
});
