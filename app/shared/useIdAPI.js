const { UseIdAPI } = require("useid-eservice-sdk");

const useIdAPI = new UseIdAPI(
  process.env.USEID_API_KEY,
  process.env.USEID_DOMAIN
);

module.exports = useIdAPI;
