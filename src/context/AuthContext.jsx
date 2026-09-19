import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import {
  loginUser,
  logoutUser,
  registerUser,
} from "../services/userService";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // =========================
  // CHECK SAVED USER
  // =========================
  useEffect(() => {
    try {
      const savedUser = localStorage.getItem("cristal-user");
      const token = localStorage.getItem("token");

      // No valid session
      if (!savedUser || !token) {
        setUser(null);
        setLoading(false);
        return;
      }

      try {
        const parsedUser = JSON.parse(savedUser);

        if (parsedUser && typeof parsedUser === "object") {
          setUser(parsedUser);
        } else {
          localStorage.removeItem("cristal-user");
          localStorage.removeItem("token");
          setUser(null);
        }
      } catch (error) {
        console.warn("Invalid CRISTAL user data. Clearing session.");

        localStorage.removeItem("cristal-user");
        localStorage.removeItem("token");

        setUser(null);
      }
    } catch (error) {
      console.error("Failed to initialize authentication:", error);

      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  // =========================
  // LOGIN
  // =========================
  async function login(email, password) {
    const response = await loginUser({
      email,
      password,
    });

    const token =
      response?.token ||
      response?.accessToken ||
      response?.data?.token ||
      response?.data?.accessToken;

    const userData =
      response?.user ||
      response?.data?.user ||
      response?.data ||
      null;

    if (!token) {
      throw new Error("Login successful but no authentication token was received.");
    }

    if (!userData) {
      throw new Error("Login successful but no user data was received.");
    }

    localStorage.setItem("token", token);
    localStorage.setItem(
      "cristal-user",
      JSON.stringify(userData)
    );

    setUser(userData);

    return response;
  }

  // =========================
  // REGISTER
  // =========================
  async function register(data) {
    const response = await registerUser(data);

    const token =
      response?.token ||
      response?.accessToken ||
      response?.data?.token ||
      response?.data?.accessToken;

    const userData =
      response?.user ||
      response?.data?.user ||
      response?.data ||
      null;

    if (!token) {
      throw new Error(
        "Registration successful but no authentication token was received."
      );
    }

    if (!userData) {
      throw new Error(
        "Registration successful but no user data was received."
      );
    }

    localStorage.setItem("token", token);
    localStorage.setItem(
      "cristal-user",
      JSON.stringify(userData)
    );

    setUser(userData);

    return response;
  }

  // =========================
  // LOGOUT
  // =========================
  function logout() {
    logoutUser().catch(() => {});
    setUser(null);

    // Clear authentication data
    localStorage.removeItem("token");
    localStorage.removeItem("cristal-user");

    // Optional future auth/session keys
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("cristal-session");
  }

  // =========================
  // AUTH STATUS
  // =========================
  const isAuthenticated = Boolean(user);

  const value = {
    user,
    loading,

    login,
    register,
    logout,

    isAuthenticated,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

// =========================
// AUTH HOOK
// =========================
export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used inside an AuthProvider"
    );
  }

  return context;
}