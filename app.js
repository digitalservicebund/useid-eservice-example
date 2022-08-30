require('dotenv').config();
const app = require('express')();
app.set('views', require('path').join(__dirname, 'views'));
app.set('view engine', 'pug');

const { UseIdAPI, DataGroup } = require('useid-eservice-sdk');

app.get('/health', async (req, res) => {
  res.status(200).send("ok")
});

const useIdAPI = new UseIdAPI(process.env.USEID_API_KEY);

app.get('/', async (req, res) => {
  const useIdResponse = await useIdAPI.startSession();

  res.header('Content-Security-Policy', `frame-src ${UseIdAPI.domain}; script-src ${UseIdAPI.domain}`);

  return res.render('index', { widgetSrc: UseIdAPI.widgetSrc, tcTokenUrl: useIdResponse.tcTokenUrl });
});

app.get('/success', async (req, res) => {
  const eIdSessionId = req.query.sessionId;
  if (eIdSessionId === undefined) {
    return res.render('error', { errorMessage: 'No session found' });
  }
  try {
    const identity = await useIdAPI.getIdentity(eIdSessionId);
    const data = [
      { key: 'Document Type', value: identity.get(DataGroup.DocumentType) },
      { key: 'Issuing Entity', value: identity.get(DataGroup.IssuingEntity) },
    ];
    return res.render('success', { data });
  } catch (e) {
    return res.render('error', { errorMessage: e.message });
  }
});

module.exports = app;
