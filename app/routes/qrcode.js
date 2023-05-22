const { banner, useIdAPI } = require("../shared");
const axios = require("axios");

const api = axios.create({
  baseURL: `${useIdAPI.domain}`,
  headers: {
    'Authorization': `Bearer ${process.env.USEID_API_KEY}`
  }
})

const qrcode = async (req, res) => {
  const useIdResponse = await useIdAPI.startSession();
  await createTransactionInfo(useIdResponse);
  res.header(
    "Content-Security-Policy",
    `frame-src ${useIdAPI.domain} mailto:; script-src ${useIdAPI.domain}`
  );
  return res.render("index", {
    widgetSrc: `${useIdAPI.domain}/qrcode-widget.js`,
    tcTokenUrl: useIdResponse.tcTokenUrl,
    ...banner("webauthn"),
  });
};

async function createTransactionInfo(useIdResponse) {
  let useIdSessionId = decodeURIComponent(useIdResponse.tcTokenUrl).match(
    /tc-tokens\/([a-f\d\-]*)/i
  )[1];
  let data = {
    providerName: "Spaßkasse",
    providerURL: "https://www.sparkasse.de/",
    additionalInfo: [
      {
        key: "Kundennummer",
        value: "23467812",
      },
      {
        key: "Nachname",
        value: "Musterfrau",
      },
    ],
  };

  await api.post(`/api/v1/identifications/${useIdSessionId}/transaction-infos`, data);
}

module.exports = qrcode;
