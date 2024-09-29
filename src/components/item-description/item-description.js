import React from 'react'

function ItemDescription({ children }) {
    return ( 
        <p>
            { children }
        </p>
    );
}

export default React.memo(ItemDescription);