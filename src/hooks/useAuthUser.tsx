import { useApolloClient } from '@apollo/client';
import { useNavigate } from 'react-router-dom';

const useAuthUser = () => {
    const client = useApolloClient();
    const history = useNavigate();

    const setAuthUser = (token: string) => {
        localStorage.setItem('token', token);
        history('/todo');
    };

    const logout = () => {
        client.resetStore();
        localStorage.clear();
        history('/');
    };

    return { logout, setAuthUser };
};

export default useAuthUser;