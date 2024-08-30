const likedMovies = [];
const dislikedMovies = [];

// Populate dropdown menu with all the available genres
const populateGenreDropdown = (genres) => {
    const select = document.getElementById('genres')

    for (const genre of genres) {
        let option = document.createElement("option");
        option.value = genre.id;
        option.text = genre.name;
        select.appendChild(option);
    }
};

// Returns the current genre selection from the dropdown menu
const getSelectedGenre = () => {
    const selectedGenre = document.getElementById('genres').value;
    return selectedGenre;
};

// Displays the like and dislike buttons on the page
const showBtns = () => {
    const btnDiv = document.getElementById('likeOrDislikeBtns');
    btnDiv.removeAttribute('hidden');
};

// Clear the current movie from the screen
const clearCurrentMovie = () => {
    const moviePosterDiv = document.getElementById('moviePoster');
    const movieTextDiv = document.getElementById('movieText');
    const movieDetails = [moviePosterDiv, movieTextDiv];
    movieDetails.forEach(e => e.innerHTML = '');
};

const removeItem = (id, list) => {
    if (list) {
        const index = likedMovies.findIndex(e => e.id === id)
        likedMovies.splice(index, 1);
    } else {
        const index = dislikedMovies.findIndex(e => e.id === id)
        dislikedMovies.splice(index, 1);
    }       
    refreshLists();
};

const refreshLists = () => {
    const likedMovieList = likedMovies.map(e => `<li id=${e.id}><a href="https://www.imdb.com/title/${e.imdb}">${e.title}</a><button class="remove" onclick="removeItem(${e.id},true);">X</button></li>`).join('');  
    likedMovieList.length > 0 ? document.getElementById('liked').removeAttribute('hidden') : document.getElementById('liked').setAttribute('hidden', '');
    document.getElementById('likedList').innerHTML = likedMovieList; 

    const dislikedMovieList = dislikedMovies.map(e => `<li id=${e.id}><a href="https://www.imdb.com/title/${e.imdb}">${e.title}</a><button class="remove" onclick="removeItem(${e.id},false);">X</button></li>`).join('');    
    dislikedMovieList.length > 0 ? document.getElementById('disliked').removeAttribute('hidden') : document.getElementById('disliked').setAttribute('hidden', '');
    document.getElementById('dislikedList').innerHTML = dislikedMovieList;
};

// After liking a movie, clears the current movie from the screen and gets another random movie
const likeMovie = ({title, id, imdb_id}) => {
    clearCurrentMovie();
    showRandomMovie();

    // If movie has been disliked previously remove it from disliked list
    if(dislikedMovies.find(e => e.id === id)) {
        removeItem(id, false);
        refreshLists();       
    }

    // If movie has already been liked then return
    if(likedMovies.find(e => e.id === id)) return;

    likedMovies.push({
        title: title, 
        id: id,
        imdb: imdb_id
    });
    refreshLists();
};

// After disliking a movie, clears the current movie from the screen and gets another random movie
const dislikeMovie = ({title, id, imdb_id}) => {
    clearCurrentMovie();
    showRandomMovie();

    // If movie has been liked previously remove it from liked list
    if(likedMovies.find(e => e.id === id)) {
        removeItem(id, true);
        refreshLists();       
    }

    // If movie has already been disliked then return
    if(dislikedMovies.find(e => e.id === id)) return;

    dislikedMovies.push({
        title: title, 
        id: id,
        imdb: imdb_id
    });
    refreshLists();
};

// Create HTML for movie poster
const createMoviePoster = (posterPath) => {
    const moviePosterUrl = `https://image.tmdb.org/t/p/original/${posterPath}`;

    const posterImg = document.createElement('img');
    posterImg.setAttribute('src', moviePosterUrl);
    posterImg.setAttribute('id', 'moviePoster');
  
    return posterImg;
};

// Create HTML for movie title
const createMovieTitle = (title) => {
    const titleHeader = document.createElement('h1');
    titleHeader.setAttribute('id', 'movieTitle');
    titleHeader.innerHTML = title;
  
    return titleHeader;
};

// Create HTML for movie overview
const createMovieOverview = (overview) => {
    const overviewParagraph = document.createElement('p');
    overviewParagraph.setAttribute('id', 'movieOverview');
    overviewParagraph.innerHTML = overview;
  
    return overviewParagraph;
};

// Create HTML for movie release date
const createMovieRelease = (date) => {
    const locateDate = new Date(date).toLocaleDateString();
    const releaseInfo = document.createElement('p');
    releaseInfo.setAttribute('id', 'movieReleaseDate');
    releaseInfo.innerHTML = "Release date: " + locateDate;
  
    return releaseInfo;
};

// Create HTML for movie genres
const createMovieGenres  = (genres) => {
    const genresList = genres.join(",");

    const genresInfo = document.createElement('p');
    genresInfo.setAttribute('id', 'movieReleaseDate');
    genresInfo.innerHTML = "Genres: " + genresList;
  
    return genresInfo;
};

// Returns a random movie from the first page of movies
const getRandomMovie = (movies) => {
    const randomIndex = Math.floor(Math.random() * movies.length);
    const randomMovie = movies[randomIndex];
    return randomMovie;
};

// Uses the DOM to create HTML to display the movie
const displayMovie = (movieInfo) => {
    const moviePosterDiv = document.getElementById('moviePoster');
    const movieTextDiv = document.getElementById('movieText');
    const likeBtn = document.getElementById('likeBtn');
    const dislikeBtn = document.getElementById('dislikeBtn');
  
    // Create HTML content containing movie info
    const moviePoster = createMoviePoster(movieInfo.poster_path);
    const movieRelease = createMovieRelease(movieInfo.release_date);
    const titleHeader = createMovieTitle(movieInfo.title);
    const overviewText = createMovieOverview(movieInfo.overview);
  
    // Append title, poster, and overview to page
    moviePosterDiv.appendChild(moviePoster);
    movieTextDiv.appendChild(titleHeader);
    movieTextDiv.appendChild(movieRelease);
    movieTextDiv.appendChild(overviewText);
  
    showBtns();
    likeBtn.onclick = () => likeMovie(movieInfo);
    dislikeBtn.onclick = () => dislikeMovie(movieInfo);

    console.log(movieInfo);
};