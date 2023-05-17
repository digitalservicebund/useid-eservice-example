const { useIdAPI } = require('../shared')
const { DataGroup } = require("useid-eservice-sdk");

const success = async (req, res) => {
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
};

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

module.exports = success;
