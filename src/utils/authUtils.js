export const isSessionValid = () => {
  const token = localStorage.getItem("token");
  const loginTime = localStorage.getItem("loginTime");

  if (!token || !loginTime) return false;

  const now = Date.now();
  const THIRTY_MINUTES = 60 * 60 * 1000;

  if (now - loginTime > THIRTY_MINUTES) {
    localStorage.removeItem("token");
    localStorage.removeItem("loginTime");
    localStorage.removeItem("user");
    return false;
  }

  return true;
};
