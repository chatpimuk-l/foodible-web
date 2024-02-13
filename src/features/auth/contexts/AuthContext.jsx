import { createContext } from "react";
import * as authApi from "../../../api/auth";

export const AuthContext = createContext();

export default function AuthContextProvider({ children }) {
  const register = async (user) => {
    await authApi.register(user);
  };
  return (
    <AuthContext.Provider value={{ register }}>{children}</AuthContext.Provider>
  );
}
