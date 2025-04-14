import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

//TODO: Вытащить данные в env
export const firebaseConfig = {
  apiKey: 'AIzaSyA8kEzbrwTlqRrSHIAQNqAQSjczUl77PeQ',
  authDomain: 'foodclient-kts-frontend.firebaseapp.com',
  projectId: 'foodclient-kts-frontend',
  storageBucket: 'foodclient-kts-frontend.firebasestorage.app',
  messagingSenderId: '132196531144',
  appId: '1:132196531144:web:35eb73ebab1c92987f5efd',
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
