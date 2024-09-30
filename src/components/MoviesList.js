// JavaScript source code
// src/components/MoviesList.js
//TMDB API connection

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './MoviesList.css'; //styles for your component

const MoviesList = () => {
    const [movies, setMovies] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [error, setError] = useState('');
    const [cartItems, setCartItems] = useState(() => {
        return JSON.parse(localStorage.getItem('cartItems')) || [];
    });

    const API_KEY = 'c993109c1eb6e2175d5b2d6945fcb177'; //  TMDB API key

    useEffect(() => {
        // popular movies on initial load
        const fetchMovies = async () => {
            try {
                const response = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`);
                setMovies(response.data.results);
            } catch (err) {
                setError('Failed to fetch movies.');
            }
        };

        fetchMovies();
    }, [API_KEY]);

    useEffect(() => {
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }, [cartItems]);

    const handleSearch = async () => {
        if (!searchQuery) return;
        try {
            const response = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${searchQuery}`);
            setMovies(response.data.results);
            setError('');
        } catch (err) {
            setError('Failed to fetch movies.');
        }
    };

    const handleAddToCart = (movie) => {
        if (!cartItems.includes(movie.title)) {
            const updatedCart = [...cartItems, movie.title];
            setCartItems(updatedCart);
            localStorage.setItem('cartItems', JSON.stringify(updatedCart)); // Store updated cart in localStorage
        }
    };

    //Movies retrieved from TMDB API
    return (
        <div>
            <h1>Popular Movies</h1>
            <div>
                <div className="search-container">
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search for a movie"
                    />
                    <button onClick={handleSearch}>Search</button>
                </div>
            </div>
            
            <div className="movie-grid">
                {movies.map((movie) => (
                    <div className="movie-card" key={movie.id}>
                        <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
                        <h2>{movie.title}</h2>
                        <p>Rating: {movie.vote_average}</p>
                        <button onClick={() => handleAddToCart(movie)}>Add to Cart</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MoviesList;