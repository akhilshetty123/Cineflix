import React, { useState } from "react";
import "./Header.css";
import { Link, useNavigate } from "react-router-dom";

// Cards component to display movie details in a card format
const Cards = ({ movie }) => {
    const imageUrl = `https://image.tmdb.org/t/p/w300${movie.poster_path}`;

    return (
        <div className="card">
            <img className="card-image" src={imageUrl} alt={movie.title} />
            <div className="card-content">
                <h3 className="card-title">{movie.title}</h3>
                <p className="card-overview">{movie.overview}</p>
                <p className="card-info">Released: {movie.release_date}</p>
                <p className="card-info">Rating: {movie.vote_average}</p>
            </div>
        </div>
    );
};

const Header = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [movieList, setMovieList] = useState([]);
    const [error, setError] = useState(null);
    const [isSearched, setIsSearched] = useState(false); // Track if search button has been clicked

    const navigate = useNavigate(); // Get the navigate function from react-router-dom

    const handleInputChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const fetchSearchResults = () => {
        fetch(`https://api.themoviedb.org/3/search/movie?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US&query=${searchQuery}`)
            .then(res => res.json())
            .then(data => {
                setMovieList(data.results);
                setError(null);
                setIsSearched(true); // Update state to indicate search has been performed
            })
            .catch(error => {
                console.error("Error fetching search results:", error);
                setError("Error fetching search results. Please try again later.");
            });
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        if (searchQuery.trim() !== "") {
            fetchSearchResults();
        }
    };

    const handleGoBack = () => {
        navigate(-1); // Navigate back to the previous page
    };

    const handleRefresh = () => {
        window.location.reload(); // Refresh the page
    };

    return (
        <div className="header">
            {!isSearched && ( // Display header only if search has not been performed
                <div className="headerLeft">
                    <Link to="/"><img className="header__icon" src="/images/logo.jpeg" alt="Logo" /></Link>
                    <Link to="/movies/popular" style={{ textDecoration: "none" }}><span>Popular</span></Link>
                    <Link to="/movies/top_rated" style={{ textDecoration: "none" }}><span>Top Rated</span></Link>
                    <Link to="/movies/upcoming" style={{ textDecoration: "none" }}><span>Upcoming</span></Link>
                </div>
            )}
            <div className="headerRight">
                {!isSearched && ( // Display search bar only if search has not been performed
                    <form onSubmit={handleSearchSubmit}>
                        <input
                            type="text"
                            placeholder="Search movies..."
                            value={searchQuery}
                            onChange={handleInputChange}
                        />
                        <button type="submit">Search</button>
                    </form>
                )}
                {error && <p className="error-message">{error}</p>}
                {isSearched && movieList.length > 0 && ( // Render search results only if searched and there are results
                    <div className="movie-list">
                        {/* <button className="back-button" onClick={handleGoBack}>&lt; Back to Main Page</button> */}
                        <button className="refresh-button" onClick={handleRefresh}>Back</button>
                        <h2 className="list-title">SEARCH RESULTS</h2>
                        <div className="list-cards">
                            {movieList.map(movie => (
                                <Cards key={movie.id} movie={movie} />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Header;
