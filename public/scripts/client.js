$(document).ready(function () {

  $('.error-messages').hide();

  $('.tweet-form').on('submit', onSubmit);

  loadTweets();
});

const errorBoxOne = '<i class="fas fa-exclamation-triangle"></i> Please fill in your tweet message.';
const errorBoxTwo = '<i class="fas fa-exclamation-triangle"></i> Your message has reach the maximum characters limit (140 max)!';

// Post new tweet
function onSubmit(event) {
  // Stop the form from being submitted
  event.preventDefault();
  const $errorBox = $('.error-messages');
  const form = $(this);
  const counter = form.find('.counter');
  const text = $('#tweet-text').val();

  if (!text) {
    $errorBox.html(errorBoxOne).slideDown();
    return;
  }

  if (text.length > 140) {
    $errorBox.html(errorBoxTwo).slideDown();
    return;
  }

  // Encode a set of form elements as a string for submission.
  const data = form.serialize();
  // Create POST Ajax request
  $.ajax('/tweets', {
    method: 'POST',
    data: data
  })
    .then(() => {
      $('#tweet-text').val('');
      counter.text(140);
      loadTweets();
    })
    .catch((err) => console.log(err));
}


// Add tweet to the tweets container
function renderTweets(tweetsArr) {
  for (const tweet of tweetsArr) {
    // Create an HTML elements out of each object
    const tweetElement = createTweetElement(tweet);
    // Attach the new elements to the DOM => prepend to an existing container on the page
    $('#tweet-container').prepend(tweetElement);
  }
}

// Prevent Cross-Site Scripting (XSS)
function escape(str) {
  let div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

// Change date to display in number of days, hours, minutes or seconds accordingly
function fixDate(tweetDate) {
  let currentDate = new Date();
  let timeDiff = currentDate - tweetDate;
  let timeSec = timeDiff / 1000;
  let timeDays = timeSec / 86400;
  let timeHours = timeSec / 3600;
  let timeMinutes = timeSec / 60;

  if (timeDays > 1) {
    return Math.floor(timeDays) + ' days ago';
  }

  if (timeHours > 1) {
    return Math.floor(timeHours) + ' hours ago';
  }

  if (timeMinutes > 1) {
    return Math.floor(timeMinutes) + ' minutes ago';
  }

  return Math.floor(timeSec) + ' seconds ago';
}


function createTweetElement(tweetData) {
  const tweet = `
    <article class='tweet'>
        <header class='tweet-header'>
          <div class='tweet-message'>
            <img class='avatar' src=${tweetData.user.avatars}>
            <span class='name'></span><strong>${tweetData.user.name}</strong></span>
          </div>
          <span class='alias'>${tweetData.user.handle}</span>
        </header>
        <span class='content'>${escape(tweetData.content.text)}</span>
        <footer class=tweet-footer>
          <h5>${fixDate(tweetData.created_at)}</h5>
          <span>
            <i class='fas fa-flag'></i>
            <i class='fas fa-retweet'></i>
            <i class='fas fa-heart'></i>
          </span>
        </footer>
    </article>`;
  return $(tweet);
}

// Retrieve tweets from server
function loadTweets() {
  const url = `http://localhost:8080/tweets`;

  $.ajax({
    url,
    method: 'GET',
  })
    .then((data) => {
      $('#tweet-container').empty();
      renderTweets(data);
    })
    .catch((err) => console.log(err));
}