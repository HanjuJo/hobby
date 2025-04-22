import { initializeApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

// Firebase가 이미 초기화되어 있는지 확인
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

// 서버 사이드 렌더링을 위한 안전한 초기화
export const auth = typeof window !== 'undefined' ? getAuth(app) : null;
export const db = typeof window !== 'undefined' ? getFirestore(app) : null;
export const storage = typeof window !== 'undefined' ? getStorage(app) : null;
export const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null; 