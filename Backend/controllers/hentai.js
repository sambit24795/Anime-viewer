const NanaAPI = require("nana-api");

const nana = new NanaAPI();

exports.getPopularHentai = async (req, res) => {
  const hentai = await nana.popular();
  res.status(200).json({
    hentai,
  });
};
