import Swiper from 'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.mjs'

import { fetchData, getDynamicUrl } from './apiHandlers.js'

//Swiper slides manipulation

export function initSlides(
    results,
    swiper,
    swiperPagination = {
        totalPage: 0,
        actualPage: 0,
        totalCount: 4,
        lastSearchInput: '',
        lastApiAction: '',
    }
) {
    swiper.slideTo(0, 1, false)
    swiper.off('reachEnd', loadMoreHandler)
    swiper.removeAllSlides()
    for (let index = 0; index < results.length; index++) {
        const slide = `<div class="swiper-slide" ><img  src="https://image.tmdb.org/t/p/original/${results[index].poster_path}" loading="lazy" alt=""/>   <div class="swiper-lazy-preloader"></div> </div>`
        swiper.appendSlide(slide)
        swiper.update()
    }
    swiper.on('reachEnd', () => {
        loadMoreHandler(swiper, swiperPagination)
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
    }
) {
    console.log(`swiper UPDATE with ${results.length} images`)
    for (let index = 0; index < results.length; index++) {
        const slide = `<div class="swiper-slide" ><img src="https://image.tmdb.org/t/p/original/${results[index].poster_path}" loading="lazy" alt=""/>   <div class="swiper-lazy-preloader"></div> </div>`

        swiper.appendSlide(slide)
    }

    //pagination handling

    swiperPagination.totalCount += results.length
    console.log(
        `${swiper.el.classList[0].split('-')[2]} totalCount now equal to ${
            swiperPagination.totalCount
        }`
    )
}
//Swiper events handler

const loadMoreHandler = function (
    swiper,
    swiperPagination = {
        totalPage: 0,
        actualPage: 0,
        totalCount: 4,
        lastSearchInput: '',
        lastApiAction: '',
    }
) {
    console.log(`load more slides for this ${swiper.el.classList[0]} `)

    swiperPagination.actualPage++
    if (swiperPagination.actualPage === 1) swiperPagination.actualPage++

    if (swiperPagination.actualPage > swiperPagination.totalPage)
        console.log(
            `No mores pages to load for ${swiper.el.classList[0]} swiper`
        )
    else {
        fetchData(
            getDynamicUrl(swiperPagination.lastApiAction, {
                query: encodeURIComponent(swiperPagination.lastSearchInput),
                page: swiperPagination.actualPage,
            }),
            swiper
        )
    }
}

const swiperOnInit = function (event) {
    const currentSwiper = event.el.classList[0].split('-')[2]
    if (!event.el.classList[0].startsWith('swiper-container-'))
        console.log(
            'Swiper module cannot be initialized , maybe swiper container does not exist or is not named correctly'
        )
    else console.log(`Swiper init in ${currentSwiper} section`)
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
            releaseOnEdges: true,
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
    return swiper
}
