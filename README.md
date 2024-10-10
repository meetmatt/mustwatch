# Must Watch

## WIP

It's a pet project for learning React and Python. It's a web (+ mobile app and a Telegram bot later, if I don't drop the idea at the web stage) called "Must Watch" (not registered trade mark, none of the rights reserved, it's just a code name). It's a 100% FOSS and requires self-hosting, so you may run it yourself if you find it useful. Note that you'll need to register a personal TMDB account and request an API key.

The application is a movie bookmarking tool which allows users to quickly add a movie to the list without spending more than 10 seconds. The flow is the following: Open Must Watch app -> Login/Signup -> Add movie -> Enter name -> Wait for the TMDB search results -> Choose the movie/series from the list -> Add -> The movie is added to your list. The application will then collect all additional meta data in the background, including data from TMDB, wikipedia, image/video databases, review scores, links to trailers on youtube, and other sources. If configured the app will also find the actual movie online on one of the licensed streaming services or "elsewhere" (only with a user's consent to search it elsewhere). The app will store all movies in a local database that allows searching and filtering without reaching any external service. The TMDB data will be stored for no longer than 6 months (according to their policy), and there will be a daily cronjob that will look for cached records that are about to expire and refetch them from TMDB API.

## Tech stack

### Frontend

- Node v22.8
- React v18.3
- TypeScript v5.6
- Bun v1.1
- Vite v5.4
- SWC
- ESLint v9.12

### Backend

- Python v3.12
- FastAPI v0.115
- Uvicorn v0.31
- Postgres v16.4

### Infrastructure

- Coolify
- Docker
- LetsEncrypt
