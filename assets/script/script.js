let movies = [];
let pickedMovie = '';
let btnClick = document.querySelector(".cageBtn")
var movieTitleEl = document.querySelector(".movieTitle")
var movieEl = document.querySelector(".movie")
var nick1El = document.querySelector(".nick1")
var nick2El = document.querySelector(".nick2")
var nickImg = document.createElement("img")
let reviewCont = document.querySelector("#reviews-container");
let btnNxt = document.createElement("button");

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
            storeWatched();
            //resets the pickedMovie string
            pickedMovie = "";
            //randomly picks movie from the array
            pickRandomMovie(movies);
            //console.log(getReviews());
            getReviewsApi();
            
            watchLater();
            //scrolls to the movieEl
            document.querySelector(".movie").scrollIntoView({
                behavior: 'smooth'
            })
            //nextBtn();
            //storeWatched();
        });
}
//btnNxt();
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
            // Posts poster to list
            if (data.Poster === "N/A") {
                posterEl.setAttribute("src", "https://toppng.com/public/uploads/thumbnail/icolas-cage-face-png-png-transparent-library-nic-cage-face-11562888750gtnxrtyuum.png")
            }else{
            posterEl.setAttribute("src", data.Poster);
            }

            // Posts plot to list
            if (data.Plot === "N/A") {
                document.getElementById('plot').innerHTML = "🌭 " + "Insert sick back story here."
            }else{
            document.getElementById('plot').innerHTML = "🌭 " + data.Plot;
            }

            // Posts year to list
            if (data.Year === "N/A") {
                document.getElementById('year').innerHTML = "🌭 " + "3005"
            }else{
            document.getElementById('year').innerHTML = "🌭 " + data.Year;
            }

            // Posts genre to list
            if (data.Genre === "N/A") {
                document.getElementById('genre').innerHTML = "🌭 " + "Action only."
            }else{
            document.getElementById('genre').innerHTML = "🌭 " + data.Genre;
            }

            // Posts movie rating to list
            if (data.Rated === "N/A") {
                document.getElementById('rating').innerHTML = "🌭 " + "Rad."
            }else{
            document.getElementById('rating').innerHTML = "🌭 " + data.Rated;
            }

            // Posts movie runtime to list
            if (data.Runtime === "N/A") {
                document.getElementById('runtime').innerHTML = "🌭 " + "60 seconds"
            }else{
            document.getElementById('runtime').innerHTML = "🌭 " + data.Runtime;
            }
        })
}

let movieList = [];
function storeWatched() {
    let savedMovie = localStorage.getItem("list-of");
    //console.log(JSON.parse(savedMovie));
    if (JSON.parse(savedMovie)) {
        movieList = JSON.parse(savedMovie);
    }
    if (movieList.length >= 5) {
        movieList.shift();
        //console.log("should be capped at five:",movieList);
    }
    if (pickedMovie) {
        //console.log("picked movie:", pickedMovie);
        //console.log("movie list:", movieList);
        movieList.push(pickedMovie)
        localStorage.setItem("list-of", JSON.stringify(movieList))
        //console.log(movieList);
    }
}
function watchLater() {
    let savedMovie = localStorage.getItem("list-of");
    let movieList = JSON.parse(savedMovie);
    let ulDiv = document.querySelector(".watched-list");
    ulDiv.innerHTML = "";
    //console.log(typeof JSON.parse(savedMovie))
    if (movieList) {
        console.log(movieList)
        for (let i = 0; i < movieList.length; i++) {
            console.log(movieList[i]);
            let listOf = document.createElement("li");
            listOf.classList.add("list-of");
            listOf.textContent = movieList[i];
            ulDiv.appendChild(listOf);
        }
    }
   
btnNxt.addEventListener("click", getApi);
function nextBtn() {

    btnNxt.classList.add("next-button");
    btnNxt.textContent = "🖱️ NEXT CAGE MASTERPIECE 🖱️"
    reviewCont.appendChild(btnNxt);

}
nextBtn();

    //console.log(savedMovie);
    /*let ulDiv = document.querySelector(".watched-list");
    let listOf = document.createElement("li");
    listOf.classList.add("list-of");
    listOf.textContent = pickedMovie;
    ulDiv.appendChild(listOf);
    //storeWatched();*/
}
function createList() {
    let listOf = document.createElement("li");
    listOf.classList.add("list-of");
    listOf.textContent = pickedMovie;
    document.body.appendChild(listOf);
}