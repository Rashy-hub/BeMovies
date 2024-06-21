function updateResultImage(response) {
    const resultsImages = document.querySelectorAll('.results__swiper__images')

    resultsImages.forEach((image, index) => {
        image.setAttribute(
            'src',
            `https://image.tmdb.org/t/p/original${response[index].poster_path}`
        )
    })
}
//Call Api handler
export function resultFetchData(searchValue, page) {
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization:
                'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiOTBjOTI1NzdhYjUyZTUxNThmYWU0MGYxMDdkMzBjOCIsInN1YiI6IjY2NzE5MzgzZTA3ZmFmZjAzNTcyZWZhNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ztStLJqy8UtW95RrD6ie8sIpBORWWgbdk32o9Zxx9HQ',
        },
    }
    console.log(encodeURIComponent(searchValue))
    fetch(
        `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(
            searchValue
        )}&include_adult=false&language=en-US&page=${page}`,
        options
    )
        .then((response) => response.json())
        .then((response) => {
            const filtered_response = response.results.filter((movie) => {
                if (movie.hasOwnProperty('poster_path')) {
                    // Now check for non-empty string and not null/undefined
                    return (
                        movie.poster_path !== null && movie.poster_path !== ''
                    )
                }
                // If the field doesn't exist, automatically exclude the movie
                return false
            })

            updateResultImage(filtered_response)
        })
        .catch((err) => console.error(err))
}
