var searchMovie = document.querySelector('#search-form');

searchMovie.addEventListener('submit', function(event){
    event.preventDefault();
    var movieTitle = document.querySelector('#search-input').value;
    console.log(movieTitle)

    getApi(movieTitle);

})

function getApi(movieTitle) {
    var requestUrl = "https://www.omdbapi.com/?t=" + movieTitle + "&apikey=fde21b99";
    console.log(requestUrl)
    fetch(requestUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data)       
      });
  }

