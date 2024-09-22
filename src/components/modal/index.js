import React from 'react'
import { useCallback } from 'react'
import PropTypes from 'prop-types'
import Head from '../head'
import List from '../list'
import Store from '../../store'
import './style.css'

function Modal({show, children}) {
    if (!show) {
        document.body.classList.remove('Modal-open');
        return null;
    }

    document.body.classList.add('Modal-open'); // класс добавляет свойство overflow: hidden
    
    return (
        <div className="Modal-wrapper">
            <div className="Modal-content">
                { children }
            </div>
        </div>
      );
}

Modal.propTypes = {
    store: PropTypes.instanceOf(Store).isRequired,
    show: PropTypes.bool.isRequired,
}

export default Modal;