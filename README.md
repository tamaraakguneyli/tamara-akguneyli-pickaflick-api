# PickaFlix Back End API

## Installation

### Clone the Repository

git clone https://github.com/tamaraakguneyli/tamara-akguneyli-pickaflix-api.git
cd tamara-akguneyli-tamara-akguneyli-pickaflix-api

### Install Dependencies

Ensure you have Node.js installed. Then, install project dependencies using npm:

npm install

### Basic .env Set-up

Please use `.env.sample` as a reference for building up your `.env` file locally. Make sure you provide an `API_KEY` in your `.env` file.

### Database Migration and Seeding

Use Knex to run migrations and seed data:

npm run db:migrate
npm run db:seed

## Starting the Server

To start the backend server, run:

npm start

The server will start running at http://localhost:3000.

## Endpoints

### GET /watchlist/:userId

- **HTTP Method:** GET
- **Parameters:** userId (User ID to fetch the watchlist for a specific user)
- **Example Response:**

[
{
"id": 1,
"title": "Movie Title",
"overview": "Movie overview...",
"poster_url": "https://example.com/poster.jpg",
"release_date": "2024-04-12"
},
{
"id": 2,
"title": "Another Movie",
"overview": "Another movie overview...",
"poster_url": "https://example.com/another-poster.jpg",
"release_date": "2024-04-15"
}
]

### POST /watchlist

- **HTTP Method:** POST
- **Parameters:**
  - userId (User ID of the user adding the media)
  - media (Media object to be added to the watchlist containing title, overview, release_date, poster_url, api_id)
- **Example Request Body:**

{
"userId": 1,
"media": {
"title": "New Movie",
"overview": "New movie overview...",
"release_date": "2024-04-20",
"poster_url": "https://example.com/new-movie.jpg",
"api_id": 12345
}
}

- **Example Response:**

{
"message": "Media added to watchlist successfully"
}

### PUT /watchlist/:mediaitemId

- **HTTP Method:** PUT
- **Parameters:** mediaitemId (ID of the media item to be moved back to the watchlist)
- **Example Response:**

{
"message": "Media moved back to watchlist successfully"
}

### PUT /watched/:mediaitemId

- **HTTP Method:** PUT
- **Parameters:** mediaitemId (ID of the media item to be marked as watched)
- **Example Response:**

{
"message": "Media marked as watched successfully"
}

### GET /watched/:userId

- **HTTP Method:** GET
- **Parameters:** userId (User ID to fetch the watched media for a specific user)
- **Example Response:**

[
{
"id": 1,
"title": "Watched Movie",
"overview": "Watched movie overview...",
"poster_url": "https://example.com/watched-poster.jpg",
"release_date": "2024-04-10"
}
]

### POST /user/register

- **HTTP Method:** POST
- **Parameters:**
  - username (String) - User's desired username.
  - email (String) - User's email address.
  - password (String) - User's chosen password.
- **Example Request Body:**

{
"username": "example_user",
"email": "user@example.com",
"password": "password123"
}

### POST /user/login

- **HTTP Method:** POST
- **Parameter:**
  - username (String) - User's username.
  - password (String) - User's password.
- **Example Request Body:**

{
"username": "example_user",
"password": "password123"
}

### GET /user

- **HTTP Method:** GET
- **Example Response:**

{
"id": 1,
"username": "example_user",
"email": "user@example.com"
}

## Front End App Repository

[Front End App Repository](https://github.com/tamaraakguneyli/tamara-akguneyli-pickaflick)
