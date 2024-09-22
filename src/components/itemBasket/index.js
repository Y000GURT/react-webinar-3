import React from 'react';
import PropTypes from 'prop-types';
import '../item/style.css';

function ItemBasket({ item, onDeleteFromBasket = () => {}}) {
    return ( 
        <div className='Item'>
            <div className='Item-left'>
                <div className="Item-code"> { item.code } </div>
                <div className="Item-title"> { item.title } </div>
            </div>
    
            <div className="Item-right">
                <div className='Item-price'> {item.price.toLocaleString('fr-FR') + ' ₽'} </div>
                <div className='Item-price'> {item.quantity + ' шт'} </div>
                <button onClick={() => onDeleteFromBasket(item.code)}>Удалить</button>
            </div>
      </div>
    );
}

ItemBasket.propTypes = {
    item: PropTypes.shape({
      code: PropTypes.number,
      title: PropTypes.string,
      selected: PropTypes.bool,
      count: PropTypes.number,
    }).isRequired,
    onDeleteFromBasket: PropTypes.func,
};

export default React.memo(ItemBasket);