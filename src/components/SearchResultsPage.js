// SearchResultsPage.js
import React from "react";
import Cards from "./Cards";

const SearchResultsPage = ({ movieList }) => {
    return (
        <div className="search-results">
            <h2 className="list-title">SEARCH RESULTS</h2>
            <div className="list-cards">
                {movieList.map(movie => (
                    <Cards key={movie.id} movie={movie} />
                ))}
            </div>
        </div>
    );
};

export default SearchResultsPage;
