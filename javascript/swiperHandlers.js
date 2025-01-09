import Swiper from 'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.mjs'

import { fetchData, getDynamicUrl, fetchDetails } from './apiHandlers.js'
import { movieDetailsHandler } from './modalHandlers.js'
//Swiper slides manipulation

const swiperPaginationState = []

export function initSlides(
    results,
    swiper,
    swiperPagination = {
        totalPage: 0,
        actualPage: 0,
        totalCount: 4,
        lastSearchInput: '',
        lastApiAction: '',
    },
    genresArray
) {
    swiperPaginationState.push(swiperPagination)
    swiperPagination
    swiper.slideTo(0, 1, false)
    swiper.off('reachEnd', debouncedLoadMoreHandler)
    swiper.removeAllSlides()
    console.log(genresArray)
    for (let index = 0; index < results.length; index++) {
        const slide = `
  <div class="swiper-slide">
  <img src="https://image.tmdb.org/t/p/original/${
      results[index].poster_path
  }" loading="lazy" alt="${
            results[index].original_title || 'Titre non disponible'
        }" />
  <div class="overlay" id="${results[index].id}">
    <h3>${results[index].original_title || 'Titre non disponible'}</h3>
    <p class="overlay_date">${
        results[index].release_date
            ? results[index].release_date.slice(0, 4)
            : 'Inconnue'
    }</p>
    <p class="overlay_genres">
      ${
          genresArray
              .filter(
                  (genre) =>
                      results[index].genre_ids &&
                      results[index].genre_ids.includes(genre.id)
              )
              .slice(0, 3)
              .map((genre) => genre.name)
              .join('/') || 'Genres non disponibles'
      }
    </p>
    <div class="overlay_note"><img src="/assets/star.svg" /> ${
        results[index].vote_average
            ? results[index].vote_average.toFixed(1)
            : '0.0'
    }</div>
  </div>
  <div class="swiper-lazy-preloader"></div>
</div>
`

        swiper.appendSlide(slide)
        swiper.update()

        const overlay = document.getElementById(results[index].id)
        overlay.addEventListener('click', async () => {
            const movieId = results[index].id
            const movieDetailsUrl = getDynamicUrl(
                'GET_MOVIE_DETAILS',
                {},
                movieId
            )
            const movieDetails = await fetchDetails(movieDetailsUrl)
            movieDetailsHandler(movieDetails)
        })
    }

    swiper.on('reachEnd', (swiper) => {
        let pagination = identifyPaginationReachEnd(swiper)

        debouncedLoadMoreHandler(swiper, pagination)
    })
    //pagination handling
    swiperPagination.totalCount = 0
    swiperPagination.totalCount += results.length
}

export function updateSlides(
    results,
    swiper,
    swiperPagination = {
        totalPage: 0,
        actualPage: 0,
        totalCount: 4,
        lastSearchInput: '',
        lastApiAction: '',
    },
    genresArray
) {
    console.log(genresArray)
    for (let index = 0; index < results.length; index++) {
        const slide = `<div class="swiper-slide">
  <img src="https://image.tmdb.org/t/p/original/${
      results[index].poster_path
  }" loading="lazy" alt="${
            results[index].original_title || 'Titre non disponible'
        }" />
  <div class="overlay" id="${results[index].id}">
    <h3>${results[index].original_title || 'Titre non disponible'}</h3>
    <p class="overlay_date">${
        results[index].release_date
            ? results[index].release_date.slice(0, 4)
            : 'Inconnue'
    }</p>
    <p class="overlay_genres">
      ${
          genresArray
              .filter(
                  (genre) =>
                      results[index].genre_ids &&
                      results[index].genre_ids.includes(genre.id)
              )
              .slice(0, 3)
              .map((genre) => genre.name)
              .join('/') || 'Genres non disponibles'
      }
    </p>
    <div class="overlay_note"><img src="/assets/star.svg" /> ${
        results[index].vote_average
            ? results[index].vote_average.toFixed(1)
            : '0.0'
    }</div>
  </div>
  <div class="swiper-lazy-preloader"></div>
</div>
`

        swiper.appendSlide(slide)

        const overlay = document.getElementById(results[index].id)
        overlay.addEventListener('click', async () => {
            const movieId = results[index].id
            const movieDetailsUrl = getDynamicUrl(
                'GET_MOVIE_DETAILS',
                {},
                movieId
            )
            const movieDetails = await fetchDetails(movieDetailsUrl)
            //call the modalFunction with moviesDetails
            movieDetailsHandler(movieDetails)
        })
    }

    //pagination handling

    swiperPagination.totalCount += results.length
}

//deboucner for loadMoreHandler
function debounce(func, wait) {
    let timeout
    return function (...args) {
        clearTimeout(timeout)
        timeout = setTimeout(() => func.apply(this, args), wait)
    }
}

//Swiper events handler

const loadMoreHandler = async function (swiper, swiperPagination) {
    swiperPagination.actualPage += 1

    if (swiperPagination.actualPage > swiperPagination.totalPage)
        console.log(
            `No mores pages to load for ${swiper.el.classList[0]} swiper`
        )
    else {
        const numberResult = await fetchData(
            getDynamicUrl(swiperPagination.lastApiAction, {
                query: encodeURIComponent(swiperPagination.lastSearchInput),
                page: swiperPagination.actualPage,
            }),
            { swiper, swiperPagination }
        )
    }
}
const debouncedLoadMoreHandler = debounce(loadMoreHandler, 300)
const swiperOnInit = function (event) {
    const currentSwiper = event.el.classList[0].split('-')[2]
    if (!event.el.classList[0].startsWith('swiper-container-'))
        console.log(
            'Swiper module cannot be initialized , maybe swiper container does not exist or is not named correctly'
        )
    else console.log(`Swiper init in ${currentSwiper} section`)
}

// Swiper factory that helps create multiple independant swipers
export function SwiperFactory(
    containerClass,
    buttonsClass,
    {
        totalPage = 0,
        actualPage = 0,
        totalCount = 4,
        lastSearchInput = '',
        ApiAction,
    }
) {
    const swiper = new Swiper(containerClass, {
        // Optional parameters
        direction: 'horizontal',
        loop: false,
        slidesPerView: 1,
        spaceBetween: 20,
        speed: 300,
        slidesPerGroup: 3,
        breakpoints: {
            500: {
                slidesPerView: 2,
            },
            768: {
                slidesPerView: 3,
            },
            1250: {
                slidesPerView: 4,
            },
        },
        slidesOffsetAfter: 100,
        slidesOffsetbefore: 100,
        //setWrapperSize: true,
        mousewheel: {
            releaseOnEdges: false,
        },
        // Navigation arrows with unique class names
        navigation: {
            nextEl: `${buttonsClass} .swiper-button-next`,
            prevEl: `${buttonsClass} .swiper-button-prev`,
        },
        grabCursor: true,
        on: {
            init: swiperOnInit,
        },
    })

    let swiperPagination = {
        totalPage: totalPage,
        actualPage: actualPage,
        totalCount: totalCount,
        lastSearchInput: lastSearchInput,
        lastApiAction: ApiAction,
        swiperContainer: containerClass,
    }
    return { swiper, swiperPagination }
}

function identifyPaginationReachEnd(swiper) {
    let pagination = null
    for (const element of swiperPaginationState) {
        if (
            `${element.swiperContainer.toString()}` ===
            `.${swiper.el.classList[0].toString()}`
        )
            pagination = element
    }

    return pagination
}
