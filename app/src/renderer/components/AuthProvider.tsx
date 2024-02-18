import React, {
  Dispatch,
  FC,
  ReactNode,
  SetStateAction,
  createContext,
  useEffect,
  useState,
} from "react";
import { JwtPayload, jwtDecode } from "jwt-decode";
import { UserApi } from "../api/user";
import { Loader } from "lucide-react";
import { URLS } from "../constants/urls";
import { useNavigate } from "react-router-dom";

interface TokenPayload extends JwtPayload {
  email: string;
  user_id: string;
}

interface Tokens {
  accessToken: string | null;
  refreshToken: string | null;
  authenticated: boolean;
  email?: string;
  user_id?: string;
}

interface AuthContextType {
  authState: Tokens;
  logout: () => Promise<void>;
  getAccessToken: () => string | null;
  setAuthState: Dispatch<SetStateAction<Tokens>>;
  login: (accessToken: string, refreshToken: string) => Promise<void>;
}

const initialAuthState: AuthContextType = {
  authState: {
    accessToken: null,
    refreshToken: null,
    authenticated: false,
  },
  logout: async () => {},
  getAccessToken: () => null,
  setAuthState: () => {},
  login: async () => {},
};

const AuthContext = createContext<AuthContextType>(initialAuthState);
const { Provider } = AuthContext;

type AuthProviderProps = {
  children: ReactNode;
};

const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const navigate = useNavigate();
  const [appIsReady, setAppIsReady] = useState(false);
  const [authState, setAuthState] = useState<Tokens>({
    accessToken: null,
    refreshToken: null,
    authenticated: false,
  });

  const decodeToken = (token: string) => {
    const decodedToken = jwtDecode<TokenPayload>(token);
    return { email: decodedToken.email, user_id: decodedToken.user_id };
  };

  const resetAuthState = () => {
    setAuthState({
      accessToken: null,
      refreshToken: null,
      authenticated: false,
    });
  };

  useEffect(() => {
    async function prepare() {
      try {
        const storedRefreshToken = await window.electron.ipcRenderer.invoke(
          "get-token"
        );

        if (!storedRefreshToken) throw new Error("No refresh token");

        const accessToken = await UserApi.refresh(storedRefreshToken);
        const decodedToken = decodeToken(accessToken);
        setAuthState({
          accessToken: accessToken,
          refreshToken: storedRefreshToken,
          authenticated: true,
          email: decodedToken.email,
          user_id: decodedToken.user_id,
        });
        navigate(URLS.DASHBOARD);
      } catch {
        navigate(URLS.HOME);
        resetAuthState();
      } finally {
        setAppIsReady(true);
      }
    }

    void prepare();
    if (authState.authenticated) {
      navigate(URLS.DASHBOARD);
    } else {
      navigate(URLS.HOME);
    }
  }, []);

  const logout = async () => {
    window.electron.ipcRenderer.invoke("remove-token", "");
    resetAuthState();
  };

  const getAccessToken = () => {
    return authState.accessToken;
  };

  const login = async (accessToken: string, refreshToken: string) => {
    window.electron.ipcRenderer.invoke("set-token", refreshToken);
    const decodedToken = decodeToken(accessToken);

    setAuthState({
      accessToken,
      refreshToken,
      authenticated: true,
      email: decodedToken.email,
      user_id: decodedToken.user_id,
    });
  };

  return (
    <Provider
      value={{
        authState,
        getAccessToken,
        setAuthState,
        logout,
        login,
      }}
    >
      {!appIsReady ? <Loader /> : children}
    </Provider>
  );
};

export { AuthContext, AuthProvider };
