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
export function resultFetchData(searchValue) {
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization:
                'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiOTBjOTI1NzdhYjUyZTUxNThmYWU0MGYxMDdkMzBjOCIsInN1YiI6IjY2NzE5MzgzZTA3ZmFmZjAzNTcyZWZhNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ztStLJqy8UtW95RrD6ie8sIpBORWWgbdk32o9Zxx9HQ',
        },
    }

    fetch(
        `https://api.themoviedb.org/3/search/movie?query=${searchValue}&include_adult=false&language=en-US&page=1`,
        options
    )
        .then((response) => response.json())
        .then((response) => {
            const filtered_response = response.results.filter(
                (movie) =>
                    movie.poster_path !== null &&
                    movie.poster_path !== '' &&
                    movie.poster_path !== 'null'
            )
            console.log(filtered_response)
            updateResultImage(filtered_response)
        })
        .catch((err) => console.error(err))
}
