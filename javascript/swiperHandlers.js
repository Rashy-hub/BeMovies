import Swiper from 'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.mjs'

//Swiper events handler

export const swiperOnInit = function (event) {
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
        loop: true,
        slidesPerView: 4,
        spaceBetween: 19,
        slidesPerGroup: 1,
        slidesOffsetAfter: 100,
        slidesOffsetbefore: 100,
        //setWrapperSize: true,

        // Navigation arrows with unique class names
        navigation: {
            nextEl: `${buttonsClass} .swiper-button-next`,
            prevEl: `${buttonsClass} .swiper-button-prev`,
        },

        on: {
            init: swiperOnInit,
        },
    })
    return swiper
}
