$(document).ready(function () {

  /*
   * Client-side JS logic goes here
   * jQuery is already loaded
   * Reminder: Use (and do all your DOM work in) jQuery's document ready function
   */

  $(".error-messages").hide();

  $(".tweet-form").on('submit', onSubmit);

  loadTweets();
});

const errorBoxOne = '<i class="fas fa-exclamation-triangle"></i> Please fill in your tweet message.';
const errorBoxTwo = '<i class="fas fa-exclamation-triangle"></i> Your message has reach the maximum characters limit (140 max)!';

function onSubmit(event) {
  // Stop the form from being submitted
  event.preventDefault();
  const $errorBox = $(".error-messages");
  const form = $(this);
  const counter = form.find(".counter");
  const text = $("#tweet-text").val();

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

  $.ajax("/tweets", { method: "POST", data: data })
    .then(() => {
      $("#tweet-text").val("");
      counter.text(140);
      // $(".counter").text(140);
      loadTweets();
    });
}

// Add tweet to the tweets container
function renderTweets(tweetsArr) {
  for (const tweet of tweetsArr) {
    // Create an HTML element out of each object
    const tweetElement = createTweetElement(tweet);
    // Attach the new elements to the DOM => prepend to an existing container on the page
    $("#tweet-container").prepend(tweetElement);
  }
}

function escape(str) {
  let div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

function createTweetElement(tweetData) {
  const tweet = `
    <article class="tweet">
        <header class="tweet-header">
          <div class="tweet-message">
            <img class="avatar" src="/images/user-astronaut-solid.svg">
            <span class="name"></span><strong>${tweetData.user.name}</strong></span>
          </div>
          <span class="alias">${tweetData.user.handle}</span>
        </header>
        <span class="content">${escape(tweetData.content.text)}</span>
        <footer class=tweet-footer>
          <h5>10 days ago</h5>
          <span>
            <i class="fas fa-flag"></i>
            <i class="fas fa-retweet"></i>
            <i class="fas fa-heart"></i>
          </span>
        </footer>
    </article>`;
  return $(tweet);
}

function loadTweets() {
  const url = `http://localhost:8080/tweets`;
  $.ajax({
    url,
    method: 'GET',
  })
    .done(function (data) {
      $("#tweet-container").empty();
      console.log("data: ", data)
      renderTweets(data);
    })
    .fail(function () {
      alert('error');
    })
    .always(function () {
      console.log('complete');
    })
}