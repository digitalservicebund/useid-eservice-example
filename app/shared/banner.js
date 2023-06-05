const resolveBannerInfo = function (env) {
  let bannerHeader = "Widget Demo ";
  let bannerText = "Kompatibel mit ";
  switch (env) {
    case "local":
      bannerHeader += "Local";
      bannerText +=
        "BundesIdent und BundesIdent Preview und Test-Ausweisdokumenten.";
      break;
    case "staging":
      bannerHeader += "Staging";
      bannerText +=
        "BundesIdent und BundesIdent Preview und Test-Ausweisdokumenten.";
      break;
    case "production":
      bannerHeader += "";
      bannerText += "BundesIdent und echten Ausweisdokumenten.";
      break;
    // PROTOTYPE BLOCK BEGIN
    case "webauthn":
      bannerHeader += "WebAuthn";
      bannerText +=
        "iOS App BundesIdent Prototype, Test‑Ausweisdokumenten in Safari + Chrome.";
      break;
    // PROTOTYPE BLOCK END
    default:
      bannerHeader += "";
      bannerText += "BundesIdent und echten Ausweisdokumenten.";
  }
  return {
    bannerHeader: bannerHeader,
    bannerText: bannerText,
  };
};

module.exports = resolveBannerInfo;
