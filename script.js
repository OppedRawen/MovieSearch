var input = document.querySelector("#search-input");
var submit = document.querySelector("#submit");
var form = document.querySelector("#search-form");
var select = document.querySelector("#form-select");
var select2 = document.querySelector("#form-select2");
var cardContainer = document.querySelector("#cardContainer");

var reviewTitle = document.querySelector('#review-title')
var articleContainer = document.querySelector('#article')
var trailerContainer = document.querySelector("#trailer-container");

// var movie = localStorage.getItem("movieTitle");
// console.log(movie);
render();
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
    var requestUrl = `https://www.omdbapi.com/?t='${userInput}'&type=movie&plot=short&tomatoes=true&apikey=e1279f79&`;
    if(select.value==1){
        if(select2.value==1){
            requestUrl = `https://www.omdbapi.com/?t='${userInput}'&type=movie&plot=short&tomatoes=true&apikey=e1279f79&`;
        }else if(select2.value==2){
            requestUrl = `https://www.omdbapi.com/?t='${userInput}'&type=movie&plot=full&tomatoes=true&apikey=e1279f79&`;
        }
    }else if(select.value==2){
        if(select2.value==1){
            requestUrl = `https://www.omdbapi.com/?t='${userInput}'&type=series&plot=short&tomatoes=true&apikey=e1279f79&`;
        }else if(select2.value==2){
            requestUrl = `https://www.omdbapi.com/?t='${userInput}'&type=series&plot=full&tomatoes=true&apikey=e1279f79&`;
        }
    }else if(select.value==3){
        if(select2.value==1){
            requestUrl = `https://www.omdbapi.com/?t='${userInput}'&type=episodes&plot=short&tomatoes=true&apikey=e1279f79&`;
        }else if(select2.value==2){
            requestUrl = `https://www.omdbapi.com/?t='${userInput}'&type=episodes&plot=full&tomatoes=true&apikey=e1279f79&`;
        }
    }
    
    fetch(requestUrl)
        .then(function(response){
            if(response.ok){
                console.log(response);
                response.json().then(function(data){{
                    console.log(data);
                    var imdb = data.imdbID;
                    var movieTitle = data.Title;
                 
                    var imdbAddress = "https://www.imdb.com/title/"+imdb+"/";
                    var code = `<div class="card w-25" style="width: 25rem; background-color:rgb(138, 156, 172)">
                    
                    <img  id = "poster" src="${data.Poster}" class="card-img-top" alt="movie poster">
                    
                  </div>
                  <div class="card-body w-25">
                    <h1 class="card-title" id = "title">${data.Title}</h5>
                      <p  id = "plot" class="card-text fs-2">${data.Plot}</p>
                      <p1 id ="director">Directed by: ${data.Director}</p1>
                      <p1 id ="actor">Actors: ${data.Actors}</p1>
                      <p1 id = "rated">Rated: ${data.Rated}</p1>
                      <p1 id = "awards">Awards: ${data.Awards}</p1>
                      <a href="${imdbAddress}" class="btn btn-secondary fs-2 ">Go to imdb website</a>
                    </div>`;
                  cardContainer.innerHTML=code;
                  input.value = movieTitle;

                  getMovieReview(movieTitle);
                  getYoutubeVideo(movieTitle);
                  getNews(movieTitle);

                  localStorage.setItem("movieTitle",movieTitle);
                  localStorage.setItem("movieType",select.value);
                  console.log(select.value);
                  localStorage.setItem("plotLength",select2.value);
                    render();
                }})
            }else{
                alert("Invalid response");
            }
        })

    
}
 
 
 function render(){
    var movie = localStorage.getItem("movieTitle");
    var movieType = localStorage.getItem("movieType");
    var plotLength = localStorage.getItem("plotLength");
    if(movie=="undefined"){
        alert("This movie/series does not have the name that you input, try another one");
        return
      }
    input.value =movie;
    select.value = movieType;
    select2.value = plotLength;
    console.log(movie);

 }


//News Article fetcher
var articleDiv = document.querySelector('.news-articles');
 
function getNews(movieTitle) {
    var requestUrl = 'https://api.nytimes.com/svc/search/v2/articlesearch.json?q=' + movieTitle + ' movie&docs=8&api-key=3gONaMIA57zdh5wDKeK1Fu1MVI3RgteG';
    console.log(requestUrl)
    fetch(requestUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        var articleData = data.response.docs

        console.log(articleData)
    
        articleDiv.innerHTML = ""

        articleContainer.textContent = "Related Articles"

        for (var i = 0; i < articleData.length; i++) {

            //prevents more than 8 articles from populating. Didn't see a &count= attribute to add to the link from the api documentation.//
            if (i === 8){
                return;
            } else {

            var articleDetails = {
                article: articleData[i].abstract,
                headline: articleData[i].headline.main,
                url: articleData[i].web_url,
            }

            var divEl = document.createElement('div');
            var h2El = document.createElement('h2');
            var pEl = document.createElement('p');
            var h3El = document.createElement('h3');
            var linkEl = document.createElement('a');

            articleDiv.append(divEl);
            
            divEl.appendChild(h2El);
            divEl.appendChild(pEl);
            divEl.appendChild(h3El);

            divEl.setAttribute('article', [i]);
            pEl.setAttribute('class', 'article-desc');
            h3El.setAttribute('class', 'article-link');
            h2El.setAttribute('class', 'article-title');

            h2El.textContent = articleDetails.headline;
            pEl.textContent = articleDetails.article;
            h3El.textContent = "Read more at ";
            h3El.append(linkEl);
            linkEl.setAttribute('href', articleDetails.url);
            linkEl.textContent = "The New York Times";

            }
        }
      });
  }

//Fetchest Youtube video by using the proper name used in the OMDB api,  and added " movie trailer" to link to make sure a video of a movie trailer appears.//
function getYoutubeVideo(movieTitle) {
    var requestUrl = "https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=20&q=" + movieTitle + " movie trailer &type=video&key=AIzaSyCJTHFOR8cX7fWfJ_0L1mLrsfgvneAZnsk";
    console.log(requestUrl)
    fetch(requestUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data.items[1].id.videoId)
        var videoID = data.items[1].id.videoId
        var youtubeVideo = "https://www.youtube.com/embed/" + videoID;
        console.log(youtubeVideo)   
                
        var iframeEl = document.createElement('iframe');
        var movieTrailerEl = document.createElement('div')

        movieTrailerEl.setAttribute("class", "movie-trailer")

        //gives the iFrame element all the necessary attributes to create the youtube embedded video.//
        Object.assign(iframeEl, {
            title: "youtube video player",
            frameboder: 0,
            allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share",
            allowfullscreen: true,
            width: 1000,
            height: 600,
            src: youtubeVideo
        });

        trailerContainer.innerHTML = "";
        trailerContainer.appendChild(movieTrailerEl);
        movieTrailerEl.appendChild(iframeEl);
    })
  }
 
  var reviewsDiv = document.querySelector('.reviews');

  function getMovieReview(movieTitle) {
    var requestUrl = "https://api.nytimes.com/svc/movies/v2/reviews/search.json?query=" + movieTitle + "&api-key=3gONaMIA57zdh5wDKeK1Fu1MVI3RgteG";
    console.log(requestUrl)
    fetch(requestUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {

        console.log(data);

        var movieReviewArray = data.results

        reviewsDiv.innerHTML = ""

        reviewTitle.textContent = "Movie Review(s)"

        for (var i = 0; i < movieReviewArray.length; i++) {

            var movieReviews = data.results[i].display_title

            if (movieReviews === movieTitle) {

                var reviewDetails = {
                    title: movieReviewArray[i].headline,
                    link: movieReviewArray[i].link.url,
                    published: movieReviewArray[i].publication_date,
                    summary: movieReviewArray[i].summary_short,
                    by: movieReviewArray[i].byline
                }

                var divEl = document.createElement('div');
                var h2El = document.createElement('h2');
                var pEl = document.createElement('p');
                var h3El = document.createElement('h3');
    
                reviewsDiv.append(divEl);
                
                divEl.appendChild(h2El);
                divEl.appendChild(pEl);
                divEl.appendChild(h3El);
    
                divEl.setAttribute('review', [i]);
                pEl.setAttribute('class', 'article-desc');
                h3El.setAttribute('class', 'article-link');
                h2El.setAttribute('class', 'article-title');
    
                h2El.textContent = reviewDetails.title;
                pEl.textContent = reviewDetails.summary;
                h3El.textContent = reviewDetails.published;
    
                console.log(reviewDetails.summary)
            }
        }
    })
}