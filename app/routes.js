const index = require("./routes/index");
const success = require("./routes/success");
const qrcode = require("./routes/qrcode"); // PROTOTYPE LINE
const health = require("./routes/health");

module.exports = {
  index,
  success,
  qrcode, // PROTOTYPE LINE
  health,
};
