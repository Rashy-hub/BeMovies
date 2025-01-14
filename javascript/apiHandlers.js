import { initSlides, updateSlides } from './swiperHandlers.js'
const genreListItems = document.querySelectorAll('.genre__list__item')
let genresArray = []
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
    GET_MOVIE_DETAILS: {
        endpoint: 'movie/{movie_id}',
        params: { language: 'en-US' }, // tu peux adapter les paramètres selon les besoins
    },

    GET_LATEST_MOVIES: {
        endpoint: 'discover/movie',
        params: {
            include_adult: false,
            language: 'en-US',
            page: 0,
            region: 'Belgium',
            'primary_release_date.lte': '2023-01-09',
            sort_by: 'primary_release_date.desc',
        },
    },
    GET_GENRES_IDS: {
        endpoint: 'genre/movie/list',
        params: { language: 'en' },
    },

    SEARCH_MOVIES_BY_GENRE: {
        endpoint: 'discover/movie',
        params: {
            include_adult: false,
            include_video: false,
            region: 'Belgium',
            language: 'en-US',
            page: 0,
            sort_by: 'popularity.desc',
            with_genres: 35,
        },
    },
}

export function getDynamicUrl(action, userParams = {}, id = '') {
    if (!Object.keys(API_CONFIG).includes(action)) {
        throw new Error(`Invalid action: ${action}`)
    }

    const baseUrl = 'https://api.themoviedb.org/3/'

    const actionConfig = API_CONFIG[action]
    const params = { ...actionConfig.params, ...userParams }

    let url = new URL(`${baseUrl}${actionConfig.endpoint}`)
    url.pathname = url.pathname.replace('%7Bmovie_id%7D', id)
    //https://api.themoviedb.org/3/movie/1318930?language=en-US
    //https://api.themoviedb.org/3/movie/?language=en-US&movie_id=1318930
    console.log(url)
    if (url.pathname.includes('%7Bmovie_id%7D')) {
        console.log('url includes movie_id ' + userParams.movie_id)
        url.pathname = url.pathname.replace('{movie_id}', userParams.movie_id)
    }

    url.search = new URLSearchParams(params).toString()

    return url.toString()
}

export async function fetchData(requestURL, { swiper, swiperPagination }) {
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
        },
    }

    try {
        let jsonKeysData = { bearer: '' }

        //!uncomment in order to use the correct api key
        // Read bearer token from api.json securely
        /*      fetch('../utils/api.json').then(async (response) => {
            if (response.ok) {
                jsonKeysData = await response.json()
                //console.log('File found!')
            } else {
                console.error(
                    'Error fetching utils/api.json file:',
                    response.status
                )
              
            }
        }) */

        //!for the moment use my local key anyway even if api.json not found , do not forget to adapt when deployed for prod
        jsonKeysData.bearer =
            'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiOTBjOTI1NzdhYjUyZTUxNThmYWU0MGYxMDdkMzBjOCIsInN1YiI6IjY2NzE5MzgzZTA3ZmFmZjAzNTcyZWZhNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ztStLJqy8UtW95RrD6ie8sIpBORWWgbdk32o9Zxx9HQ'
        options.headers.Authorization = `Bearer ${jsonKeysData.bearer}`

        const response = await fetch(requestURL, options)

        const responseJson = await response.json()
        //case were the request is not related to a swiper
        if (
            swiper === null &&
            swiperPagination.lastApiAction === 'GET_GENRES_IDS'
        ) {
            // in this case we need to store genre liste

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

        //initializing or updating slides

        if (responseJson.page === 1) {
            initSlides(filtered_response, swiper, swiperPagination, genresArray)
        } else {
            updateSlides(
                filtered_response,
                swiper,
                swiperPagination,
                genresArray
            )
        }

        return responseJson.total_results
    } catch (err) {
        console.error(err)
    }
}

export async function fetchDetails(url) {
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
        },
    }

    try {
        let jsonKeysData = { bearer: '' }

        jsonKeysData.bearer =
            'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiOTBjOTI1NzdhYjUyZTUxNThmYWU0MGYxMDdkMzBjOCIsInN1YiI6IjY2NzE5MzgzZTA3ZmFmZjAzNTcyZWZhNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ztStLJqy8UtW95RrD6ie8sIpBORWWgbdk32o9Zxx9HQ'
        options.headers.Authorization = `Bearer ${jsonKeysData.bearer}`

        const response = await fetch(url, options)

        const responseJson = await response.json()
        console.log(JSON.stringify(responseJson))

        return responseJson
    } catch (error) {
        console.log(error)
    }
}

function updateDataSetGenreIds(response) {
    genresArray = response.genres
    genreListItems.forEach(function (item) {
        response.genres.forEach((genre) => {
            if (item.textContent === genre.name) {
                item.dataset.genreid = genre.id
            }
        })
    })
}
