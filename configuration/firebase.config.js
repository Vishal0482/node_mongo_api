const { initializeApp } = require("firebase/app");
const { getStorage } = require("firebase/storage");
const firebaseCredentials = require('../firebaseConfig.json');

const firebaseConfig = {
  apiKey: firebaseCredentials.apiKey,
  authDomain: firebaseCredentials.authDomain,
  projectId: firebaseCredentials.projectId,
  storageBucket: firebaseCredentials.storageBucket,
  messagingSenderId: firebaseCredentials.messagingSenderId,
  appId: firebaseCredentials.appId
};

const app = initializeApp(firebaseConfig);
module.exports = getStorage(app);
