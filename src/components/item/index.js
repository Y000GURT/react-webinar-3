import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

function Item({ item, onAddToBasket = () => {}}) {
  return (
    <div className='Item'>
      <div className='Item-left'>
        <div className="Item-code"> { item.code } </div>
        <div className="Item-title"> { item.title } </div>
      </div>

      <div className="Item-right">
        <div className='Item-price'> {item.price.toLocaleString('fr-FR') + ' ₽'} </div>
        <button onClick={() => onAddToBasket(item.code)}>Добавить</button>
      </div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    selected: PropTypes.bool,
    count: PropTypes.number,
  }).isRequired,
  onAddToBasket: PropTypes.func,
};

export default React.memo(Item);
