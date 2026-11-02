import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";

import { auth } from "../firebase/firebaseConfig";
import { isAllowedUser } from "../utils/domainValidation";

export const signInWithGoogle = async () => {
  try {
    const provider = new GoogleAuthProvider();

    provider.setCustomParameters({
      hd: "hbplus.fit",
      prompt: "select_account",
    });

    const result = await signInWithPopup(auth, provider);

    const user = result.user;

    if (!isAllowedUser(user)) {
      await signOut(auth);

      throw new Error(
        "Access restricted. Please login using your official domain email."
      );
    }

    return user;
  } catch (error) {
    if (
      error.message ===
      "Access restricted. Please login using your official domain email."
    ) {
      throw error;
    }

    console.error("Google authentication error:", error);

    throw new Error(
      error.code === "auth/popup-closed-by-user"
        ? "Login cancelled. Please try again."
        : "Unable to sign in with Google. Please try again."
    );
  }
};

export const signOutFromGoogle = async () => {
  // Firebase sign-out handles the web Google authentication session.
};