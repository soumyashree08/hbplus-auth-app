import {
  GoogleSignin,
  isSuccessResponse,
} from "@react-native-google-signin/google-signin";

import {
  GoogleAuthProvider,
  signInWithCredential,
  signOut,
} from "firebase/auth";

import { auth } from "../firebase/firebaseConfig";
import { isAllowedUser } from "../utils/domainValidation";

GoogleSignin.configure({
  webClientId: process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID,
  iosClientId: process.env.EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID,
});

const DOMAIN_ERROR =
  "Access restricted. Please login using your official domain email.";

export const signInWithGoogle = async () => {
  try {
    await GoogleSignin.hasPlayServices();

    const response = await GoogleSignin.signIn();

    if (!isSuccessResponse(response)) {
      throw new Error("Login cancelled. Please try again.");
    }

    const idToken = response.data.idToken;

    if (!idToken) {
      throw new Error("Google authentication token is missing.");
    }

    const credential = GoogleAuthProvider.credential(idToken);

    const result = await signInWithCredential(auth, credential);

    if (!isAllowedUser(result.user)) {
      await signOut(auth);
      await GoogleSignin.signOut();

      throw new Error(DOMAIN_ERROR);
    }

    return result.user;
  } catch (error) {
    if (error.message === DOMAIN_ERROR) {
      throw error;
    }

    console.error("Native Google authentication error:", error);

    if (error.code === "SIGN_IN_CANCELLED") {
      throw new Error("Login cancelled. Please try again.");
    }

    throw new Error(
      error.message || "Unable to sign in with Google."
    );
  }
};

export const signOutFromGoogle = async () => {
  try {
    await GoogleSignin.signOut();
  } catch (error) {
    console.log("Google sign-out:", error.message);
  }
};