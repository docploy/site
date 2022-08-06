import {
  GithubAuthProvider,
  User,
  getAuth,
  signInWithPopup,
} from 'firebase/auth';
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getFirestore,
  onSnapshot,
  setDoc,
} from 'firebase/firestore';
import { getApps, initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

let app;

if (!getApps().length) {
  app = initializeApp(firebaseConfig);
}

export const db = getFirestore(app);
export const auth = getAuth(app);

export async function login() {
  const provider = new GithubAuthProvider();

  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    // Set `merge: true` so we do not overwrite `stripeId` when the user logs in
    await setDoc(
      doc(db, 'users', user.uid),
      {
        uid: user.uid,
        email: user.email,
        name: user.displayName,
        provider: user.providerData[0].providerId,
        photoUrl: user.photoURL,
      },
      { merge: true }
    );
  } catch (error) {
    console.error(`There was an error logging in: ${error}`);
  }
}

export const createCheckoutSession = async (
  uid: string,
  priceId: string,
  onSnapshotFn: (sessionId: string) => Promise<void>
) => {
  const userRef = await doc(db, 'users', uid);
  const checkoutSessionRef = await collection(userRef, 'checkout_sessions');
  const checkoutSession = await addDoc(checkoutSessionRef, {
    price: priceId,
    success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/?alert=paymentSuccess`,
    cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/?alert=paymentCancelled`,
  });
  onSnapshot(checkoutSession, (doc) => {
    const data = doc.data();
    if (data?.sessionId) {
      onSnapshotFn(data.sessionId);
    }
  });
  return checkoutSession;
};

export const getUserData = async (user: User) => {
  const userRef = await doc(db, 'users', user.uid);
  const userDoc = await getDoc(userRef);
  const data = userDoc.data();
  return data;
};

// TODO: This does not support enterprise users
// TODO: Should we only be refreshing the token at the top level?
export const isProUser = async (user: User) => {
  if (!user) {
    return false;
  }

  const decodedToken = await user.getIdTokenResult(true);
  return decodedToken?.claims?.stripeRole ? true : false;
};
