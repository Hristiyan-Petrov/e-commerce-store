import { createContext, useContext, useEffect, useState } from "react";
import authApi from "../api/auth";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadUser();
    }, []);

    const loadUser = async () => {
        try {
            const data = await authApi.getCurrentUser();
            setUser(data.user);
        } catch (err) {
            // 401 is expected for guest users - not an error!
            if (err.response?.status === 401 || err.message?.includes('401') || err.message?.includes('Unauthorized')) {
                // User is not logged in - this is normal
                setUser(null);
            } else {
                // Actual error (network issue, server error, etc.)
                console.error('Failed to load user:', err);
                setUser(null);
            }
        } finally {
            setLoading(false);
        }
    };

    const logout = () => {
        return authApi.logout()
            .then(() => setUser(null))
            .catch(err => {
                console.log(err);
                throw err;
            });
    };

    return (
        <AuthContext.Provider value={{ user, loading, logout }}>
            {children}
        </AuthContext.Provider>
    )
};

export const useAuth = () => useContext(AuthContext);