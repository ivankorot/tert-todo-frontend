import React from "react";
import './index.css';
import useAuthUser from "../../hooks/useAuthUser";


const Logout: React.FC = () => {
    const { logout } = useAuthUser();

    return (
            <span className="Logout" onClick={() => logout()}>Logout</span>
    );
};

export default Logout;