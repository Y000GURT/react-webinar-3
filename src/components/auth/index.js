import React from 'react'
import PropTypes from 'prop-types';
import SideLayout from '../side-layout';
import { Link } from 'react-router-dom';
import './style.css';

function Auth({ auth, onAuth, name, isAuth }) {
    return ( 
        <SideLayout padding="medium" side="end">
            <div className='Auth'>
                {
                    isAuth 
                    ?
                    <Link to='/profile'>{name}</Link>
                    :
                    null
                }
                <button onClick={onAuth}>
                    { auth }
                </button>
            </div>
        </SideLayout>
    );
}

Auth.propTypes = {
    onAuth: PropTypes.func,
    name: PropTypes.string,
    auth: PropTypes.string,
    isAuth: PropTypes.bool,
};

export default React.memo(Auth);