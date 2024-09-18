import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

function Head({ title, mode = 'page', onClose = () => {}}) {
  if (mode === 'modal') {
    return (
      <div className="Head">
        <h1>{title}</h1>
        <button className='Head-button' onClick={onClose}>Закрыть</button>
      </div>
    )
  }
  
  return (
    <div className="Head">
      <h1>{title}</h1>
    </div>
  )

}

Head.propTypes = {
  title: PropTypes.node,
  mode: PropTypes.string,
  onClose: PropTypes.func,
};

export default React.memo(Head);
