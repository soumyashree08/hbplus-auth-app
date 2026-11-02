
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

const DashboardScreen = () => {
  const { user, logout } = useAuth();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogout = async () => {
    try {
      setError("");
      setLoading(true);
      await logout();
    } catch (err) {
      setError("Unable to logout. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const displayName = user?.displayName || "HBPlus User";
  const email = user?.email || "Email unavailable";
  const initial = displayName.charAt(0).toUpperCase();

  return (
    <View style={styles.container}>
      {/* Decorative background */}
      <View style={styles.circleOne} />
      <View style={styles.circleTwo} />

      {/* Header */}
      <View style={styles.header}>
        <View style={styles.brand}>
          <View style={styles.logoIcon}>
            <Text style={styles.logoLetter}>H</Text>
          </View>

          <View>
            <Text style={styles.logoText}>HBPLUS</Text>
            <Text style={styles.logoSubtitle}>WORKSPACE</Text>
          </View>
        </View>

        <View style={styles.headerStatus}>
          <View style={styles.onlineDot} />
          <Text style={styles.headerStatusText}>Secure</Text>
        </View>
      </View>

      {/* Main content */}
      <View style={styles.main}>
        <View style={styles.welcomeSection}>
          <View style={styles.welcomeBadge}>
            <View style={styles.smallDot} />
            <Text style={styles.eyebrow}>
              EMPLOYEE WORKSPACE
            </Text>
          </View>

          <Text style={styles.heading}>Welcome back,</Text>

          <Text style={styles.nameHeading}>
            {displayName}!
          </Text>

          <Text style={styles.description}>
            You are successfully signed in to your
            official HBPlus workspace.
          </Text>
        </View>

        {/* Profile card */}
        <View style={styles.profileCard}>
          <Text style={styles.cardTitle}>YOUR PROFILE</Text>

          <View style={styles.profileTop}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>{initial}</Text>
            </View>

            <View style={styles.profileInfo}>
              <Text style={styles.profileName}>
                {displayName}
              </Text>

              <Text style={styles.profileEmail}>
                {email}
              </Text>
            </View>
          </View>

          <View style={styles.divider} />

          <View style={styles.detailsRow}>
            <View>
              <Text style={styles.detailLabel}>
                ACCOUNT STATUS
              </Text>

              <View style={styles.verifiedRow}>
                <AntDesign
                  name="check-circle"
                  size={17}
                  color="#16A34A"
                />

                <Text style={styles.verifiedText}>
                  Authorized
                </Text>
              </View>
            </View>

            <View style={styles.domainBadge}>
              <AntDesign
                name="safety"
                size={14}
                color="#1D4ED8"
              />

              <Text style={styles.domainText}>
                HBPLUS
              </Text>
            </View>
          </View>
        </View>

        {/* Security card */}
        <View style={styles.infoCard}>
          <View style={styles.infoIcon}>
            <AntDesign
              name="safety"
              size={24}
              color="#2563EB"
            />
          </View>

          <View style={styles.infoContent}>
            <Text style={styles.infoTitle}>
              Your account is protected
            </Text>

            <Text style={styles.infoDescription}>
              Access is restricted to authorized
              @hbplus.fit accounts.
            </Text>
          </View>
        </View>

        {error ? (
          <Text style={styles.error}>{error}</Text>
        ) : null}

        {/* Logout */}
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={handleLogout}
          disabled={loading}
          activeOpacity={0.8}
        >
          {loading ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <>
              <AntDesign
                name="logout"
                size={18}
                color="#FFFFFF"
              />

              <Text style={styles.logoutText}>
                Sign Out
              </Text>
            </>
          )}
        </TouchableOpacity>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          © 2026 HBPLUS. All rights reserved.
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    minHeight: 650,
    backgroundColor: "#DCE7FA",
    overflow: "hidden",
  },

  circleOne: {
    position: "absolute",
    width: 400,
    height: 400,
    borderRadius: 200,
    backgroundColor: "#C8BDF5",
    top: 150,
    right: -270,
  },

  circleTwo: {
    position: "absolute",
    width: 350,
    height: 350,
    borderRadius: 175,
    backgroundColor: "#B8CCF5",
    bottom: 20,
    left: -270,
  },

  header: {
    backgroundColor: "#142D55",
    paddingHorizontal: 25,
    paddingVertical: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  brand: {
    flexDirection: "row",
    alignItems: "center",
  },

  logoIcon: {
    width: 44,
    height: 44,
    borderRadius: 13,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },

  logoLetter: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#173B70",
  },

  logoText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "800",
    letterSpacing: 2,
  },

  logoSubtitle: {
    color: "#CBD5E1",
    fontSize: 9,
    letterSpacing: 2,
    marginTop: 3,
  },

  headerStatus: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 13,
    paddingVertical: 8,
    borderRadius: 30,
  },

  onlineDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: "#16A34A",
    marginRight: 7,
  },

  headerStatusText: {
    color: "#173B70",
    fontSize: 12,
    fontWeight: "700",
  },

  main: {
    width: "100%",
    maxWidth: 650,
    alignSelf: "center",
    paddingHorizontal: 22,
    paddingTop: 45,
    paddingBottom: 35,
  },

  welcomeSection: {
    marginBottom: 28,
    backgroundColor: "rgba(255,255,255,0.35)",
    padding: 20,
    borderRadius: 20,
  },

  welcomeBadge: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    marginBottom: 17,
  },

  smallDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: "#16A34A",
    marginRight: 8,
  },

  eyebrow: {
    color: "#2563EB",
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 1.5,
  },

  heading: {
    color: "#172B4D",
    fontSize: 27,
    fontWeight: "600",
  },

  nameHeading: {
    color: "#173B70",
    fontSize: 32,
    fontWeight: "800",
    marginTop: 3,
  },

  description: {
    color: "#526783",
    fontSize: 14,
    lineHeight: 23,
    marginTop: 12,
  },

  profileCard: {
    backgroundColor: "#FFFFFF",
    padding: 24,
    borderRadius: 20,
    elevation: 6,
    shadowColor: "#173B70",
    shadowOpacity: 0.08,
    shadowRadius: 15,
    shadowOffset: { width: 0, height: 5 },
  },

  cardTitle: {
    color: "#94A3B8",
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 1.8,
    marginBottom: 20,
  },

  profileTop: {
    flexDirection: "row",
    alignItems: "center",
  },

  avatar: {
    width: 65,
    height: 65,
    borderRadius: 33,
    backgroundColor: "#DBEAFE",
    justifyContent: "center",
    alignItems: "center",
  },

  avatarText: {
    color: "#173B70",
    fontSize: 28,
    fontWeight: "800",
  },

  profileInfo: {
    flex: 1,
    marginLeft: 16,
  },

  profileName: {
    fontSize: 18,
    fontWeight: "800",
    color: "#172B4D",
  },

  profileEmail: {
    fontSize: 13,
    color: "#64748B",
    marginTop: 6,
  },

  divider: {
    height: 1,
    backgroundColor: "#E2E8F0",
    marginVertical: 22,
  },

  detailsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  detailLabel: {
    color: "#94A3B8",
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 1.3,
    marginBottom: 9,
  },

  verifiedRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  verifiedText: {
    color: "#15803D",
    fontSize: 14,
    fontWeight: "700",
    marginLeft: 7,
  },

  domainBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#EFF6FF",
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 9,
  },

  domainText: {
    color: "#1D4ED8",
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 1,
    marginLeft: 7,
  },

  infoCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#EAF2FF",
    padding: 18,
    borderRadius: 16,
    marginTop: 20,
  },

  infoIcon: {
    width: 46,
    height: 46,
    borderRadius: 13,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
  },

  infoContent: {
    flex: 1,
    marginLeft: 13,
  },

  infoTitle: {
    color: "#173B70",
    fontSize: 14,
    fontWeight: "800",
  },

  infoDescription: {
    color: "#64748B",
    fontSize: 12,
    lineHeight: 19,
    marginTop: 5,
  },

  logoutButton: {
    height: 55,
    backgroundColor: "#173B70",
    borderRadius: 13,
    marginTop: 28,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    elevation: 3,
  },

  logoutText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "700",
    marginLeft: 10,
  },

  error: {
    color: "#DC2626",
    textAlign: "center",
    marginTop: 15,
  },

  footer: {
    padding: 20,
    alignItems: "center",
    marginTop: "auto",
  },

  footerText: {
    color: "#526783",
    fontSize: 11,
    textAlign: "center",
  },
});

export default DashboardScreen;
