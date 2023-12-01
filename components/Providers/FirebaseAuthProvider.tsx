"use client";

import { auth } from "@/firebase.config";
import { signInWithCustomToken } from "firebase/auth";
import { Session } from "next-auth";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

function FirebaseAuthProvider({ children }: { children: React.ReactNode }) {
  const { data: session } = useSession();
  useEffect(() => {
    if (!session) return;
    syncFirebaseAuth(session);
  }, [session]);
  return <>{children}</>;
}

async function syncFirebaseAuth(session: Session) {
  if (session && session.firebaseToken) {
    try {
      await signInWithCustomToken(auth, session.firebaseToken);
    } catch (error) {
      console.log("Error Signing with Custom Token", error);
    }
  } else {
    auth.signOut();
  }
}

export default FirebaseAuthProvider;
