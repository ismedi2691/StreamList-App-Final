// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import StreamList from './components/StreamList';
import Movies from './components/Movies';
import Cart from './components/Cart';
import About from './components/About';
import WatchList from './components/WatchList';
import './App.css';
import MoviesList from './components/MoviesList'; // imported the new component to include axios

const App = () => {
    const [setMovies] = useState([]);
    const [cartItems, setCartItems] = useState([]);

    const handleAddMovie = (movie) => {
        setMovies((prevMovies) => [...prevMovies, movie]);
    };

    // Adding items to cart with duplicate check
    const handleAddToCart = (item) => {
        if (cartItems.includes(item)) {
            return true; // Item is already in cart
        } else {
            setCartItems((prevItems) => [...prevItems, item]);
            return false; // Item was added
        }
    };

    // Removing items in cart
    const handleRemoveFromCart = (itemToRemove) => {
        setCartItems((prevItems) => prevItems.filter(item => item !== itemToRemove));
    };

    const handleClearCart = () => {
        setCartItems([]);
    };

     const onRemoveFromCart = (item) => {
        setCartItems(cartItems.filter(cartItem => cartItem !== item));
    };

    return (
        <Router>
            <nav>
              
                <ul>
                    <li>
                        <Link to="/">
                            <span className="material-icons">home</span> Home
                        </Link>
                    </li>
                    <li>
                        <Link to="/movies">
                            <span className="material-icons">movie</span> Movies
                        </Link>
                    </li>
                    <li>
                        <Link to="/movies-list">
                            <span className="material-icons">star</span> Popular Movies</Link> {/* New link */}
                    </li>
                    <li>
                        <Link to="/watchlist">
                            <span class="material-icons">play_circle</span> Watch List
                        </Link>
                    </li>
                    <li>
                        <Link to="/cart">
                            <span className="material-icons">shopping_cart</span> Cart
                            {cartItems.length > 0 && (
                                <span className="cart-count">{cartItems.length}</span>
                            )}
                        </Link>
                    </li>
                   
                </ul>
            </nav>
          
            <Routes>
                <Route path="/" element={<StreamList onAddMovie={handleAddMovie} onAddToCart={handleAddToCart} />} />
                <Route path="/movies" element={<Movies onAddToCart={handleAddToCart} />} />
                <Route path="/cart" element={<Cart cartItems={cartItems} onRemoveFromCart={handleRemoveFromCart} />} />
                <Route path="/about" element={<About />} />
                <Route path="/cart" element={<Cart cartItems={cartItems} onRemoveFromCart={handleRemoveFromCart} onClearCart={handleClearCart} />} />
                <Route path="/watchlist" element={<WatchList cartItems={cartItems} onClearCart={handleClearCart} />} />
                <Route path="/movies-list" element={<MoviesList />} /> {/* New route */}
            </Routes>
        </Router>
    );
};

export default App;