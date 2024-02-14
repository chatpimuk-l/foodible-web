import { toast } from "react-toastify";
import { createContext, useEffect, useState } from "react";
import * as authApi from "../../../api/auth";
import {
  getToken,
  removeToken,
  storeToken,
} from "../../../utils/local-storage";

export const AuthContext = createContext();

export default function AuthContextProvider({ children }) {
  const [authUser, setAuthUser] = useState(null);
  const [initialLoading, setInitialLoading] = useState(true);

  useEffect(() => {
    if (getToken()) {
      setInitialLoading(true);
      authApi
        .fetchMe()
        .then((res) => setAuthUser(res.data.user))
        .catch((err) => toast(err.response?.data.message))
        .finally(() => setInitialLoading(false));
    } else {
      setInitialLoading(false);
    }
  }, []);

  const register = async (user) => {
    const res = await authApi.register(user);
    setAuthUser(res.data.user);
    storeToken(res.data.accessToken);
  };

  const login = async (user) => {
    const res = await authApi.login(user);
    setAuthUser(res.data.user);
    storeToken(res.data.accessToken);
  };

  const logout = () => {
    setAuthUser(null);
    removeToken();
    toast("Successfully loged out");
  };

  return (
    <AuthContext.Provider
      value={{
        authUser,
        initialLoading,
        register,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
