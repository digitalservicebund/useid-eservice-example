require('dotenv').config();
const app = require('express')();
app.set('views', require('path').join(__dirname, 'views'));
app.set('view engine', 'pug');

const { UseIdAPI, DataGroup } = require('useid-eservice-sdk');

app.get('/health', async (req, res) => {
  res.status(200).send("ok")
});

const useIdAPI = new UseIdAPI(process.env.USEID_API_KEY, process.env.USEID_DOMAIN);

app.get('/', async (req, res) => {
  const useIdResponse = await useIdAPI.startSession();

  res.header('Content-Security-Policy', `frame-src ${useIdAPI.domain}; script-src ${useIdAPI.domain}`);

  return res.render('index', { widgetSrc: useIdAPI.widgetSrc, tcTokenUrl: useIdResponse.tcTokenUrl });
});

app.get('/success', async (req, res) => {
  const eIdSessionId = req.query.sessionId;
  if (eIdSessionId === undefined) {
    return res.render('error', { errorMessage: 'No session found' });
  }
  const resultMajor = req.query["ResultMajor"];
  if (resultMajor === "error") {
    return res.render("error", { errorMessage: "Identification failed. Please try again." });
  }
  try {
    const identity = await useIdAPI.getIdentity(eIdSessionId);
    let address = identity.get(DataGroup.PlaceOfResidence)["structuredPlace"];
    const data = [
      { key: 'Given Names', value: identity.get(DataGroup.GivenNames) },
      { key: 'Family Names', value: identity.get(DataGroup.FamilyNames) },
      { key: 'Street', value: address["street"] },
      { key: 'City', value: address["city"] },
      { key: 'Country', value: address["country"] },
      { key: 'Zip Code', value: address["zipCode"] },
    ];
    return res.render('success', { data });
  } catch (e) {
    return res.render('error', { errorMessage: e.message });
  }
});

module.exports = app;
