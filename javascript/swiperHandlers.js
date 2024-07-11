import Swiper from 'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.mjs'

import {
    resultsPagination,
    genrePagination,
    latestPagination,
    fetchData,
    getDynamicUrl,
} from './apiHandlers.js'

//Swiper slides manipulation

export function initSlides(results, swiper) {
    swiper.slideTo(0, 1, false)
    swiper.off('reachEnd', loadMoreHandler)
    swiper.removeAllSlides()
    for (let index = 0; index < results.length; index++) {
        console.log(`creating ${results.length} new slide : `)
        const slide = `<div class="swiper-slide" ><img class="resultimages" src="https://image.tmdb.org/t/p/original/${results[index].poster_path}" loading="lazy" alt=""/>   <div class="swiper-lazy-preloader"></div> </div>`
        swiper.appendSlide(slide)
        swiper.update()
    }
    swiper.on('reachEnd', loadMoreHandler)
    //pagination handling
    if (swiper.el.classList.contains('swiper-container-result')) {
        resultsPagination.totalCount = 0
        resultsPagination.totalCount += results.length
        console.log(
            `totalCount of firstPage equal to ${resultsPagination.totalCount}`
        )
    } else if (swiper.el.classList.contains('swiper-container-latest')) {
        latestPagination.totalCount = 0
        latestPagination.totalCount += results.length
        console.log(
            `totalCount of firstPage equal to ${latestPagination.totalCount}`
        )
    } else if (swiper.el.classList.contains('swiper-container-genre')) {
        genrePagination.totalCount = 0
        genrePagination.totalCount += results.length
        console.log(
            `totalCount of firstPage equal to ${genrePagination.totalCount}`
        )
    }
}

export function updateSlides(results, swiper) {
    console.log(`swiper UPDATE with ${results.length} images`)
    for (let index = 0; index < results.length; index++) {
        const slide = `<div class="swiper-slide" ><img class="resultimages" src="https://image.tmdb.org/t/p/original/${results[index].poster_path}" loading="lazy" alt=""/>   <div class="swiper-lazy-preloader"></div> </div>`

        swiper.appendSlide(slide)
    }

    //pagination handling
    if (swiper.el.classList.contains('swiper-container-result')) {
        resultsPagination.totalCount += results.length
        console.log(
            `result totalCount now equal to ${resultsPagination.totalCount}`
        )
    } else if (swiper.el.classList.contains('swiper-container-latest')) {
        latestPagination.totalCount += results.length
        console.log(
            `latest totalCount now equal to ${latestPagination.totalCount}`
        )
    } else if (swiper.el.classList.contains('swiper-container-genre')) {
        genrePagination.totalCount += results.length
        console.log(
            `genre totalCount now equal to ${genrePagination.totalCount}`
        )
    }
}
//Swiper events handler

export const loadMoreHandler = function (swiper) {
    console.log(`load more slides for this ${swiper.el} `)

    if (swiper.el.classList.contains('swiper-container-result')) {
        resultsPagination.actualPage++
        if (resultsPagination.actualPage > resultsPagination.totalPage)
            console.log('No mores pages to load for result swiper')
        else {
            fetchData(
                getDynamicUrl('SEARCH_MOVIES_BY_NAME', {
                    query: encodeURIComponent(
                        resultsPagination.lastSearchInput
                    ),
                    page: resultsPagination.actualPage,
                }),
                swiper
            )
        }
    } else if (swiper.el.classList.contains('swiper-container-latest')) {
        latestPagination.actualPage++
        if (latestPagination.actualPage > latestPagination.totalPage)
            console.log('No mores pages to load for latest swiper')
        else {
            fetchData(
                getDynamicUrl('GET_LATEST_MOVIES', {
                    query: encodeURIComponent(
                        resultsPagination.lastSearchInput
                    ),
                    page: latestPagination.actualPage,
                }),
                swiper
            )
        }
    }
    if (swiper.el.classList.contains('swiper-container-genre')) {
        latestPagination.actualPage++
        if (resultsPagination.actualPage > latestPagination.totalPage)
            console.log('No mores pages to load for genre swiper')
        else {
            fetchData(
                getDynamicUrl('SEARCH_MOVIES_BY_GENRE', {
                    query: encodeURIComponent(
                        resultsPagination.lastSearchInput
                    ),
                    page: latestPagination.actualPage,
                }),
                swiper
            )
        }
    }
}

const swiperOnInit = function (event) {
    if (event.el.classList.contains('swiper-container-result')) {
        console.log('swiper initialized in results section')
    } else if (event.el.classList.contains('swiper-container-latest')) {
        console.log('swiper initialized in latest section')
        //load default latest images from movie database
    } else if (event.el.classList.contains('swiper-container-genre')) {
        console.log('swiper initialized in genre')
        //load default active genre images from movie database
    } else console.log('unknown swiper module : default images loaded')
}

// Swiper factory that helps create multiple independant swipers
export function SwiperFactory(containerClass, buttonsClass) {
    const swiper = new Swiper(containerClass, {
        // Optional parameters
        direction: 'horizontal',
        loop: false,
        slidesPerView: 1,
        spaceBetween: 20,
        speed: 300,
        slidesPerGroup: 2,
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
    return swiper
}
