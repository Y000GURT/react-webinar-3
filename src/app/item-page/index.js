import React, {useCallback, useEffect, useState} from 'react'
import { useParams } from 'react-router-dom';
import useStore  from '../../store/use-store';
import useSelector from '../../store/use-selector';
import PageLayout from '../../components/page-layout';
import MainMenu from '../../components/main-menu';
import ItemContent from '../../components/item-content';

function ItemPage() {
    const store = useStore();
    const params = useParams()
    const resource = store.actions.language.getResources();
    useEffect(() => {
        store.actions.modals.close()
        store.actions.catalog.loadOne(params.id);
        
        return () => store.actions.catalog.clearItem();
    }, [params.id]);
    
    const select = useSelector(state => ({
        item: state.catalog.item,
        amount: state.basket.amount,
        sum: state.basket.sum,
        languageMode: state.language.languageMode,
    }));

    const callbacks = {
        addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
        openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
        switchLanguage: useCallback(language => store.actions.language.switchLanguage(language), [store]),
    };
    return ( 
        <PageLayout>
            <MainMenu 
                title={select.item.title} 
                onOpen={callbacks.openModalBasket} 
                amount={select.amount} 
                sum={select.sum} 
                resource={resource} 
                switchLanguage={callbacks.switchLanguage}
                languageMode={select.languageMode}
            />
            <ItemContent item={select.item} addToBasket={callbacks.addToBasket} resource={resource}/>
        </PageLayout>
    );
}

export default React.memo(ItemPage);