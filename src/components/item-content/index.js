import React from 'react'
import PropTypes from 'prop-types';
import ItemDescription from '../item-description/item-description.js';
import './style.css';

function DescriptionContent({addToBasket, item, resource}) {
    return ( 
        <div className="DescriptionContent">
            <ItemDescription>{item.description}</ItemDescription>
            <ItemDescription>Страна производитель: <strong>{item.madeIn?.title} {item.madeIn?.code}</strong></ItemDescription>
            <ItemDescription>Категория: <strong>{item.category?.title}</strong></ItemDescription>
            <ItemDescription>Год выпуска: <strong>{item.edition}</strong></ItemDescription>
            <ItemDescription><strong>Цена: {item.price} ₽</strong></ItemDescription>
            <button onClick={() => addToBasket(item._id)}>{resource.add}</button>
        </div>

    );
}
DescriptionContent.propTypes = {
    addToBasket: PropTypes.func,
    item: PropTypes.shape({
        _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        title: PropTypes.string,
        price: PropTypes.number,
        edition: PropTypes.number,
        description: PropTypes.string,
        madeIn: PropTypes.shape({
            title: PropTypes.string,
            code: PropTypes.string
        }),
        category: PropTypes.shape({
            title: PropTypes.string
        })
    }).isRequired,
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
}
export default React.memo(DescriptionContent);