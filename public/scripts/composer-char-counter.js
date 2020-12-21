$(document).ready(function () {
  console.log('Ready!');

  // Hide error box
  const $errorBox = $('.error-messages');
  $errorBox.html('').slideUp();

  // Check the character counter
  $('#tweet-text').on('input', function () {
    const count = $(this).val().length;
    const counter = 140 - count;

    if (counter < 0) {
      $(this).siblings().children('.counter').text(counter).css('color', 'red');
    } else {
      $(this).siblings().children('.counter').text(counter).css('color', '#2f2f2f');
      $errorBox.html('').slideUp();
    }
  });
});

