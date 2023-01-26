let movies = [];
let pickedMovie = "";
let btnClick = document.querySelector(".cageBtn")
var movieTitleEl = document.querySelector(".movieTitle")
var movieEl = document.querySelector(".movie")
var nick1El = document.querySelector(".nick1")
var nick2El = document.querySelector(".nick2")

var nickImg = document.createElement("img")
nickImg.setAttribute("src", "https://toppng.com/public/uploads/thumbnail/icolas-cage-face-png-png-transparent-library-nic-cage-face-11562888750gtnxrtyuum.png")

var nick2Img = document.createElement("img")
nick2Img.setAttribute("src", "https://toppng.com/public/uploads/thumbnail/icolas-cage-face-png-png-transparent-library-nic-cage-face-11562888750gtnxrtyuum.png")



btnClick.addEventListener("click", getApi);
function getApi() {
    //clears the movies array
    movies = [];
    const requestUrl = 'https://api.nicolascage.app/filmography';
//get a list of all nic movie data
  fetch(requestUrl)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
       //loops through data and gets just the movie title
        for (let i = 0; i < data.films.length; i++) {
            let nickFilms = data.films[i];
            movies.push(nickFilms.film);
            //console.log(movies);
         //console.log(pickedMovie);  
        }
        //resets the pickedMovie array
        pickedMovie = "";
        //randomly picks movie from the array
        pickRandomMovie(movies);
        console.log(pickedMovie);
    });
}
//console.log(movies);
function pickRandomMovie() {
    //randomly picks movie from array and puts it in the pickedMovie array
    let randomMovie = Math.floor(Math.random() * movies.length);
    pickedMovie = (movies[randomMovie]);
    
    nick1El.appendChild(nick2Img)
    movieTitleEl.innerHTML = "<p>" + pickedMovie + "</p>"
    nick2El.appendChild(nickImg)
    
}
//console.log(pickedMovie);
//getApi();
