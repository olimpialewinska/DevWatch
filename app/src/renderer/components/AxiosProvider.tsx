import React, { FC, ReactNode, useCallback, useContext } from "react";
import axios, { AxiosError } from "axios";
import Api from "../api/Api";
import { AuthContext } from "./AuthProvider";
import { UserApi } from "../api/user";

interface AxiosProviderProps {
  children: ReactNode;
}

const AxiosProvider: FC<AxiosProviderProps> = ({ children }) => {
  const authContext = useContext(AuthContext);

  const getRefreshToken = async () => {
    const refreshToken = window.electron.ipcRenderer.send("get-token");
    return refreshToken;
  };

  Api.interceptors.request.use((config) => {
    const token = authContext.authState.accessToken;
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  });

  const createResponseInterceptor = useCallback(() => {
    const interceptor = Api.interceptors.response.use(
      (response) => response,
      async (error: AxiosError) => {
        if (error.response?.status !== 401) {
          throw error;
        }
        Api.interceptors.response.eject(interceptor);

        const refresh =
          authContext.authState.refreshToken ?? (await getRefreshToken());

        if (!refresh) {
          await authContext.logout();
          return;
        }

        try {
          const accessToken = await UserApi.refresh(refresh);
          authContext.setAuthState((prevState) => ({
            ...prevState,
            accessToken,
          }));
          error.response.config.headers.Authorization = `Bearer ${accessToken}`;
          return await axios(error.response.config);
        } catch (refreshError) {
          await authContext.logout();
          return;
        } finally {
          createResponseInterceptor();
        }
      }
    );
  }, [authContext]);

  createResponseInterceptor();

  return <>{children}</>;
};

export default AxiosProvider;
