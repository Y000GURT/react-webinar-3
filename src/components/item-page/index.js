import React, {useCallback, useEffect, useState} from 'react'
import { useParams } from 'react-router-dom';
import { cn as bem } from '@bem-react/classname';
import useStore  from '../../store/use-store';
import useSelector from '../../store/use-selector';
import PageLayout from '../page-layout';
import Head from '../head';
import BasketTool from '../basket-tool';
import './style.css';

function ItemPage() {
    const store = useStore();
    

    const params = useParams()
    useEffect(() => {
        store.actions.modals.close()
        store.actions.catalog.loadOne(params.id);
    }, [params.id]);

    const cn = bem('ItemPage');

    const select = useSelector(state => ({
        item: state.catalog.item,
        amount: state.basket.amount,
        sum: state.basket.sum,
        language: state.language.languageMode,
    }));

    const callbacks = {
        addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
        openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
    };
    return ( 
        <div className={cn('content')}>
            <p>{ select.item.description }</p>
            <p>Страна производитель: <strong>{select.item.madeIn?.title} {select.item.madeIn?.code}</strong></p> 
            <p>Категория: <strong>{select.item.category?.title}</strong></p>
            <p>Год выпуска: <strong>{select.item.edition}</strong></p>
            <p><strong>Цена: {select.item.price} ₽</strong></p>
            <button onClick={() => callbacks.addToBasket(params.id)}>Добавить</button>
        </div>
    );
}

export default ItemPage;