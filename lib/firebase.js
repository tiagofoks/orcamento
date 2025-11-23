// lib/firebase.js

import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { firebaseConfig } from './constants'; // Importa a config

// 🚨 Inicialização do Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);