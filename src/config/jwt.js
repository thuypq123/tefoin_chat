const path = require("path");
require("dotenv").config({
  path: path.resolve(__dirname, "../.env"),
});
module.exports = {
  JWT_SECRET: process.env.JWT_SECRET,
  auth: {
    CLIENT_ID:
      "659735945511-bp70aks78gr47dj4rnqgcmb2m6tkbgso.apps.googleusercontent.com",
    CLIENT_SECRECT: "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",
  },
};
