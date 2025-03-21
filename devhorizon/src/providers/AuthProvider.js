import { createContext, useReducer, useMemo, useContext, useEffect } from "react";
import * as SecureStore from "expo-secure-store";
import AuthReducer, { initialState, RESTORE_TOKE, SIGN_IN, SIGN_OUT } from "../reducers/AuthReducer";
import AppNavigation from "../navigations/AppNavigation";
import { logout as apiLogout } from "../services/AuthService"; // Importa el logout del servicio

export const USER_TOKEN_KEY = "userToken";
export const USER_KEY = "user";

export const AuthContext = createContext();

const AuthProvider = () => {
    const [state, dispatch] = useReducer(AuthReducer, initialState);

    useEffect(() => {
        const bootstrapAsync = async () => {
            try {
                const userToken = await SecureStore.getItemAsync(USER_TOKEN_KEY);
                // Solo restaurar si el token existe
                if (userToken) {
                    dispatch({ type: RESTORE_TOKE, token: userToken });
                } else {
                    dispatch({ type: SIGN_OUT }); // Forzar estado no autenticado
                }
            } catch (e) {
                console.error("Error restoring token:", e);
            }
        };
        bootstrapAsync();
    }, []);

    const handleLogin = async ({ token, user }) => {
        try {
            dispatch({ type: SIGN_IN, token, user });
        } catch (e) {
            throw new Error(e);
        }
    };

    const handleLogout = async () => {
        try {
            await apiLogout();
        } catch (error) {
            console.error("Logout error:", error);
        } finally {
            // Limpiar headers de Axios manualmente
            //delete axiosInstance.defaults.headers.common["Authorization"];
            dispatch({ type: SIGN_OUT });
        }
    };

    const authContext = useMemo(() => ({
        ...state,
        handleLogin,
        handleLogout,
    }), [state]);
    
    return (
        <AuthContext.Provider value={authContext}>
            <AppNavigation userToken={state.userToken} />
        </AuthContext.Provider>
    );
};

const useAuth = () => useContext(AuthContext);

export { useAuth, AuthProvider };