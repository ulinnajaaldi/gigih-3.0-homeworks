## Simple Spotify Playlist Server 

- Implement the MVC structure in Express.js
- Create CRUD operations for songs with status & message handling
- The play count of a song will increment with every hit to the endpoint
- Sort & order songs in the playlist
- Validate the input when adding a new song

### For testing, I recommend following the suggestions below
1. Clone this repository
2. Open it using a code editor
3. Run the command `npm install` in the terminal
4. To run the project, use `npm run dev` command
5. Open Postman, then import the available collection
6. Woala! project ready to start testing

<br/>


## Routes Documentation

### `GET /playlist`

Retrieves the entire playlist.

##### Query Parameters

- `sort`: Optional. Specifies the key to sort the playlist is `"play"`.
- `direction`: Optional. Specifies the sort order is `"asc"` for ascending order.
- `title`: Optional. Specifies the title of the song to search for in the playlist.

### `GET /playlist/:id`

Retrieves a song from the playlist by its ID.

### `POST /playlist`

Adds a new song to the playlist.

##### Request Body

- `title`: The title of the song.
- `artists`: An array/string of artists for the song.
- `url`: The URL of the song.


### `PUT /playlist/:id`

Updates an existing song in the playlist.

##### Request Body

- `title`: Optional. The new title for the song.
- `artists`: Optional. An array/string of new artists for the song.
- `url`: Optional. The new URL for the song.


### `DELETE /playlist/:id`

Deletes a song from the playlist.

### `PUT /playlist/:id/play`

Increments the play count of a song in the playlist.