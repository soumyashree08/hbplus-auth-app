
import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
} from "react-native";

import { AntDesign } from "@expo/vector-icons";
import { useAuth } from "../context/AuthContext";

const LoginScreen = () => {
  const { login } = useAuth();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGoogleLogin = async () => {
    try {
      setError("");
      setLoading(true);
      await login();
    } catch (err) {
      console.log("Login Error:", err.message);

      if (
        err.message?.toLowerCase().includes("hbplus.fit") ||
        err.message?.toLowerCase().includes("restricted")
      ) {
        setError(
          "Access restricted. Please login using your official domain email."
        );
      } else {
        setError(
          err.message || "Unable to sign in. Please try again."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {/* Background decorations */}
      <View style={styles.circleOne} />
      <View style={styles.circleTwo} />
      <View style={styles.circleThree} />

      <View style={styles.card}>
        {/* Logo */}
        <View style={styles.logoContainer}>
          <View style={styles.logoIcon}>
            <Text style={styles.logoLetter}>H</Text>
          </View>

          <Text style={styles.logoText}>HBPLUS</Text>
          <Text style={styles.logoSubtitle}>WORKSPACE</Text>
        </View>

        <View style={styles.divider} />

        {/* Login content */}
        <View style={styles.content}>
          <View style={styles.welcomeBadge}>
            <View style={styles.onlineDot} />
            <Text style={styles.welcomeBadgeText}>
              OFFICIAL EMPLOYEE PORTAL
            </Text>
          </View>

          <Text style={styles.heading}>Welcome back</Text>

          <Text style={styles.description}>
            Sign in to your workspace and access your
            official HBPlus account.
          </Text>

          {/* Google Login */}
          <TouchableOpacity
            style={[
              styles.googleButton,
              loading && styles.disabledButton,
            ]}
            onPress={handleGoogleLogin}
            disabled={loading}
            activeOpacity={0.8}
          >
            {loading ? (
              <ActivityIndicator color="#173B70" />
            ) : (
              <>
                <AntDesign
                  name="google"
                  size={21}
                  color="#4285F4"
                />

                <Text style={styles.buttonText}>
                  Continue with Google
                </Text>
              </>
            )}
          </TouchableOpacity>

          {/* Error message */}
          {error ? (
            <View style={styles.errorContainer}>
              <AntDesign
                name="exclamation-circle"
                size={17}
                color="#DC2626"
              />
              <Text style={styles.errorText}>{error}</Text>
            </View>
          ) : null}

          {/* Security information */}
          <View style={styles.securityContainer}>
            <AntDesign
              name="lock"
              size={15}
              color="#64748B"
            />

            <Text style={styles.securityText}>
              Secure authentication powered by Google
            </Text>
          </View>

          <View style={styles.domainContainer}>
            <Text style={styles.domainLabel}>
              AUTHORIZED DOMAIN
            </Text>

            <Text style={styles.domainText}>
              @hbplus.fit
            </Text>
          </View>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            © 2026 HBPLUS. All rights reserved.
          </Text>
        </View>
      </View>

      <Text style={styles.bottomText}>
        Your workspace. Your secure access.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    minHeight: 650,
    backgroundColor: "#DCE7FA",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    overflow: "hidden",
  },

  circleOne: {
    position: "absolute",
    width: 500,
    height: 500,
    borderRadius: 250,
    backgroundColor: "#B8CCF5",
    top: -250,
    right: -180,
  },

  circleTwo: {
    position: "absolute",
    width: 350,
    height: 350,
    borderRadius: 175,
    backgroundColor: "#C8BDF5",
    bottom: -180,
    left: -150,
  },

  circleThree: {
    position: "absolute",
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: "#C2D8F5",
    top: "40%",
    right: -110,
  },

  card: {
    width: "100%",
    maxWidth: 450,
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    overflow: "hidden",
    elevation: 10,
    shadowColor: "#173B70",
    shadowOpacity: 0.14,
    shadowRadius: 25,
    shadowOffset: { width: 0, height: 10 },
  },

  logoContainer: {
    alignItems: "center",
    paddingTop: 35,
    paddingBottom: 28,
  },

  logoIcon: {
    width: 58,
    height: 58,
    borderRadius: 17,
    backgroundColor: "#173B70",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },

  logoLetter: {
    color: "#FFFFFF",
    fontSize: 34,
    fontWeight: "bold",
  },

  logoText: {
    fontSize: 26,
    fontWeight: "800",
    color: "#173B70",
    letterSpacing: 3,
  },

  logoSubtitle: {
    fontSize: 10,
    color: "#94A3B8",
    letterSpacing: 4,
    marginTop: 5,
    fontWeight: "600",
  },

  divider: {
    height: 1,
    backgroundColor: "#E2E8F0",
  },

  content: {
    paddingHorizontal: 30,
    paddingTop: 32,
    paddingBottom: 30,
  },

  welcomeBadge: {
    alignSelf: "center",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#EFF6FF",
    paddingHorizontal: 13,
    paddingVertical: 9,
    borderRadius: 30,
    marginBottom: 22,
  },

  onlineDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: "#16A34A",
    marginRight: 8,
  },

  welcomeBadgeText: {
    color: "#1D4ED8",
    fontSize: 10,
    fontWeight: "700",
    letterSpacing: 1,
  },

  heading: {
    fontSize: 30,
    fontWeight: "800",
    color: "#172B4D",
    textAlign: "center",
    marginBottom: 12,
  },

  description: {
    fontSize: 15,
    color: "#64748B",
    textAlign: "center",
    lineHeight: 24,
    marginBottom: 30,
  },

  googleButton: {
    height: 57,
    width: "100%",
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#CBD5E1",
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },

  disabledButton: {
    opacity: 0.6,
  },

  buttonText: {
    color: "#172B4D",
    fontSize: 15,
    fontWeight: "700",
    marginLeft: 13,
  },

  errorContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: "#FEF2F2",
    borderRadius: 10,
    padding: 12,
    marginTop: 18,
  },

  errorText: {
    flex: 1,
    color: "#B91C1C",
    fontSize: 13,
    lineHeight: 20,
    marginLeft: 9,
  },

  securityContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 27,
  },

  securityText: {
    fontSize: 12,
    color: "#64748B",
    marginLeft: 8,
  },

  domainContainer: {
    alignItems: "center",
    marginTop: 25,
    backgroundColor: "#F1F5FF",
    padding: 16,
    borderRadius: 12,
  },

  domainLabel: {
    color: "#94A3B8",
    fontSize: 10,
    fontWeight: "700",
    letterSpacing: 1.5,
  },

  domainText: {
    color: "#173B70",
    fontSize: 17,
    fontWeight: "800",
    marginTop: 7,
  },

  footer: {
    backgroundColor: "#F8FAFC",
    padding: 17,
    alignItems: "center",
  },

  footerText: {
    color: "#94A3B8",
    fontSize: 11,
  },

  bottomText: {
    color: "#435B85",
    fontSize: 12,
    marginTop: 22,
    textAlign: "center",
    fontWeight: "600",
  },
});

export default LoginScreen;
