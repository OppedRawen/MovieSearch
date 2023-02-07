var input = document.querySelector("#search-input");
var submit = document.querySelector("#submit");
var form = document.querySelector("#search-form");
var select = document.querySelector("#form-select");

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
    if(select.value==1){
        requestUrl = `http://www.omdbapi.com/?t='${userInput}'&type=movie&tomatoes=true&apikey=e1279f79&`;
    }else if(select.value==2){
        requestUrl = `http://www.omdbapi.com/?t='${userInput}'&type=series&tomatoes=true&apikey=e1279f79&`;
    }else if(select.value==3){
        requestUrl = `http://www.omdbapi.com/?t='${userInput}'&type=episodes&tomatoes=true&apikey=e1279f79&`;
    }
    

    
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
                    var plot = document.querySelector("#plot");
                    var actor = document.querySelector('#actor');
                    var rated = document.querySelector("#rated");
                    var poster = document.querySelector("#poster");
                    poster.setAttribute("src",data.Poster);
                    plot.textContent = data.Plot;
                    actor.textContent = data.Actors;
                    rated.textContent = data.Rated
                }})
            }else{
                alert("Invalid response");
            }
        })

    
}
