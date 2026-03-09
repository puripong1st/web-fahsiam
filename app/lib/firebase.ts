// src/lib/firebase.ts
import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// import { getAuth } from "firebase/auth";   // ถ้าอยากใช้ Auth
// import { getStorage } from "firebase/storage"; // ถ้าอยากใช้ Storage

// config ของคุณ
const firebaseConfig = {
  apiKey: "AIzaSyDnBJfUVnWqAbZOuNBXf771qd5NTriNsHQ",
  authDomain: "test-ffefc.firebaseapp.com",
  projectId: "test-ffefc",
  storageBucket: "test-ffefc.appspot.com", // ✅ แก้ .app → .appspot.com
  messagingSenderId: "150082220664",
  appId: "1:150082220664:web:b22345eabd5a18be91338d",
  measurementId: "G-KXERJZCTY0"
};

// ป้องกัน initialize ซ้ำเวลา hot reload
const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);

// export service ที่จะใช้
export const db = getFirestore(app);
// export const auth = getAuth(app);
// export const storage = getStorage(app);
