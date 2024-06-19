const searchInput = document.getElementById('search_input')
const searchSubmit = document.getElementById('search_submit')

const resultsSection = document.getElementById('results')
const resultSpan = document.querySelector('.results h2 span')

const submitHandler = (event) => {
    event.preventDefault()
    //call api here to find results related to a movie
    if (!searchInput.value) {
        resultsSection.style.display = 'none'
        return
    } else {
        resultsSection.style.display = 'flex'
    }
    resultSpan.textContent = searchInput.value
    searchInput.value = ''

    //if results existes display block the results section
}
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

function SwiperFactory(containerClass, buttonsClass) {
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
    })
    return swiper
}
