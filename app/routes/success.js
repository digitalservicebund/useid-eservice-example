const { useIdAPI } = require('../shared')
const { DataGroup } = require("useid-eservice-sdk");

const success = async (req, res) => {
  let tryAgainMessage = 'Bitte versuchen Sie es erneut.';

  const eIdSessionId = req.query.sessionId;
  if (eIdSessionId === undefined) {
    return res.render('error', { errorMessage: 'Die aufgerufene Adresse ist unvollständig. ' + tryAgainMessage });
  }
  const resultMajor = req.query.ResultMajor;
  if (resultMajor === 'error') {
    return res.render('error', { errorMessage: 'Die Identifizierung ist fehlgeschlagen. ' + tryAgainMessage });
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
    console.error("Failed to get identity: " + e.message);
    return res.render('error', { errorMessage: 'Ein unbekanntes Problem ist aufgetreten. ' + tryAgainMessage });
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
