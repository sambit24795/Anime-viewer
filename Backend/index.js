const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const animeRoutes = require("./routes/anime");
const hentaiRoutes = require("./routes/hentai");

const app = express();

app.use(
  cors({
    origin: "*",
  })
);
app.use(bodyParser.json());

app.use("/api/anime", animeRoutes);
app.use("/api/hentai", hentaiRoutes);

const port = process.env.PORT || 4000;

app.listen(port, () => {
  //api.ongoingAnime().then((res) => console.log(res));
  console.log("listening on " + port);
});
