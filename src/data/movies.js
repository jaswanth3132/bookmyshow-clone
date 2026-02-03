// Movie posters
import moviePoster1 from '../assets/images/movie_poster_1_1770145826751.png';
import moviePoster2 from '../assets/images/movie_poster_2_1770145840641.png';
import moviePoster3 from '../assets/images/movie_poster_3_1770145854460.png';
import moviePoster4 from '../assets/images/movie_poster_4_1770145868494.png';
import moviePoster5 from '../assets/images/movie_poster_5_1770145881546.png';
import moviePoster6 from '../assets/images/movie_poster_6_1770145893214.png';
import moviePoster7 from '../assets/images/movie_poster_7_1770145906569.png';
import moviePoster8 from '../assets/images/movie_poster_8_1770145921147.png';

export const movies = [
    {
        id: 1,
        title: "Jalwa: The Heat",
        poster: moviePoster1,
        rating: 8.5,
        votes: "125K",
        genres: ["Action", "Thriller"],
        language: "Hindi",
        format: ["2D", "IMAX"],
        certification: "U/A",
        duration: "2h 35m",
        releaseDate: "2026-02-07",
        synopsis: "A fearless cop takes on the city's most dangerous crime syndicate in this explosive action thriller.",
        director: "Rohit Shetty",
        cast: ["Arjun Kapoor", "Disha Patani", "Suniel Shetty"],
        isNowShowing: true,
        isComingSoon: false
    },
    {
        id: 2,
        title: "Tere Ishq Mein",
        poster: moviePoster2,
        rating: 8.2,
        votes: "98K",
        genres: ["Romance", "Drama"],
        language: "Hindi",
        format: ["2D"],
        certification: "U",
        duration: "2h 20m",
        releaseDate: "2026-02-14",
        synopsis: "A timeless love story set against the backdrop of the majestic Taj Mahal.",
        director: "Karan Johar",
        cast: ["Ranveer Singh", "Alia Bhatt"],
        isNowShowing: true,
        isComingSoon: false
    },
    {
        id: 3,
        title: "Neon Chakra",
        poster: moviePoster3,
        rating: 9.1,
        votes: "210K",
        genres: ["Sci-Fi", "Action"],
        language: "Hindi",
        format: ["2D", "3D", "IMAX"],
        certification: "U/A",
        duration: "2h 45m",
        releaseDate: "2026-02-21",
        synopsis: "In a futuristic India, a superhero rises to protect the nation from cyber threats.",
        director: "S.S. Rajamouli",
        cast: ["Prabhas", "Deepika Padukone"],
        isNowShowing: false,
        isComingSoon: true
    },
    {
        id: 4,
        title: "College Ke Masti",
        poster: moviePoster4,
        rating: 7.8,
        votes: "78K",
        genres: ["Comedy", "Drama"],
        language: "Hindi",
        format: ["2D"],
        certification: "U",
        duration: "2h 15m",
        releaseDate: "2026-01-31",
        synopsis: "A hilarious journey of college friends navigating life, love, and everything in between.",
        director: "Raj & DK",
        cast: ["Varun Dhawan", "Sara Ali Khan", "Sidharth Malhotra"],
        isNowShowing: true,
        isComingSoon: false
    },
    {
        id: 5,
        title: "Bhoot Bangla",
        poster: moviePoster5,
        rating: 8.0,
        votes: "85K",
        genres: ["Horror", "Thriller"],
        language: "Hindi",
        format: ["2D"],
        certification: "A",
        duration: "2h 10m",
        releaseDate: "2026-02-28",
        synopsis: "Some secrets are never buried. A family moves into a haunted mansion with dark history.",
        director: "Vikram Bhatt",
        cast: ["Vicky Kaushal", "Bhumi Pednekar"],
        isNowShowing: false,
        isComingSoon: true
    },
    {
        id: 6,
        title: "Victory Chord",
        poster: moviePoster6,
        rating: 9.3,
        votes: "320K",
        genres: ["Sports", "Drama", "Biography"],
        language: "Hindi",
        format: ["2D", "IMAX"],
        certification: "U",
        duration: "2h 50m",
        releaseDate: "2026-01-26",
        synopsis: "The inspiring true story of India's greatest cricketer and his journey to glory.",
        director: "Kabir Khan",
        cast: ["Rajkummar Rao", "Anushka Sharma"],
        isNowShowing: true,
        isComingSoon: false
    },
    {
        id: 7,
        title: "Samrat: The Warrior King",
        poster: moviePoster7,
        rating: 9.0,
        votes: "275K",
        genres: ["Historical", "Action", "Epic"],
        language: "Hindi",
        format: ["2D", "3D", "IMAX"],
        certification: "U/A",
        duration: "3h 10m",
        releaseDate: "2026-03-15",
        synopsis: "An epic tale of valor and sacrifice as a warrior king defends his kingdom against invaders.",
        director: "Sanjay Leela Bhansali",
        cast: ["Hrithik Roshan", "Kareena Kapoor"],
        isNowShowing: false,
        isComingSoon: true
    },
    {
        id: 8,
        title: "Rishton Ke Dhaage",
        poster: moviePoster8,
        rating: 8.4,
        votes: "145K",
        genres: ["Family", "Drama"],
        language: "Hindi",
        format: ["2D"],
        certification: "U",
        duration: "2h 25m",
        releaseDate: "2026-02-10",
        synopsis: "A heartwarming story of family bonds, traditions, and the threads that hold us together.",
        director: "Karan Johar",
        cast: ["Shah Rukh Khan", "Kajol", "Jaya Bachchan"],
        isNowShowing: true,
        isComingSoon: false
    }
];

export const getNowShowing = () => movies.filter(movie => movie.isNowShowing);
export const getComingSoon = () => movies.filter(movie => movie.isComingSoon);
export const getMovieById = (id) => movies.find(movie => movie.id === parseInt(id));
