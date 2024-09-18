import React from 'react';
import PropTypes from 'prop-types';
import { plural } from '../../utils';
import './style.css';

function Controls({ count, price, onOpen }) {
  return (
    <div className="Controls">

      <div className='Controls-basket'>В корзине:</div>
      {
        count
          ? <b className='Controls-info'>{count} {plural(count, {one: 'товар', few: 'товара', many: 'товаров'})} / {price} ₽</b>
          : <b className='Controls-info'>пусто</b>
      }
      <button className='Controls-button' onClick={onOpen}>Перейти</button>
    </div>
  );
}

Controls.propTypes = {
  count: PropTypes.number,
  price: PropTypes.number,
  onOpen: PropTypes.func,
};

export default React.memo(Controls);
