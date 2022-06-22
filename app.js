require('dotenv').config();
const app = require('express')();
app.set('views', require('path').join(__dirname, 'views'));
app.set('view engine', 'pug');

const { UseIdAPI, DataGroup } = require('useid-eservice-sdk');
const useIdAPI = new UseIdAPI(process.env.USEID_API_KEY);
const sessions = {};
const uuid = require('uuid').v4;

app.get('/', async (req, res) => {
  const sessionId = uuid();
  const refreshAddress = `${process.env.ROOT_URL}/success/${sessionId}`;

  const useIdResponse = await useIdAPI.startSession(
    refreshAddress,
    [DataGroup.DateOfBirth, DataGroup.FamilyNames],
  );
  sessions[sessionId] = { useIdSessionId: useIdResponse.sessionId };

  res.header('Content-Security-Policy', `frame-src ${UseIdAPI.domain}; script-src ${UseIdAPI.domain}`);

  // We pass the refresh address here only as shortcut while developing. In production, this should
  // only be sent to the UseId API and not used anywhere else!
  return res.render('index', { widgetSrc: UseIdAPI.widgetSrc, tcTokenURL: useIdResponse.tcTokenURL, refreshAddress });
});

app.get('/success/:sessionId', async (req, res) => {
  const session = sessions[req.params.sessionId];
  if (session === undefined) {
    return res.render('error', { errorMessage: 'Invalid session' });
  }
  try {
    const identityData = await useIdAPI.getIdentityData(session.useIdSessionId);
    const data = [
      { key: 'Family Names', value: identityData.get(DataGroup.FamilyNames) },
      { key: 'Date of Birth', value: identityData.get(DataGroup.DateOfBirth) },
    ];
    delete sessions[req.params.sessionId];
    return res.render('success', { data });
  } catch (e) {
    return res.render('error', { errorMessage: e.message });
  }
});

module.exports = app;
