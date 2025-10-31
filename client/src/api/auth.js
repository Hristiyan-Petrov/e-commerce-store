import { api } from "./fetcher";

export default {
    logout: () => {
        return api.get('/auth/logout')
            .then(() => console.log('SUCCESS FROM AUTH API'))
            .catch(err => {
                throw ('Logout failed, error:' + err)
            });
    },
};