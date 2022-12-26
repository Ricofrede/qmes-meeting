import {
  FirebaseCMSApp
} from "@camberi/firecms";

import collections from './collections'
import useAuthenticator from "./hooks/useAuthenticator";

import "typeface-rubik";
import "@fontsource/ibm-plex-mono";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FB_API_KEY,
  authDomain: import.meta.env.VITE_FB_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FB_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FB_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FB_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FB_APP_ID,
  measurementId: import.meta.env.VITE_FB_MEASURE_ID
};


export default function App() {
  const myAuthenticator = useAuthenticator()

  return <FirebaseCMSApp
    name={"QMES - Meeting"}
    authentication={myAuthenticator}
    collections={collections}
    firebaseConfig={firebaseConfig}
  />;
}
