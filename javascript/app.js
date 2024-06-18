const searchInput = document.getElementById('search_input')
const searchSubmit = document.getElementById('search_submit')

const resultsSection = document.getElementById('results')

const submitHandler = (event) => {
    event.preventDefault()
    //call api here to find results related to a movie
    if (!searchInput.value) {
        resultsSection.style.display = 'none'
        return
    } else {
        resultsSection.style.display = 'block'
    }
    searchInput.value = ''

    //if results existes display block the results section
}
searchSubmit.addEventListener('click', submitHandler)
const swiper = new Swiper('.swiper', {
    // Optional parameters
    direction: 'horizontal',
    loop: true,
    slidesPerView: 4, // Show 4 slides per view
    spaceBetween: 19, // Gap of 10px between slides
    slidesPerGroup: 1, // Group slides by 4 (for better looping behavior)
    slidesOffsetAfter: 100,
    slidesOffsetbefore: 100,
    //setWrapperSize: true,

    // Navigation arrows
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
})

swiper.enable()
