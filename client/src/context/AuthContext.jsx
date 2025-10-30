import { createContext, useContext, useEffect, useState } from "react";
import { api } from "../api/fetcher";

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

    return (
        <AuthContext.Provider value={{ user, loading }}>
            {children}
        </AuthContext.Provider>
    )
};

export const useAuth = () => useContext(AuthContext);