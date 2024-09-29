import React from 'react'
import PropTypes from 'prop-types';
import BasketTool from '../basket-tool';
import Head from '../head';


function MainMenu({title, onOpen, amount, sum, resource, switchLanguage, languageMode}) {
    return ( 
        <>
            <Head title={title} switchLanguage={switchLanguage} languageMode={languageMode}/>
            <BasketTool onOpen={onOpen} amount={amount} sum={sum} resource={resource}/>
        </>
    );
}
MainMenu.propTypes = {
    title: PropTypes.string,
    onOpen: PropTypes.func,
    amount: PropTypes.number,
    sum: PropTypes.number,
    resource: PropTypes.object,
    switchLanguage: PropTypes.func,
    languageMode: PropTypes.string,
}

export default MainMenu;