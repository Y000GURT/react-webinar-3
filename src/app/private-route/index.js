import React from 'react'
import PropTypes from 'prop-types';
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

PrivateRoute.propTypes = {
    children: PropTypes.node,
};

export default PrivateRoute;