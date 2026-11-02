const ALLOWED_DOMAIN = "@hbplus.fit";

export const isAllowedEmail = (email) => {
  if (typeof email !== "string") {
    return false;
  }

  const normalizedEmail = email.trim().toLowerCase();

  const emailPattern = /^[^\s@]+@[^\s@]+$/;

  if (!emailPattern.test(normalizedEmail)) {
    return false;
  }

  return normalizedEmail.endsWith(ALLOWED_DOMAIN);
};

export const isAllowedUser = (user) => {
  return (
    user !== null &&
    user !== undefined &&
    user.emailVerified === true &&
    isAllowedEmail(user.email)
  );
};