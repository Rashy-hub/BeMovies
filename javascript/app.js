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

const swiperResult = new Swiper('.swiper-container-result', {
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
        nextEl: '.result-swiper-buttons .swiper-button-next',
        prevEl: '.result-swiper-buttons .swiper-button-prev',
    },
})

const swiperLatest = new Swiper('.swiper-container-latest', {
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
        nextEl: '.latest-swiper-buttons .swiper-button-next',
        prevEl: '.latest-swiper-buttons .swiper-button-prev',
    },
})

swiperResult.enable()
swiperLatest.enable()
