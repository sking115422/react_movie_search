import { useEffect, useState } from 'react';

import MovieCard from './MovieCard.jsx';
import SearchIcon from './search.svg';
import './App.css';



const API_KEY = 50915450

const API_URL = `http://www.omdbapi.com?apikey=${API_KEY}`

const App = () => {

    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    const searchMovies = async (title) => {
        const response = await fetch(`${API_URL}&s=${title}`);
        const data = await response.json();

        // console.log(data.Search);
        setMovies(data.Search)
    }

    useEffect(() => {
        searchMovies('Batman');
    }, []);

    return (
        <div className='app'>
            <h1> MovieTime</h1>

            <div className='search'>
                <input 
                    placeholder='Search For Movies'
                    value = {searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />

                <img
                    src={SearchIcon}
                    alt="Search"
                    onClick = {() => {searchMovies(searchTerm)}}
                />
            </div>

            {
                movies?.length > 0
                    ? (
                        <div className='container'>
                            {movies.map((movie) => (
                                <MovieCard movie = {movie}/>
                            ))}
                        </div>
                    ) : (
                        <div className='empty'>
                            <h2>no movies found</h2>
                        </div>
                    )
            }

        </div>
    );
}

export default App;