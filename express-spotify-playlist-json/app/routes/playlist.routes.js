const router = require("express").Router();
const Playlist = require("../controllers/playlist.controller");

router.get("/playlist", Playlist.getPlaylist);
router.get("/playlist/:id", Playlist.getSongById);
router.post("/playlist", Playlist.addSong);
router.put("/playlist/:id", Playlist.updateSong);
router.delete("/playlist/:id", Playlist.deleteSong);

module.exports = router;
