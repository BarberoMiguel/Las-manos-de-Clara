import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: "AIzaSyBVXvsOHyZC6dO2jjmXzvAx8QVAozZbXYw",
  authDomain: "lasmanosdeclara-dd290.firebaseapp.com",
  projectId: "lasmanosdeclara-dd290",
  storageBucket: "lasmanosdeclara-dd290.appspot.com",
  messagingSenderId: "29594933283",
  appId: "1:29594933283:web:cfcf4c6c54b4de3696f996"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const signOut = async () => {
    try {
      await auth.signOut();
      console.log('Cierre de sesión exitoso');
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

const googleProvider = new GoogleAuthProvider();


export { app, auth, googleProvider, signOut };