import { createContext } from "react";

interface AuthContextType {
  isAuthenticated: boolean;
  login: (token: string) => void;
  logout: () => void;
}

// Provide a valid default value to avoid undefined context issues
export const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  login: (_token) => {},
  logout: () => {},
});
