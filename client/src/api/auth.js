import { API_ENDPOINTS } from "../constants/api";
import { api } from "./fetcher";

export default {
    getCurrentUser: () => api.get(API_ENDPOINTS.AUTH.ME),

    logout: () => {
        return api.get(API_ENDPOINTS.AUTH.LOGOUT)
            .then(() => console.log('SUCCESS FROM AUTH API'))
            .catch(err => {
                throw ('Logout failed, error:' + err)
            });
    },
};