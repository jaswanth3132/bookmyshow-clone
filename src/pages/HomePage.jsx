import { Link } from 'react-router-dom';
import Carousel from '../components/common/Carousel';
import MovieCard from '../components/movies/MovieCard';
import EventCard from '../components/events/EventCard';
import { movies, getNowShowing, getComingSoon } from '../data/movies';
import { events, eventCategories } from '../data/events';
import heroBanner1 from '../assets/images/hero_banner_1_1770146002638.png';
import heroBanner2 from '../assets/images/hero_banner_2_1770146016918.png';
import './HomePage.css';

const HomePage = () => {
    const nowShowing = getNowShowing();
    const comingSoon = getComingSoon();

    const heroSlides = [
        {
            image: heroBanner1,
            title: "Experience Cinema Like Never Before",
            subtitle: "Book tickets for the latest blockbusters in IMAX, 4DX, and Dolby Atmos",
            cta: "Explore Now"
        },
        {
            image: heroBanner2,
            title: "Your Entertainment Hub",
            subtitle: "Movies, Concerts, Sports, Theater - All in one place",
            cta: "Book Now"
        }
    ];

    return (
        <div className="home-page">
            {/* Hero Carousel */}
            <section className="hero-section">
                <Carousel slides={heroSlides} autoPlayInterval={6000} />
            </section>

            {/* Recommended Movies */}
            <section className="section section-movies">
                <div className="container">
                    <div className="section-header">
                        <h2 className="section-title">Recommended Movies</h2>
                        <Link to="/movies" className="see-all-link">See All →</Link>
                    </div>
                    <div className="movies-grid">
                        {movies.slice(0, 5).map(movie => (
                            <MovieCard key={movie.id} movie={movie} />
                        ))}
                    </div>
                </div>
            </section>

            {/* Now Showing */}
            <section className="section section-movies">
                <div className="container">
                    <div className="section-header">
                        <h2 className="section-title">Now Showing</h2>
                        <Link to="/movies" className="see-all-link">See All →</Link>
                    </div>
                    <div className="movies-grid">
                        {nowShowing.map(movie => (
                            <MovieCard key={movie.id} movie={movie} />
                        ))}
                    </div>
                </div>
            </section>

            {/* Coming Soon */}
            <section className="section section-coming-soon">
                <div className="container">
                    <div className="section-header">
                        <h2 className="section-title section-title-light">Coming Soon</h2>
                        <Link to="/movies?filter=coming-soon" className="see-all-link light">See All →</Link>
                    </div>
                    <div className="movies-grid">
                        {comingSoon.map(movie => (
                            <MovieCard key={movie.id} movie={movie} />
                        ))}
                    </div>
                </div>
            </section>

            {/* Events Categories */}
            <section className="section section-categories">
                <div className="container">
                    <h2 className="section-title">The Best of Live Events</h2>
                    <div className="categories-grid">
                        {eventCategories.map(category => (
                            <Link
                                key={category.id}
                                to={`/events?category=${category.name.toLowerCase()}`}
                                className="category-card"
                            >
                                <span className="category-icon">{category.icon}</span>
                                <span className="category-name">{category.name}</span>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Events */}
            <section className="section section-events">
                <div className="container">
                    <div className="section-header">
                        <h2 className="section-title">Events & Experiences</h2>
                        <Link to="/events" className="see-all-link">See All →</Link>
                    </div>
                    <div className="events-grid">
                        {events.map(event => (
                            <EventCard key={event.id} event={event} />
                        ))}
                    </div>
                </div>
            </section>

            {/* Offers Banner */}
            <section className="section section-offers">
                <div className="container">
                    <div className="offer-banner">
                        <div className="offer-content">
                            <h3 className="offer-title">Exclusive Offers Just for You!</h3>
                            <p className="offer-text">Get up to 20% off on movie tickets every Wednesday</p>
                            <button className="btn btn-primary btn-lg">View Offers</button>
                        </div>
                        <div className="offer-graphic">
                            <div className="offer-circle">
                                <span className="offer-discount">20%</span>
                                <span className="offer-label">OFF</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Premiere Section */}
            <section className="section section-premiere">
                <div className="container">
                    <div className="premiere-banner">
                        <div className="premiere-content">
                            <span className="premiere-badge">STREAM</span>
                            <h3 className="premiere-title">Premiere</h3>
                            <p className="premiere-text">Watch new movies at home, the day they release!</p>
                            <p className="premiere-subtext">
                                Stream the latest releases at ₹149 each. Catch the newest movies before they hit streaming platforms.
                            </p>
                            <button className="btn btn-secondary btn-lg">Know More</button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default HomePage;
