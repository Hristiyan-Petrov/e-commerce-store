import { createContext, useContext, useEffect, useState } from "react";
import authApi from "../api/auth";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadUser = async () => {
            api.get('/auth/me')
                .then(data => setUser(data.user))
                .catch(err => console.log(err))
                .finally(() => setLoading(false));
        };

        loadUser();
    }, []);

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