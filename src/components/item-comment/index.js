import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom';
import { cn as bem } from '@bem-react/classname';
import FormComment from '../form-comment';
import useTranslate from '../../hooks/use-translate';
import './style.css';

function ItemComment({ id, name, text, datetime, level, answer, exists, setIdActiveAnswer, idActiveAnswer, sendComment }) {
    const cn = bem('ItemComment');
    const { t } = useTranslate();
    
    const computedLevel = useMemo(() => {
        if (level > 4) return 4;
        return level
    })
    
    return ( 
        <div className={cn() + ' ' + cn(`level-${computedLevel}`)}>
            <div className={cn('header')}>
                <div className={cn('user')}>{ name }</div>
                <div className={cn('datetime')}> { datetime }</div>
            </div>
            <div className={cn('text')}>
                { text }
            </div>
            <span className={cn('answer')} onClick={() => setIdActiveAnswer(id)}>{ answer }</span>
            {
                idActiveAnswer === id ?
                (
                    exists ? 
                    <FormComment 
                        mode="answer" 
                        title={t('form.comment.title')} 
                        id={id} 
                        setIdActiveAnswer={setIdActiveAnswer}
                        sendComment={sendComment} 
                        type='comment'
                    />
                    :
                    <div className={cn('login')}> 
                        <span><Link to="/login">Войдите</Link>, чтобы оставлять комментарии. </span>
                        <span className={cn('cancel')} onClick={() => setIdActiveAnswer(null)}>Отмена</span>
                    </div> 
                )
                :
                null
            }

        </div>
    );
}

ItemComment.propTypes = {
    name: PropTypes.string,
    text: PropTypes.string,
    datetime: PropTypes.string,
    level: PropTypes.number,
    answer: PropTypes.string,
    exists: PropTypes.bool,
    setIdActiveAnswer: PropTypes.func,
    idActiveAnswer: PropTypes.string,
    sendComment: PropTypes.func
}

export default React.memo(ItemComment);