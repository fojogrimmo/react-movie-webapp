# 🎬 Movie Explorer

A modern web application to search and discover movies using [The Movie Database (TMDb)](themoviedb.org) API.

Built with React + TailwindCSS.

## ⚙️ Tech Stack

- React (Vite) – component-based frontend

- TailwindCSS – modern utility-first styling

- React Hooks – state management & side effects

- react-use – debounce hook for optimized searching

- TMDb API – movie data (titles, posters, ratings, etc.)

## Features

- Search movies in real-time with debounce (optimized API calls)

- Popular movies displayed by default

- Movie cards with poster, rating, release year and language

- Responsive design with TailwindCSS

- Loading spinner and error handling

- Modern UI/UX with gradients, scroll animations, and custom styles

## Setup & Installation

1. Clone the repository

```
git clone https://github.com/yourusername/react-movie-webapp.git
cd react-movie-webapp
```

2. Install dependencies

```
 npm install
```

3. Create a .env file in the root directory and add your TMDb API key:

```
VITE_TMDB_API_KEY=your_api_key_here
```

4. Run the app

```
npm run dev
```
