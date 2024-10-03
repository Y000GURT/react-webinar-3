import React from 'react'
import useSelector from '../../hooks/use-selector';
import { Navigate } from 'react-router-dom';

function PrivateRoute({children}) {

    const select = useSelector(state => ({
        isAuth: state.auth.isAuth,
    }));

    if (!select.isAuth) {
        return <Navigate to="/auth" />
    }
    
    return children
}

export default PrivateRoute;