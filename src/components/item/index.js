import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './style.css';

function Item({ item, mode = 'page', onAddToBasket = () => {}, onDeleteFromBasket = () => {}}) {
  return (
    <div className='Item'>
      <div className='Item-left'>
        <div className="Item-code"> { item.code } </div>
        <div className="Item-title"> { item.title } </div>
      </div>

      {
        mode === 'modal'
        ?
        <div className="Item-right">
          <div className='Item-price'> {item.price + ' ₽'} </div>
          <div className='Item-price'> {item.quantity + ' шт'} </div>
          <button onClick={() => onDeleteFromBasket(item.code)}>Удалить</button>
        </div>
        :
        <div className="Item-right">
          <div className='Item-price'> {item.price + ' ₽'} </div>
          <button onClick={() => onAddToBasket(item)}>Добавить</button>
        </div>
      }
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
  mode: PropTypes.string,
  onAddToBasket: PropTypes.func,
  onDeleteFromBasket: PropTypes.func,
};

export default React.memo(Item);
