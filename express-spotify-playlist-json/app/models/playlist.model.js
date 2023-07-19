const fs = require("fs");

let playlist = [];

fs.readFile("./app/utils/playlist.json", "utf8", (err, data) => {
  if (err) {
    console.log(err);
  } else {
    playlist = JSON.parse(data);
  }
});

const getPlaylist = () => {
  return playlist;
};

const getSongById = (id) => {
  return playlist.find((song) => song.id === id);
};

const addSong = (song) => {
  playlist.push(song);
  fs.writeFile("./app/utils/playlist.json", JSON.stringify(playlist), (err) => {
    if (err) console.log(err);
  });
};

const updateSong = (id, updates) => {
  const song = getSongById(id);
  if (song) {
    if (updates.title) song.title = updates.title;
    if (updates.artists) song.artists = updates.artists;
    if (updates.url) song.url = updates.url;
    fs.writeFile(
      "./app/utils/playlist.json",
      JSON.stringify(playlist),
      (err) => {
        if (err) console.log(err);
      }
    );
  }
};

const deleteSong = (id) => {
  playlist = playlist.filter((song) => song.id !== id);
  fs.writeFile("./app/utils/playlist.json", JSON.stringify(playlist), (err) => {
    if (err) console.log(err);
  });
};

const playSong = (id) => {
  const song = getSongById(id);
  if (song) {
    song.play += 1;
    fs.writeFile(
      "./app/utils/playlist.json",
      JSON.stringify(playlist),
      (err) => {
        if (err) console.log(err);
      }
    );
  }
};

module.exports = {
  getPlaylist,
  getSongById,
  addSong,
  updateSong,
  deleteSong,
  playSong,
};
