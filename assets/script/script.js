let movies = [];
let pickedMovie = "";
let btnClick = document.querySelector(".cageBtn")
var movieTitleEl = document.querySelector(".movieTitle")
var movieEl = document.querySelector(".movie")
var nick1El = document.querySelector(".nick1")
var nick2El = document.querySelector(".nick2")

var nickImg = document.createElement("img")
nickImg.setAttribute("src", "https://toppng.com/public/uploads/thumbnail/icolas-cage-face-png-png-transparent-library-nic-cage-face-11562888750gtnxrtyuum.png")
nickImg.style.height = "200px"

var nick2Img = document.createElement("img")
nick2Img.setAttribute("src", "https://toppng.com/public/uploads/thumbnail/icolas-cage-face-png-png-transparent-library-nic-cage-face-11562888750gtnxrtyuum.png",)
nick2Img.style.height = "200px"


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
        console.log(getReviews());

        getReviewsApi();
    });
}
//console.log(movies);
function pickRandomMovie() {
    //randomly picks movie from array and puts it in the pickedMovie array
    let randomMovie = Math.floor(Math.random() * movies.length);
    pickedMovie = (movies[randomMovie]);
    
    nick1El.appendChild(nick2Img)
    movieTitleEl.innerHTML = " <p> " + pickedMovie + " </p> "
    nick2El.appendChild(nickImg)
}
//console.log(pickedMovie);
//getApi();

// Movie review API Section 
// Function to get URL with random Cage movie and added + signs between words within the movie
function getReviews() {
    const copyMovie = pickedMovie.slice();
    let movie = copyMovie.split(" ").join("+");
    const apiKey = "eb0884da";
    const movieURL = "https://www.omdbapi.com/?t=" + movie + "&apikey=" + apiKey;
    return movieURL;
}

// Function to fetch movie URL
let stuff = "";
let posterEl = document.querySelector('.poster');
function getReviewsApi() {
    fetch(getReviews())
        .then(res => {
            return res.json();
    })
        .then(data => {
           posterEl.setAttribute("src", data.Poster);
           // posterEl.appendChild(poster);
           // Posts plot to list
           document.getElementById('plot').innerHTML = "🌭 SYNOPSIS: " + data.Plot;
           // Posts year to list
           document.getElementById('year').innerHTML = "🌭 YEAR: " + data.Year;
           // Posts genre to list
           document.getElementById('genre').innerHTML = "🌭 GENRE: " + data.Genre;
           // Posts movie rating to list
           document.getElementById('rating').innerHTML ="🌭 RATING: " + data.Rated;
           // Posts movie runtime to list
           document.getElementById('runtime').innerHTML ="🌭 RUNTIME: " + data.Runtime;
        })
} 

// Plot, Poster, Year, Genre, Rated, Runtime

