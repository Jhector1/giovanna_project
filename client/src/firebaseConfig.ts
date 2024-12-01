import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyCHmi2548rwUQCJBJ5vxEDUoHY7GnvrmiI',
  authDomain: 'fall24-group-project-cs4530.firebaseapp.com',
  databaseURL: 'https://fall24-group-project-cs4530-default-rtdb.firebaseio.com/',
  projectId: 'fall24-group-project-cs4530',
  storageBucket: 'fall24-group-project-cs4530.appspot.com',
  messagingSenderId: '1066689100628',
  appId: '1:1066689100628:web:c3a2d35e71460a7d26a6c1',
};

// Initialize Firebase and export authentication
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth;
