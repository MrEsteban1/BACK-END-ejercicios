var admin = require("firebase-admin");

var serviceAccount = require("./credenciales.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});