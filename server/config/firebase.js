const admin = require("firebase-admin")
const serviceAccount = require("../firebase/serviceAccountKey.json")

// Initialize Firebase Admin
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
})

module.exports = admin