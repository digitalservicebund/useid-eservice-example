require('dotenv').config();
const express = require('express')
const axios = require('axios');
const app = express();
app.set('views', require('path').join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(express.static('public'));

const { UseIdAPI, DataGroup } = require('useid-eservice-sdk');

axios.interceptors.request.use(config => {
  config.headers = config.headers ?? {};
  config.headers['Authorization'] = `Bearer ${process.env.USEID_API_KEY}`;
  return config;
});

app.get('/health', async (req, res) => {
  res.status(200).send('ok');
});

const useIdAPI = new UseIdAPI(process.env.USEID_API_KEY, process.env.USEID_DOMAIN);

app.get('/', async (req, res) => {
  const useIdResponse = await useIdAPI.startSession();
  res.header('Content-Security-Policy', `frame-src ${useIdAPI.domain} mailto:; script-src ${useIdAPI.domain}`);
  return res.render('index', {
    widgetSrc: useIdAPI.widgetSrc,
    tcTokenUrl: useIdResponse.tcTokenUrl,
    ...resolveBannerInfo(process.env.USEID_ENV)
  });
});

app.get('/success', async (req, res) => {
  const eIdSessionId = req.query.sessionId;
  if (eIdSessionId === undefined) {
    return res.render('error', { errorMessage: 'No session found' });
  }
  const resultMajor = req.query.ResultMajor;
  if (resultMajor === 'error') {
    return res.render('error', { errorMessage: 'Identification failed. Please try again.' });
  }
  try {
    const identity = await useIdAPI.getIdentity(eIdSessionId);
    const address = identity.get(DataGroup.PlaceOfResidence).structuredPlace;
    const data = [
      { key: 'Name', value: identity.get(DataGroup.GivenNames) + " " + identity.get(DataGroup.FamilyNames) },
      { key: 'Straße', value: formatString(address.street) },
      { key: 'PLZ und Stadt', value: formatString(address.zipCode + " " + address.city) },
      { key: 'Land', value: resolveCountry(address) },
    ];
    return res.render('success', { data });
  } catch (e) {
    return res.render('error', { errorMessage: e.message });
  }
});

function resolveCountry(address) {
  return address.country === "D" ? "Deutschland" : address.country;
}

function formatString(input) {
  let output = `${input.slice(0, 1).toUpperCase()}${input.slice(1)}`;

  output = output.replaceAll(/\S*/g, word =>
      `${word.slice(0, 1)}${word.slice(1).toLowerCase()}`
  );

  return output
}

app.get('/qrcode', async (req, res) => {
  const useIdResponse = await useIdAPI.startSession();
  await createTransactionInfo(useIdResponse);
  res.header('Content-Security-Policy', `frame-src ${useIdAPI.domain} mailto:; script-src ${useIdAPI.domain}`);
  return res.render('index', {
    widgetSrc: `${useIdAPI.domain}/qrcode-widget.js`,
    tcTokenUrl: useIdResponse.tcTokenUrl,
    ...resolveBannerInfo("webauthn")
  });
});

async function createTransactionInfo(useIdResponse) {
  let useIdSessionId = decodeURIComponent(useIdResponse.tcTokenUrl).match(
      /tc-tokens\/([a-f\d\-]*)/i
  )[1];
  let data = {
    "providerName": "Spaßkasse",
    "providerURL": "https://www.sparkasse.de/",
    "additionalInfo": [
      {
        "key": "Kundennummer",
        "value": "23467812"
      },
      {
        "key": "Nachname",
        "value": "Musterfrau"
      }
    ]
  };

  let url = `${useIdAPI.domain}/api/v1/identifications/${useIdSessionId}/transaction-infos`;
  await axios.post(url, data);
}

function resolveBannerInfo(env) {
  let bannerHeader = "Widget Demo ";
  let bannerText = "Kompatibel mit ";
  switch (env) {
    case 'local':
      bannerHeader += "Local"
      bannerText += "BundesIdent und BundesIdent Preview und Test-Ausweisdokumenten."
      break;
    case 'staging':
      bannerHeader += "Staging"
      bannerText += "BundesIdent und BundesIdent Preview und Test-Ausweisdokumenten."
      break;
    case 'production':
      bannerHeader += ""
      bannerText += "BundesIdent und echten Ausweisdokumenten."
      break;
    case 'webauthn':
      bannerHeader += "WebAuthn"
      bannerText += "iOS App BundesIdent Prototype, Test‑Ausweisdokumenten in Safari + Chrome."
      break;
    default:
      bannerHeader += ""
      bannerText += "BundesIdent und echten Ausweisdokumenten."
  }
  return {
    bannerHeader: bannerHeader,
    bannerText: bannerText
  }
}

module.exports = app;
