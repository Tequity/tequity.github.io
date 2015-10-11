//Toggle active class on focus
var $emailInput = $('.email .text-input input, .email .text-input textarea');
$emailInput.on('focusin focusout', function()  {
  $(this).parent().toggleClass('email--active');
});
