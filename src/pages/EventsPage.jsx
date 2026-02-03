import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import EventCard from '../components/events/EventCard';
import { events, eventCategories } from '../data/events';
import './EventsPage.css';

const EventsPage = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const categoryParam = searchParams.get('category') || 'all';
    const [selectedCategory, setSelectedCategory] = useState(categoryParam);

    const handleCategoryChange = (category) => {
        setSelectedCategory(category);
        if (category === 'all') {
            searchParams.delete('category');
        } else {
            searchParams.set('category', category);
        }
        setSearchParams(searchParams);
    };

    const filteredEvents = selectedCategory === 'all'
        ? events
        : events.filter(e => e.category.toLowerCase() === selectedCategory.toLowerCase());

    return (
        <div className="events-page">
            {/* Hero */}
            <div className="events-hero">
                <div className="container">
                    <h1 className="events-title">Events & Experiences</h1>
                    <p className="events-subtitle">Discover concerts, theater shows, comedy nights, and more!</p>
                </div>
            </div>

            {/* Categories */}
            <div className="events-categories">
                <div className="container">
                    <div className="category-tabs">
                        <button
                            className={`category-tab ${selectedCategory === 'all' ? 'active' : ''}`}
                            onClick={() => handleCategoryChange('all')}
                        >
                            All Events
                        </button>
                        {eventCategories.map(cat => (
                            <button
                                key={cat.id}
                                className={`category-tab ${selectedCategory === cat.name.toLowerCase() ? 'active' : ''}`}
                                onClick={() => handleCategoryChange(cat.name.toLowerCase())}
                            >
                                <span className="tab-icon">{cat.icon}</span>
                                {cat.name}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Events Grid */}
            <div className="events-content">
                <div className="container">
                    {filteredEvents.length > 0 ? (
                        <>
                            <p className="results-count">{filteredEvents.length} Events found in Mumbai</p>
                            <div className="events-grid-large">
                                {filteredEvents.map(event => (
                                    <EventCard key={event.id} event={event} />
                                ))}
                            </div>
                        </>
                    ) : (
                        <div className="no-events">
                            <span className="no-events-icon">🎭</span>
                            <h3>No events found</h3>
                            <p>We couldn&apos;t find any events in this category. Try another category!</p>
                            <button
                                className="btn btn-primary"
                                onClick={() => handleCategoryChange('all')}
                            >
                                View All Events
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Featured Section */}
            <div className="featured-section">
                <div className="container">
                    <h2 className="section-title section-title-light">Why Book with Us?</h2>
                    <div className="features-grid">
                        <div className="feature-card">
                            <div className="feature-icon">🎫</div>
                            <h3>Instant Confirmation</h3>
                            <p>Get your tickets confirmed immediately after booking</p>
                        </div>
                        <div className="feature-card">
                            <div className="feature-icon">💳</div>
                            <h3>Secure Payments</h3>
                            <p>100% secure payment gateway with multiple options</p>
                        </div>
                        <div className="feature-card">
                            <div className="feature-icon">📱</div>
                            <h3>Mobile Tickets</h3>
                            <p>Show your e-ticket on phone for hassle-free entry</p>
                        </div>
                        <div className="feature-card">
                            <div className="feature-icon">🏆</div>
                            <h3>Best Prices</h3>
                            <p>Guaranteed lowest prices with exclusive offers</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EventsPage;
