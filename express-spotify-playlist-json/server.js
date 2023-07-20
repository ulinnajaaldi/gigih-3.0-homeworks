const express = require("express");
const app = express();
const playlistRoutes = require("./app/routes/playlist.routes");

app.use(express.json());
app.use(playlistRoutes);

const port = 9000;
app.listen(port, () => {
  console.log(`Server running on port http://localhost:${port}`);
});
