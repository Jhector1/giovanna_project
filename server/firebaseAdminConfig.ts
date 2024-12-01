import admin from 'firebase-admin';
import * as serviceAccount from './fall24-group-project-cs4530-firebase-adminsdk-kt9k4-7d9d1d91be.json';

// Initialize the Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
  databaseURL: 'https://fall24-group-project-cs4530-default-rtdb.firebaseio.com/',
});

export const authAdmin = admin.auth();
