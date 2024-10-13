import React from 'react'
import { cn as bem } from '@bem-react/classname';
import './style.css';

function CommentsLayout({ children, count, title }) {
    const cn = bem('CommentsLayout');

    return ( 
        <div className={cn()}>
            <h2 className={cn('header')}>{title} ({count}) </h2>
            { children }
        </div>
    );
}

export default CommentsLayout;