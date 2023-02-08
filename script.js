var input = document.querySelector("#search-input");
var submit = document.querySelector("#submit");
var form = document.querySelector("#search-form");
var select = document.querySelector("#form-select");
var select2 = document.querySelector("#form-select2");
var cardContainer = document.querySelector("#cardContainer");
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
                    var imdbAddress = "https://www.imdb.com/title/"+imdb+"/";
                    var code = `<div class="card" style="width: 18rem;">
                    <h1 class="card-title" id = "title">${data.Title}</h5>
                    <img  id = "poster" src="${data.Poster}" class="card-img-top" alt="movie poster">
                    <div class="card-body">
                      
                      <p  id = "plot" class="card-text">${data.Plot}</p>
                      <p1 id ="actor">Actors: ${data.Actors}</p1>
                      <p1 id = "rated">Rated: ${data.Rated}</p1>
                      <p1 id = "awards">Awards: ${data.Awards}</p1>
                      <a href="${imdbAddress}" class="btn btn-primary p-3">Go to imdb website</a>
                    </div>
                  </div>`;
                  cardContainer.innerHTML+=code;

        
                }})
            }else{
                alert("Invalid response");
            }
        })

    
}

// //<<<<<<< feature/dropdownSelection

// =======
// //This searches for a youtube video based on the movie title given in the previous function
// //added full original sountrack to search to look specifically for that movies soundtrack.
// //function getYoutubeVideo(movieTitle) {
//     //var requestUrl = "https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=20&q=" + movieTitle + "full original soundtrack&type=video&key=AIzaSyCJTHFOR8cX7fWfJ_0L1mLrsfgvneAZnsk";
//    // console.log(requestUrl)
//    // fetch(requestUrl)
//      // .then(function (response) {
//      //   return response.json();
//      // })
//     //  .then(function (data) {
//     //    console.log(data.items[1].id.videoId)
//    //     var videoID = data.items[1].id.videoId
//   //      var youtubeVideo = "https://www.youtube.com/watch?v=" + videoID
//   //      console.log(youtubeVideo)       
//   //    })
// //  }
// //>>>>>>> main
