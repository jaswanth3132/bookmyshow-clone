import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import MovieCard from '../components/movies/MovieCard';
import { movies } from '../data/movies';
import './MoviesPage.css';

const MoviesPage = () => {
    const [searchParams] = useSearchParams();
    const searchQuery = searchParams.get('search') || '';
    const filterType = searchParams.get('filter') || 'all';

    const [selectedLanguage, setSelectedLanguage] = useState('all');
    const [selectedGenre, setSelectedGenre] = useState('all');
    const [selectedFormat, setSelectedFormat] = useState('all');
    const [sortBy, setSortBy] = useState('popularity');

    const languages = ['all', 'Hindi', 'English', 'Telugu', 'Tamil', 'Malayalam', 'Kannada'];
    const genres = ['all', 'Action', 'Comedy', 'Drama', 'Horror', 'Romance', 'Sci-Fi', 'Sports', 'Thriller'];
    const formats = ['all', '2D', '3D', 'IMAX', '4DX'];

    const filteredMovies = useMemo(() => {
        let result = [...movies];

        // Filter by search query
        if (searchQuery) {
            result = result.filter(movie =>
                movie.title.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        // Filter by coming soon / now showing
        if (filterType === 'coming-soon') {
            result = result.filter(movie => movie.isComingSoon);
        } else if (filterType === 'now-showing') {
            result = result.filter(movie => movie.isNowShowing);
        }

        // Filter by language
        if (selectedLanguage !== 'all') {
            result = result.filter(movie => movie.language === selectedLanguage);
        }

        // Filter by genre
        if (selectedGenre !== 'all') {
            result = result.filter(movie => movie.genres.includes(selectedGenre));
        }

        // Filter by format
        if (selectedFormat !== 'all') {
            result = result.filter(movie => movie.format.includes(selectedFormat));
        }

        // Sort
        if (sortBy === 'rating') {
            result.sort((a, b) => b.rating - a.rating);
        } else if (sortBy === 'release') {
            result.sort((a, b) => new Date(b.releaseDate) - new Date(a.releaseDate));
        }

        return result;
    }, [searchQuery, filterType, selectedLanguage, selectedGenre, selectedFormat, sortBy]);

    const clearFilters = () => {
        setSelectedLanguage('all');
        setSelectedGenre('all');
        setSelectedFormat('all');
        setSortBy('popularity');
    };

    return (
        <div className="movies-page">
            {/* Page Header */}
            <div className="page-header">
                <div className="container">
                    <h1 className="page-title">
                        {filterType === 'coming-soon' ? 'Coming Soon' :
                            filterType === 'now-showing' ? 'Now Showing' :
                                searchQuery ? `Search Results for "${searchQuery}"` : 'Movies in Mumbai'}
                    </h1>
                </div>
            </div>

            {/* Filters */}
            <div className="filters-section">
                <div className="container">
                    <div className="filters-wrapper">
                        {/* Language Filter */}
                        <div className="filter-group">
                            <label className="filter-label">Language</label>
                            <div className="filter-options">
                                {languages.map(lang => (
                                    <button
                                        key={lang}
                                        className={`filter-chip ${selectedLanguage === lang ? 'active' : ''}`}
                                        onClick={() => setSelectedLanguage(lang)}
                                    >
                                        {lang === 'all' ? 'All Languages' : lang}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Genre Filter */}
                        <div className="filter-group">
                            <label className="filter-label">Genre</label>
                            <div className="filter-options">
                                {genres.map(genre => (
                                    <button
                                        key={genre}
                                        className={`filter-chip ${selectedGenre === genre ? 'active' : ''}`}
                                        onClick={() => setSelectedGenre(genre)}
                                    >
                                        {genre === 'all' ? 'All Genres' : genre}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Format Filter */}
                        <div className="filter-group">
                            <label className="filter-label">Format</label>
                            <div className="filter-options">
                                {formats.map(format => (
                                    <button
                                        key={format}
                                        className={`filter-chip ${selectedFormat === format ? 'active' : ''}`}
                                        onClick={() => setSelectedFormat(format)}
                                    >
                                        {format === 'all' ? 'All Formats' : format}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Sort & Clear */}
                        <div className="filter-actions">
                            <select
                                className="sort-select"
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                            >
                                <option value="popularity">Sort by Popularity</option>
                                <option value="rating">Sort by Rating</option>
                                <option value="release">Sort by Release Date</option>
                            </select>

                            <button className="clear-filters" onClick={clearFilters}>
                                Clear Filters
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Movies Grid */}
            <div className="movies-content">
                <div className="container">
                    {filteredMovies.length > 0 ? (
                        <>
                            <p className="results-count">{filteredMovies.length} Movies found</p>
                            <div className="movies-grid-large">
                                {filteredMovies.map(movie => (
                                    <MovieCard key={movie.id} movie={movie} />
                                ))}
                            </div>
                        </>
                    ) : (
                        <div className="no-results">
                            <svg viewBox="0 0 24 24" fill="currentColor">
                                <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
                            </svg>
                            <h3>No movies found</h3>
                            <p>Try adjusting your filters or search criteria</p>
                            <button className="btn btn-primary" onClick={clearFilters}>
                                Clear All Filters
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MoviesPage;
