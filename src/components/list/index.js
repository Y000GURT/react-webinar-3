import React from 'react';
import PropTypes from 'prop-types';
import Item from '../item';
import './style.css';

function List({ list, mode = 'page', onAddToBasket = () => {}, onDeleteFromBasket = () => {}}) {
  return (
    <div className="List">
      {list.map(item => (
        <div key={item.code} className="List-item">
          <Item item={item} mode={mode} onAddToBasket={onAddToBasket} onDeleteFromBasket={onDeleteFromBasket}/>
        </div>
      ))}
    </div>
  );
}

List.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.number,
    }),
  ).isRequired,
  mode: PropTypes.string,
  onAddToBasket: PropTypes.func,
  onDeleteFromBasket: PropTypes.func,
};

export default React.memo(List);
