// Test / driver code (temporary). Eventually will get this from the server.
// const data = [
//   {
//     "user": {
//       "name": "Newton",
//       "avatars": "https://i.imgur.com/73hZDYK.png"
//       ,
//       "handle": "@SirIsaac"
//     },
//     "content": {
//       "text": "If I have seen further it is by standing on the shoulders of giants"
//     },
//     "created_at": 1461116232227
//   },
//   {
//     "user": {
//       "name": "Descartes",
//       "avatars": "https://i.imgur.com/nlhLi3I.png",
//       "handle": "@rd"
//     },
//     "content": {
//       "text": "Je pense , donc je suis"
//     },
//     "created_at": 1461113959088
//   }
// ];

$(document).ready(function () {

  /*
   * Client-side JS logic goes here
   * jQuery is already loaded
   * Reminder: Use (and do all your DOM work in) jQuery's document ready function
   */
  

  // $(".tweet-form").on('submit', onSubmit(event));
  $(".tweet-form").on('submit', onSubmit);

  // renderTweets(data);

  loadTweets();

});

function onSubmit(event) {
  // stop the form from being submitted
  event.preventDefault();
  const form = $(this);
  // Encode a set of form elements as a string for submission.
  const data = form.serialize();
  $.ajax("/tweets", { method: "POST", data: data})
  .then (console.log("DONE!"));

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
        <span class="content">${tweetData.content.text}</span>
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
  .done(function(data) {
    console.log('fetched data: ', data);
    renderTweets(data);    
  })
}