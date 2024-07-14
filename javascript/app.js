import { fetchData, getDynamicUrl } from './apiHandlers.js'
import { SwiperFactory } from './swiperHandlers.js'

const searchInput = document.querySelector('#search_input')
const searchButton = document.querySelector('#search_submit')
const resultsSection = document.getElementById('results')
const resultSpan = document.querySelector('.results h2 span')
const latestSpan = document.querySelector('.latest h2 span')
const genreSpan = document.querySelector('.genre h2 span')

const genreListItems = document.querySelectorAll('.genre__list__item')
const genreSubTitle = document.querySelector('.genre__subtitle span')

//const resultsImages = document.querySelectorAll('.resultimages')

resultsSection.style.display = 'none'

const searchSubmitHandler = async (event) => {
    event.preventDefault()
    let totalResults = 0
    //call api here to find results related to a movie

    if (!searchInput.value.trim()) {
        resultsSection.style.display = 'none'
        return
    } else {
        // resultsPagination.totalCount = 0
        totalResults = await fetchData(
            getDynamicUrl('SEARCH_MOVIES_BY_NAME', {
                query: encodeURIComponent(searchInput.value),
                page: 1,
            }),
            swiperResult
        )
        swiperResult.swiperPagination.lastSearchInput = searchInput.value
        resultsSection.style.display = 'flex'
    }
    resultSpan.textContent = `${searchInput.value} - total : ${totalResults}`
    searchInput.value = ''

    //if results existes display block the results section
}

//Main Code

searchButton.addEventListener('click', searchSubmitHandler)
searchInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        searchButton.click()
    }
})

const swiperResult = SwiperFactory(
    '.swiper-container-result',
    '.result-swiper-buttons',
    { ApiAction: 'SEARCH_MOVIES_BY_GENRE' }
)
const swiperLatest = SwiperFactory(
    '.swiper-container-latest',
    '.latest-swiper-buttons',
    { ApiAction: 'GET_LATEST_MOVIES' }
)
const swiperGenre = SwiperFactory(
    '.swiper-container-genre',
    '.genre-swiper-buttons',
    { ApiAction: 'SEARCH_MOVIES_BY_GENRE' }
)

//load latest swiper

const latestTotalResults = await fetchData(
    getDynamicUrl('GET_LATEST_MOVIES', { page: 1 }),
    swiperLatest
)
latestSpan.textContent = `total : ${latestTotalResults}`

const genreListTotalResults = await fetchData(
    getDynamicUrl('GET_GENRES_IDS', {}),
    { swiper: null, swiperPagination: { lastApiAction: 'GET_GENRES_IDS' } }
)

const genreTotalResults = await fetchData(
    getDynamicUrl('SEARCH_MOVIES_BY_GENRE', { page: 1, with_genres: 35 }),
    swiperGenre
)
genreSpan.textContent = `Comedy - ${genreTotalResults}`

genreSubTitle.textContent = genreListItems[0].textContent
genreListItems.forEach(function (item) {
    item.addEventListener('click', async function (event) {
        event.stopPropagation()

        genreListItems.forEach(function (item) {
            item.classList.remove('genre__list__item--active')
        })
        item.classList.add('genre__list__item--active')
        // genrePagination.actualPage = 1
        swiperGenre.swiperPagination.actualPage = 1 // Reset the pagination for new genre
        const genreTotalResults = await fetchData(
            getDynamicUrl('SEARCH_MOVIES_BY_GENRE', {
                page: 1,
                with_genres: item.dataset.genreid,
            }),
            swiperGenre
        )
        genreSpan.textContent = `${item.textContent} - Total ${genreTotalResults} results`
        genreSubTitle.textContent = item.textContent
    })
})
