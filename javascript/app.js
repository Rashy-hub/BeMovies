import { SwiperFactory } from './swiperHandlers.js'
import { resultFetchData } from './apiHandlers.js'
const searchInput = document.getElementById('search_input')
const searchSubmit = document.getElementById('search_submit')

const resultsSection = document.getElementById('results')
const resultSpan = document.querySelector('.results h2 span')
let resultPage = 1

//User interface events handler

const submitHandler = (event) => {
    event.preventDefault()
    //call api here to find results related to a movie
    if (!searchInput.value.trim()) {
        resultsSection.style.display = 'none'
        return
    } else {
        resultFetchData(searchInput.value, resultPage)
        resultsSection.style.display = 'flex'
    }
    resultSpan.textContent = searchInput.value
    searchInput.value = ''

    //if results existes display block the results section
}

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
