import React from 'react'
import PropTypes from 'prop-types';
import useSelector from '../../hooks/use-selector';
import { Navigate } from 'react-router-dom';

function PrivateRoute({ children }) {
    const select = useSelector(state => ({
        isAuth: state.auth.isAuth,
    }));
    
    return select.isAuth ? children : <Navigate to="/auth" />
}

PrivateRoute.propTypes = {
    children: PropTypes.node,
};

export default React.memo(PrivateRoute);