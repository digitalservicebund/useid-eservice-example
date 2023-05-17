const { banner, useIdAPI } = require("../shared");

const index = async (req, res) => {
  const useIdResponse = await useIdAPI.startSession();
  res.header(
    "Content-Security-Policy",
    `frame-src ${useIdAPI.domain} mailto:; script-src ${useIdAPI.domain}`
  );
  return res.render("index", {
    widgetSrc: useIdAPI.widgetSrc,
    tcTokenUrl: useIdResponse.tcTokenUrl,
    ...banner(process.env.USEID_ENV),
  });
};

module.exports = index;
