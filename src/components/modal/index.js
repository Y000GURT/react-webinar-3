import React from 'react'
import { useCallback } from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import Head from '../head'
import List from '../list'
import Store from '../../store'
import './style.css'

function Modal({store, show, toggleModal}) {
    if (!show) {
        return null;
    }

    const onDeleteFromBasket = useCallback(code => {
        store.deleteFromBasket(code)
    }, [store])
    
    const basket = store.getState().basket;

    return ReactDOM.createPortal(
        <div className="Modal-wrapper">
            <div className="Modal-content">
                <Head title="Корзина" mode="modal" onClose={toggleModal}></Head>

                <div className='Modal-list'>
                    {store.state.basket.length === 0
                    ?
                    <h2 className='Modal-empty'>Корзина пуста</h2>
                    :
                    <>
                        <List list={basket} mode='modal' onDeleteFromBasket={onDeleteFromBasket}/>
                        <div className='Modal-total'> 
                            <b>Итого</b>
                            <b>{store.getPriceBasket()} ₽</b>
                        </div>
                    </>
                    }
                </div>
            </div>
        </div>
        , document.body
      );
    };

Modal.propTypes = {
    store: PropTypes.instanceOf(Store).isRequired,
    show: PropTypes.bool.isRequired,
    toggleModal: PropTypes.func.isRequired,
}

export default Modal;