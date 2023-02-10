var input = document.querySelector("#search-input");
var submit = document.querySelector("#submit");
var form = document.querySelector("#search-form");
var select = document.querySelector("#form-select");
var select2 = document.querySelector("#form-select2");
var cardContainer = document.querySelector("#cardContainer");

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
    var requestUrl = `http://www.omdbapi.com/?t='${userInput}'&type=movie&plot=short&tomatoes=true&apikey=e1279f79&`;
    if(select.value==1){
        if(select2.value==1){
            requestUrl = `http://www.omdbapi.com/?t='${userInput}'&type=movie&plot=short&tomatoes=true&apikey=e1279f79&`;
        }else if(select2.value==2){
            requestUrl = `http://www.omdbapi.com/?t='${userInput}'&type=movie&plot=full&tomatoes=true&apikey=e1279f79&`;
        }
    }else if(select.value==2){
        if(select2.value==1){
            requestUrl = `http://www.omdbapi.com/?t='${userInput}'&type=series&plot=short&tomatoes=true&apikey=e1279f79&`;
        }else if(select2.value==2){
            requestUrl = `http://www.omdbapi.com/?t='${userInput}'&type=series&plot=full&tomatoes=true&apikey=e1279f79&`;
        }
    }else if(select.value==3){
        if(select2.value==1){
            requestUrl = `http://www.omdbapi.com/?t='${userInput}'&type=episodes&plot=short&tomatoes=true&apikey=e1279f79&`;
        }else if(select2.value==2){
            requestUrl = `http://www.omdbapi.com/?t='${userInput}'&type=episodes&plot=full&tomatoes=true&apikey=e1279f79&`;
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
      }
    input.value =movie;
    select.value = movieType;
    select2.value = plotLength;
    console.log(movie);

 }
var articleDiv = document.querySelector('.news-articles');
 
function getNews(movieTitle) {
    var requestUrl = 'https://api.nytimes.com/svc/search/v2/articlesearch.json?q=' + movieTitle + ' movie&docs=8&api-key=3gONaMIA57zdh5wDKeK1Fu1MVI3RgteG';
    console.log(requestUrl)
    fetch(requestUrl)
      .then(function (response) {
        console.log(response)
        return response.json();
      })
      .then(function (data) {
        console.log(data)
        var articleData = data.response.docs
        console.log(articleData[0])

        articleDiv.innerHTML = ""

        for (var i = 0; i < articleData.length; i++) {

            if (i === 8){
                return;
            } else {

            var divEl = document.createElement('div');
            var h2El = document.createElement('h2');
            var pEl = document.createElement('p');
            var h3El = document.createElement('h3')
            var linkEl = document.createElement('a')

            articleDiv.append(divEl);
            divEl.append(h2El);
            divEl.append(pEl);
            divEl.append(h3El);


            divEl.setAttribute('article', [i])
            pEl.setAttribute('class', 'article-desc')
            h3El.setAttribute('class', 'article-link')
            h2El.setAttribute('class', 'article-title')


            h2El.textContent = articleData[i].headline.main
            pEl.textContent = articleData[i].abstract
            h3El.textContent = "Read more at "
            h3El.append(linkEl);
            linkEl.setAttribute('href', articleData[i].web_url);
            linkEl.textContent = "The New York Times";

            }
        }
      })
  }
