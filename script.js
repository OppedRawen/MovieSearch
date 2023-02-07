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
    var posterUrl = "http://img.omdbapi.com/?apikey=e1279f79&"

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
                }})
            }
        })
}