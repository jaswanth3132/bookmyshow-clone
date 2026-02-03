import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { cities } from '../../data/theaters';
import './Header.css';

const Header = () => {
    const [isSearchFocused, setIsSearchFocused] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [showCityDropdown, setShowCityDropdown] = useState(false);
    const [selectedCity, setSelectedCity] = useState('Mumbai');
    const [activeDropdown, setActiveDropdown] = useState(null);
    const navigate = useNavigate();

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/movies?search=${encodeURIComponent(searchQuery)}`);
        }
    };

    const handleCitySelect = (city) => {
        setSelectedCity(city);
        setShowCityDropdown(false);
    };

    const navDropdowns = {
        movies: {
            title: 'Movies',
            items: [
                { label: 'Now Showing', link: '/movies?filter=now-showing' },
                { label: 'Coming Soon', link: '/movies?filter=coming-soon' },
                { label: 'Hindi', link: '/movies?language=hindi' },
                { label: 'English', link: '/movies?language=english' },
                { label: 'Telugu', link: '/movies?language=telugu' },
            ]
        },
        events: {
            title: 'Events',
            items: [
                { label: 'All Events', link: '/events' },
                { label: 'Music Shows', link: '/events?category=music' },
                { label: 'Comedy Shows', link: '/events?category=comedy' },
                { label: 'Workshops', link: '/events?category=workshop' },
            ]
        },
        sports: {
            title: 'Sports',
            items: [
                { label: 'Cricket', link: '/events?category=sports' },
                { label: 'Football', link: '/events?category=sports' },
                { label: 'Kabaddi', link: '/events?category=sports' },
            ]
        }
    };

    return (
        <header className="header">
            <div className="header-top">
                <div className="container">
                    <div className="header-content">
                        {/* Logo */}
                        <Link to="/" className="header-logo">
                            <span className="logo-book">book</span>
                            <span className="logo-my">my</span>
                            <span className="logo-show">show</span>
                        </Link>

                        {/* Search Bar */}
                        <form
                            className={`header-search ${isSearchFocused ? 'focused' : ''}`}
                            onSubmit={handleSearch}
                        >
                            <svg className="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                <circle cx="11" cy="11" r="8" />
                                <path d="M21 21l-4.35-4.35" />
                            </svg>
                            <input
                                type="text"
                                placeholder="Search for Movies, Events, Plays, Sports and Activities"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                onFocus={() => setIsSearchFocused(true)}
                                onBlur={() => setIsSearchFocused(false)}
                            />
                        </form>

                        {/* Right Section */}
                        <div className="header-right">
                            {/* City Selector */}
                            <div className="city-selector">
                                <button
                                    className="city-btn"
                                    onClick={() => setShowCityDropdown(!showCityDropdown)}
                                >
                                    <svg className="location-icon" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                                    </svg>
                                    {selectedCity}
                                    <svg className="chevron-icon" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M7 10l5 5 5-5z" />
                                    </svg>
                                </button>

                                {showCityDropdown && (
                                    <div className="city-dropdown">
                                        <div className="city-dropdown-header">Select City</div>
                                        <div className="city-list">
                                            {cities.map(city => (
                                                <button
                                                    key={city}
                                                    className={`city-option ${city === selectedCity ? 'active' : ''}`}
                                                    onClick={() => handleCitySelect(city)}
                                                >
                                                    {city}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Sign In Button */}
                            <button className="sign-in-btn">
                                Sign in
                            </button>

                            {/* Menu Icon */}
                            <button className="menu-btn">
                                <svg viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Navigation */}
            <nav className="header-nav">
                <div className="container">
                    <ul className="nav-list">
                        {/* Movies with dropdown */}
                        <li
                            className="nav-item has-dropdown"
                            onMouseEnter={() => setActiveDropdown('movies')}
                            onMouseLeave={() => setActiveDropdown(null)}
                        >
                            <Link to="/movies" className="nav-link active">Movies</Link>
                            {activeDropdown === 'movies' && (
                                <div className="nav-dropdown">
                                    {navDropdowns.movies.items.map((item, idx) => (
                                        <Link key={idx} to={item.link} className="nav-dropdown-item">
                                            {item.label}
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </li>
                        <li><Link to="/events" className="nav-link">Stream</Link></li>
                        {/* Events with dropdown */}
                        <li
                            className="nav-item has-dropdown"
                            onMouseEnter={() => setActiveDropdown('events')}
                            onMouseLeave={() => setActiveDropdown(null)}
                        >
                            <Link to="/events" className="nav-link">Events</Link>
                            {activeDropdown === 'events' && (
                                <div className="nav-dropdown">
                                    {navDropdowns.events.items.map((item, idx) => (
                                        <Link key={idx} to={item.link} className="nav-dropdown-item">
                                            {item.label}
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </li>
                        <li><Link to="/events" className="nav-link">Plays</Link></li>
                        {/* Sports with dropdown */}
                        <li
                            className="nav-item has-dropdown"
                            onMouseEnter={() => setActiveDropdown('sports')}
                            onMouseLeave={() => setActiveDropdown(null)}
                        >
                            <Link to="/events?category=sports" className="nav-link">Sports</Link>
                            {activeDropdown === 'sports' && (
                                <div className="nav-dropdown">
                                    {navDropdowns.sports.items.map((item, idx) => (
                                        <Link key={idx} to={item.link} className="nav-dropdown-item">
                                            {item.label}
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </li>
                        <li><Link to="/events" className="nav-link">Activities</Link></li>
                        <li><Link to="/" className="nav-link">Buzz</Link></li>
                    </ul>

                    <div className="nav-right">
                        <Link to="/" className="nav-link-secondary">ListYourShow</Link>
                        <Link to="/" className="nav-link-secondary">Corporates</Link>
                        <Link to="/" className="nav-link-secondary">Offers</Link>
                        <Link to="/" className="nav-link-secondary gift-cards">Gift Cards</Link>
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Header;

