var input = document.querySelector("#search-input");
var submit = document.querySelector("#submit");
var form = document.querySelector("#search-form");

form.addEventListener("submit",function(event){
    event.preventDefault();
    var userInput = input.value.trim();
    if(userInput){
        getApi(userInput);
    }else{
        alert("Please enter something");
    }
})
function getApi(userInput){
    var requestUrl = `http://www.omdbapi.com/?t='${userInput}'&type=movie&tomatoes=true&apikey=e1279f79&`;
    var posterUrl = `http://img.omdbapi.com/?t='${userInput}'&type=movie&tomatoes=true&apikey=e1279f79&`;

    fetch(requestUrl)
        .then(function(response){
            if(response.ok){
                console.log(response);
                response.json().then(function(data){{
                    console.log(data);
                    var title = document.querySelector("#title");
                    title.textContent = input.value;
                    var awards = document.querySelector("#awards");
                    awards.textContent= data.Awards;
                    var movieTitle = data.Title
                  console.log(movieTitle)
                    var plot = document.querySelector("#plot");
                    var actor = document.querySelector('#actor');
                    var rated = document.querySelector("#rated");
                    var poster = document.querySelector("#poster");
                    poster.setAttribute("src",data.Poster);
                    plot.textContent = data.Plot;
                    actor.textContent = data.Actors;
                    rated.textContent = data.Rated
                    getYoutubeVideo(movieTitle);
                    
                }})
            }
        })

    
}

//This searches for a youtube video based on the movie title given in the previous function
//added full original sountrack to search to look specifically for that movies soundtrack.
function getYoutubeVideo(movieTitle) {
    var requestUrl = "https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=20&q=" + movieTitle + "full original soundtrack&type=video&key=AIzaSyCJTHFOR8cX7fWfJ_0L1mLrsfgvneAZnsk";
    console.log(requestUrl)
    fetch(requestUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data.items[1].id.videoId)
        var videoID = data.items[1].id.videoId
        var youtubeVideo = "https://www.youtube.com/watch?v=" + videoID
        console.log(youtubeVideo)       
      })
  }