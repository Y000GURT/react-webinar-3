import React from 'react'
import { cn as bem } from '@bem-react/classname';
import './style.css';

function CommentsList({ children }) {
    const cn = bem('CommentsList');

    return ( 
        <div className={cn()}>
            { children}
        </div>
    );
}

export default CommentsList;