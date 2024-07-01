import { swiperOnInit, SwiperFactory } from './swiperHandlers.js'

const searchInput = document.getElementById('search_input');
const searchSubmit = document.getElementById('search_submit');
const searchInputValue = document.getElementById('search_input').value;
const searchWrapper = document.getElementById('searchWrapper');
const latestWrapper = document.getElementById('latestWrapper');
const genreWrapper = document.getElementById('genreWrapper');

const resultsSection = document.getElementById('results');
const resultSpan = document.querySelector('.results h2 span');
const genreListItem = document.querySelectorAll('.genre__list__item');
const selectedGenre = document.getElementById('selectedGenre');


//User interface events handler

const submitHandler = (event) => {
    event.preventDefault();
    //call api here to find results related to a movie
    fetchSearchData(document.getElementById('search_input').value);
    if (!searchInput.value.trim()) {
        resultsSection.style.display = 'none'
        return
    } else {
        resultsSection.style.display = 'flex'
    }
    resultSpan.textContent = searchInput.value
    searchInput.value = ''

    //if results existes display block the results section
}

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3ZjM1YjkyNTQ0YjkyMGUwZjdhOTJhOThkOTcxYjM2YiIsInN1YiI6IjY2NzNlZjYwZDhmMDBjYzUyZDI1Y2I1OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.uEMk-wNmWhkkSKgjyB0nmm7kzf1KOOQU6i9CpSvS-78'
  }
};



const fetchSearchData = async (searchInputValue) => {
    try {
    const response = await fetch(`https://api.themoviedb.org/3/search/movie?query=${searchInputValue}`, options);
    const data = await response.json();
    console.log(data);
    console.log(data.results);
    console.log(data.results[1]);
    console.log(data.results[1].original_title);
    console.log(data.results[1].genre_ids);
    searchWrapper.innerHTML = "";
    displayMovies(data.results);
    } catch(err) {
        console.log("Error Fetching data ", err);
    }
};

const displayMovies = (dataResults) => {
    dataResults.forEach((element) => {
        const card = document.createElement("div");
        let temp = document.getElementById('cardTemplate');
        card.innerHTML = temp.innerHTML;
        searchWrapper.appendChild(card);
        card.setAttribute("class", "swiper-slide");
        card.querySelector("div h2").innerText = element.original_title;
        card.querySelector("div h4").innerText = element.release_date;
        card.querySelector("div p").innerText = element.genre_ids;
        card.querySelector("div h3").innerHTML = `<img src="./assets/star.svg" alt="">`+ element.vote_average;
        card.querySelector(".moviePoster").setAttribute("src", `https://image.tmdb.org/t/p/original${element.poster_path}`);
    } );
}

const fetchLatestData = async () => {
    try {
    const response = await fetch('https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&vote_count.gte=1', options);
    const latestData = await response.json();
    //console.log(latestData);
    //console.log(latestData.results);
    //console.log(latestData.results[1]);
    //console.log(latestData.results[1].original_title);
    //console.log(latestData.results[1].genre_ids);
    displayLatestMovies(latestData.results);
    } catch(err) {
        console.log("Error Fetching data ", err);
    }
};

const displayLatestMovies = (latestDataResults) => {
    latestDataResults.forEach((element) => {
        const card = document.createElement("div");
        let temp = document.getElementById('cardTemplate');
        card.innerHTML = temp.innerHTML;
        latestWrapper.appendChild(card);
        card.setAttribute("class", "swiper-slide");
        card.querySelector("div h2").innerText = element.original_title;
        card.querySelector("div h4").innerText = element.release_date;
        card.querySelector("div p").innerText = element.genre_ids;
        card.querySelector("div h3").innerHTML = `<img src="./assets/star.svg" alt="" width="234px" height="341px" loading="lazy">`+ element.vote_average;
        card.querySelector(".moviePoster").setAttribute("src", `https://image.tmdb.org/t/p/original${element.poster_path}`);
    } );
}

const fetchGenreData = async (genreNumber) => {
    try {
    const response = await fetch(`https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=${genreNumber}`, options);
    const genreData = await response.json();
    console.log(genreData.results);
    displayGenreMovies(genreData.results);
    } catch(err) {
        console.log("Error Fetching data ", err);
    }
};

const displayGenreMovies = (genreDataResults) => {
    genreDataResults.forEach((element) => {
        const card = document.createElement("div");
        let temp = document.getElementById('cardTemplate');
        card.innerHTML = temp.innerHTML;
        genreWrapper.appendChild(card);
        card.setAttribute("class", "swiper-slide");
        card.querySelector("div h2").innerText = element.original_title;
        card.querySelector("div h4").innerText = element.release_date;
        card.querySelector("div p").innerText = element.genre_ids;
        card.querySelector("div h3").innerHTML = `<img src="./assets/star.svg" alt="" width="234px" height="341px" loading="lazy">`+ element.vote_average;
        card.querySelector(".moviePoster").setAttribute("src", `https://image.tmdb.org/t/p/original${element.poster_path}`);
    } );
}

fetch('https://api.themoviedb.org/3/genre/movie/list?language=en', options)
  .then(response => response.json())
  .then(response => console.log(response))
  .catch(err => console.error(err));

window.onload = (event) => {
    console.log("page is fully loaded");
    fetchLatestData();
    fetchGenreData("14");
  };
  

//contenu Div (div.class : "swiper-slide")
/* <div class="overlayCard">
    <div class="cardContent">
        <h2></h2>
        <h4></h4>
        <p></p>
        <h3><img src="./Assets/star.svg" alt=""></h3>
        </div>
    </div>
    <img src="" alt=""></img> */


// Main code

searchSubmit.addEventListener('click', submitHandler)

const swiperResult = SwiperFactory(
    '.swiper-container-result',
    '.result-swiper-buttons'
)
const swiperLatest = SwiperFactory(
    '.swiper-container-latest',
    '.latest-swiper-buttons'
)
const swiperGenre = SwiperFactory(
    '.swiper-container-genre',
    '.genre-swiper-buttons'
)

swiperResult.enable()
swiperLatest.enable()
swiperGenre.enable()

// Choose a genre


genreListItem.forEach(function(elem) {
    elem.addEventListener('click', function() {
        genreListItem.forEach(function(elem) {
            elem.classList.remove('genre__list__item--active');
        })
        elem.classList.add('genre__list__item--active');
        selectedGenre.innerText = `${elem.innerText}`;
        genreWrapper.innerHTML = "";
        console.log(elem.dataset.id);
        fetchGenreData(`${elem.dataset.id}`);
    });
})
