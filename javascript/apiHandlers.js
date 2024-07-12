import { initSlides, updateSlides } from './swiperHandlers.js'
const genreListItems = document.querySelectorAll('.genre__list__item')
const activeGenreItem = document.querySelector('.genre__list__item--active')
//State management for pagination
export let resultsPagination = {
    totalPage: 0,
    actualPage: 0,
    totalCount: 4,
    lastSearchInput: '',
    lastApiAction: 'SEARCH_MOVIES_BY_NAME',
}
export let latestPagination = {
    totalPage: 0,
    actualPage: 0,
    totalCount: 4,
    lastSearchInput: '',
    lastApiAction: 'GET_LATEST_MOVIES',
}
export let genrePagination = {
    totalPage: 0,
    actualPage: 0,
    totalCount: 4,
    lastSearchInput: '',
    lastApiAction: 'SEARCH_MOVIES_BY_GENRE',
}

export const API_CONFIG = {
    SEARCH_MOVIES_BY_NAME: {
        endpoint: 'search/movie',
        params: {
            query: '',
            page: 0,
            include_adult: false,
            language: 'en-US',
        },
    },
    //typical url : https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&primary_release_date.lte=2024-07-01&sort_by=primary_release_date.desc
    //              https://api.themoviedb.org/3/discover/movie?include_adult=false&language=en-US&page=1&primary_release_date_lte=2024-07-01&sort_by=primary_release_date.desc
    GET_LATEST_MOVIES: {
        endpoint: 'discover/movie',
        params: {
            include_adult: false,
            language: 'en-US',
            page: 0,
            'primary_release_date.lte': new Date().toISOString().slice(0, 10),
            sort_by: 'primary_release_date.desc',
        },
    },
    GET_GENRES_IDS: {
        endpoint: 'genre/movie/list',
        params: { language: 'en' },
    },
    //'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=28'
    SEARCH_MOVIES_BY_GENRE: {
        endpoint: 'discover/movie',
        params: {
            include_adult: false,
            include_video: false,
            language: 'en-US',
            page: 0,
            sort_by: 'popularity.desc',
            with_genres: 35,
        },
    },
}

export function getDynamicUrl(action, userParams = {}) {
    // Validate action
    console.log(`${JSON.stringify(action)} : Action received by getDynamicUrl `)
    if (!Object.keys(API_CONFIG).includes(action)) {
        throw new Error(`Invalid action: ${action}`)
    }

    const baseUrl = 'https://api.themoviedb.org/3/'

    // Get the configuration for the specified action
    const actionConfig = API_CONFIG[action]
    console.log(
        `Before building the url : params => ${JSON.stringify(
            userParams,
            null,
            2
        )}`
    )
    const params = { ...actionConfig.params, ...userParams }

    // Construct URL with query parameters
    let url = new URL(`${baseUrl}${actionConfig.endpoint}`)
    url.search = new URLSearchParams(params).toString() // Handle encoding automatically

    console.log(url.toString())
    return url.toString()
}

export async function fetchData(
    requestURL,
    swiper,
    swiperPagination = {
        totalPage: 0,
        actualPage: 0,
        totalCount: 4,
        lastSearchInput: '',
        lastApiAction: '',
    }
) {
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization:
                'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiOTBjOTI1NzdhYjUyZTUxNThmYWU0MGYxMDdkMzBjOCIsInN1YiI6IjY2NzE5MzgzZTA3ZmFmZjAzNTcyZWZhNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ztStLJqy8UtW95RrD6ie8sIpBORWWgbdk32o9Zxx9HQ',
        },
    }

    try {
        const response = await fetch(requestURL, options)
        //`https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(searchValue)}&include_adult=false&language=en-US&page=${page}`
        // "https://api.themoviedb.org/3/search/movie?searchValue=test&page=1&include_adult=false&language=en-US"

        const responseJson = await response.json()
        //case were the request is not related to a swiper
        if (
            swiper === null &&
            swiperPagination.lastApiAction === 'GET_GENRES_IDS'
        ) {
            // in this case we need to store genre liste
            console.log('GET_GENRES_IDS action is called to store genre list')
            updateDataSetGenreIds(responseJson)
            return responseJson.total_results
        }
        const filtered_response = responseJson.results.filter((movie) => {
            if (movie.hasOwnProperty('poster_path')) {
                return movie.poster_path !== null && movie.poster_path !== ''
            }

            return false
        })

        //pagination handling

        swiperPagination.totalPage = responseJson.total_pages
        console.log(`${responseJson.total_pages} : Total number of pages`)

        //initializing or updating slides
        if (responseJson.page === 1) {
            console.log('First time loading this query ')

            initSlides(filtered_response, swiper, swiperPagination)
        } else {
            console.log(
                'updating and loading more images after reaching end of swiper , page : ' +
                    responseJson.page
            )
            updateSlides(filtered_response, swiper, swiperPagination)
        }

        return responseJson.total_results
    } catch (err) {
        console.error(err)
    }
}

function updateDataSetGenreIds(response) {
    genreListItems.forEach(function (item) {
        response.genres.forEach((genre) => {
            if (item.textContent === genre.name) {
                item.dataset.genreid = genre.id
            }
        })
    })
}
