import React from 'react';
import {Navigate} from 'react-router-dom';

export const PrivateRoute: React.FC<any> = ({ children, ...props }) => {
    if (!localStorage.getItem('token')) {
        return <Navigate to='/' replace/>
    }

    return children;
};

export default PrivateRoute;