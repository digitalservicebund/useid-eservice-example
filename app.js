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
  return res.render('index', { widgetSrc: useIdAPI.widgetSrc, tcTokenUrl: useIdResponse.tcTokenUrl });
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
      { key: 'Vorname', value: identity.get(DataGroup.GivenNames) },
      { key: 'Nachname', value: identity.get(DataGroup.FamilyNames) },
      { key: 'Straße', value: address.street },
      { key: 'PLZ', value: address.zipCode },
      { key: 'Stadt', value: address.city },
      { key: 'Land', value: address.country },
    ];
    return res.render('success', { data });
  } catch (e) {
    return res.render('error', { errorMessage: e.message });
  }
});

app.get('/qrcode', async (req, res) => {
  const useIdResponse = await useIdAPI.startSession();
  await createTransactionInfo(useIdResponse);
  res.header('Content-Security-Policy', `frame-src ${useIdAPI.domain} mailto:; script-src ${useIdAPI.domain}`);
  return res.render('index', { widgetSrc: `${useIdAPI.domain}/qrcode-widget.js`, tcTokenUrl: useIdResponse.tcTokenUrl });
});

async function createTransactionInfo(useIdResponse) {
  let useIdSessionId = decodeURIComponent(useIdResponse.tcTokenUrl).match(
      /sessions\/([a-f\d\-]*)\/tc-token/i
  )[1];

  console.log("Create transaction info for: " + useIdSessionId);

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

  let url = `${useIdAPI.domain}/api/v1/identification/sessions/${useIdSessionId}/transaction-info`;
  const response = await axios.post(url, data);
  console.log("Transaction info created successfully: " + JSON.stringify(response.data));
}


module.exports = app;
