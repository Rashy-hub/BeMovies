const openLoginButton = document.getElementsByClassName('open-login-dialog')
const loginDialog = document.getElementById('login-dialog')
const closeButton = document.getElementById('login-close-button') // Using ID

const openDetailsButton = document.getElementsByClassName('open-details-dialog')
const detailsDialog = document.getElementById('movie-details')
const closeDetailsButton = document.getElementById('details-close-button')

export function loginHandler() {
    // Add event listeners to each button in the HTMLCollection
    for (let button of openLoginButton) {
        button.addEventListener('click', (event) => {
            event.preventDefault()
            // Change button text based on a condition
            if (button.textContent === 'Register') {
                button.textContent = 'Sign In'
            } else {
                button.textContent = 'Register'
            }
            loginDialog.showModal() // Open the dialog
        })
    }

    closeButton.addEventListener('click', () => {
        loginDialog.close() // Close the dialog
    })
}

export function movieDetailsHandler(info) {
    const image = document.querySelector('.movie-dialog__poster img')
    const name = document.querySelector('.movie-dialog__title')
    const date = document.querySelector('.movie-dialog__release-date')
    const note = document.querySelector('.movie-dialog__rating-value')
    const genre = document.querySelector('.movie-dialog__genre')
    const resume = document.querySelector('.movie-dialog__description')
    const cast = document.querySelector('.movie-dialog__cast-names')

    const detailsDialog = document.getElementById('movie-dialog')
    const closeDetailsButton = document.getElementById('movie-close-button')

    // Affichage des informations dans les champs
    if (info.poster_path) {
        image.src = `https://image.tmdb.org/t/p/w500${info.poster_path}`
        image.alt = `Poster of ${info.title}`
    } else {
        image.alt = 'No poster available' // Si aucune image n'est fournie
    }

    name.textContent = info.title || 'No title available'
    date.textContent = info.release_date
        ? new Date(info.release_date).getFullYear()
        : 'Release date not available'
    note.textContent = info.vote_average
        ? `${info.vote_average.toFixed(1)}`
        : 'No ratings available'

    // Gestion des genres (si aucun genre, on affiche "Unknown")
    genre.textContent =
        info.genres.length > 0
            ? info.genres.map((g) => g.name).join('/ ')
            : 'Unknown Genre'

    resume.textContent = info.overview || 'No description available'

    // Mise à jour du cast (si info.cast contient des données)
    cast.textContent =
        info.cast && info.cast.length > 0
            ? info.cast.join(', ')
            : 'No cast available'

    console.log('OPEN MODAL')
    // Affichage du modal
    detailsDialog.showModal()

    closeDetailsButton.addEventListener('click', () => {
        detailsDialog.close() // Fermer le modal
    })
}

/*        <dialog id="movie-details" class="movie-details">
                <img src="" alt="" class="image-movie" />
                <div class="detail-movie">
                    <h2 class="name-movie"></h2>
                    <p class="date-movie"></p>
                    <div class="note">
                        <img src="/assets/star.svg" alt="Etoile" />
                        <p class="note-movie"></p>
                    </div>
                    <p class="genre-movie"></p>
                    <p class="resume-movie"></p>
                    <p class="cast">CAST : <span class="cast-movie"></span></p>
                </div>
            </dialog> */
