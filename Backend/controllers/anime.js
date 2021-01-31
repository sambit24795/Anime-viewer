const api = require("animefreak");

exports.getOngoingAnimes = async (req, res) => {
  try {
    const ongoingAnimes = await api.ongoingAnime();
    res.status(200).json({
      animes: ongoingAnimes,
    });
  } catch (err) {
    console.error(err);
  }
};

exports.getEpisode = async (req, res) => {
  try {
    const { episodeId } = req.query;
    const episode = await api.animeVideoHandler(episodeId);
    console.log(episode);
    res.status(200).json({
      episode,
    });
  } catch (err) {
    console.error(err);
  }
};

exports.getPopularAnimes = async (req, res) => {
  try {
    const popularAnimes = await api.popular();
    res.status(200).json({
      animes: popularAnimes,
    });
  } catch (err) {
    console.error(err);
  }
};

exports.getSearchedAnime = async (req, res) => {
  try {
    const { searchQuery } = req.query;
    const searchedAnimes = await api.search(searchQuery);
    console.log(searchQuery);
    res.status(200).json({
      animes: searchedAnimes,
    });
  } catch (err) {
    console.error(err);
  }
};
