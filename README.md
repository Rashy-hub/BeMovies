# Movie Swiper Application - BEMOVIES

This is a Movie Swiper application that allows users to search for movies, view the latest movies, and browse movies by genre using Swiper.js for a smooth and responsive UI experience.

## Features

-   **Search Functionality**: Users can search for movies by entering keywords in the search input.
-   **Latest Movies**: Displays the latest movies using a Swiper component.
-   **Genre Browsing**: Users can browse movies by genre using a Swiper component.
-   **Lazy Loading**: Images are loaded lazily to improve performance.
-   **Responsive Design**: The application is responsive and adjusts the number of slides per view based on the screen size.
-   **Infinite Scrolling**: Swipers load more slides when the user reaches the end of the current slides.
-   **API Integration**: The application fetches movie data from an external API.
-   **Debounced API Calls**: Prevents multiple rapid API calls to avoid duplicate requests.
-   **Error Handling**: Basic error handling to manage API call failures.

## TODOs

-   **Login/Signup PoPup** : Show a connection popup
-   **On Hover Card** : Show detailed information of a movie when hover
-   **Error Display**: Improve error handling and display user-friendly error messages.
-   **Improve UI/UX**: Enhance the overall user interface and user experience.
-   **Favorite Movies**: Allow users to mark movies as favorites and view their favorite list.
-   **Accessibility**: Improve accessibility features for better support of screen readers and keyboard navigation.
-   **Code Optimization**: Refactor and optimize the code for better performance and maintainability.
-   **Configuration Management**: Externalize API keys and other configurations for better security and manageability.
-   **Documentation**: Improve project documentation.
-   **Deployment**: Set up static sites deployement on render.com

## Setup

1. Clone the repository:

    ```bash
    git clone https://github.com/Rashy-hub/BeMovies.git .
    ```

2. Create a `./utils` folder and add your API key into `api.json`:

    ```json
    {
        "apiKey": "YOUR_API_KEY",
        "bearer": "YOUR_BEARER"
    }
    ```

3. Open your browser and navigate to `http://localhost:3000`.

## Usage

-   Enter a movie name in the search bar and click the search button to find movies. This will display the hidden search section
-   Browse the latest movies and movies by genre using the Swiper components.
-   Click on movie posters to view more details (to be implemented).

## Contributing

Contributions are welcome! Please open an issue or submit a pull request with your changes.

## License

This project is licensed under the MIT License.
