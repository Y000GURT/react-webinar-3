import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom';
import { cn as bem } from '@bem-react/classname';
import FormComment from '../form-comment';
import useTranslate from '../../hooks/use-translate';
import './style.css';

function ItemComment(props) {
    const cn = bem('ItemComment');
    const { t } = useTranslate();
    
    const computedLevel = useMemo(() => {
        if (props.level > 10) return 10;
        return props.level
    }, [props.level])
    
    const correctDatetime = useMemo(() => {
        const date = new Date(props.datetime);
        const options = {
            day: '2-digit',
            month: 'long',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        }
        return date.toLocaleDateString('ru-RU', options).replace(' г.', '');
    }, [props.datetime])

    function handleAnswer() {
        props.setFormAnswerIsActive(props.id)
        props.addForm(props.id, props.level)
    }
    return ( 
        <div className={cn() + ' ' + cn(`level-${computedLevel}`)}>
            <div className={cn('header')}>
                <div className={cn('user')}>{ props.name }</div>
                <div className={cn('datetime')}> { correctDatetime }</div>
            </div>
            <div className={cn('text')}>
                { props.text }
            </div>
            <span className={cn('answer')} onClick={handleAnswer}>{ props.answer }</span>
            {
                props.formAnswerIsActive && props.index1 === props.index2 &&
                <FormComment 
                    mode="answer" 
                    title={t('form.comment.title.answer')} 
                    sendComment={props.sendComment} 
                    exists={props.exists}
                    type='comment'
                    setFormCommentIsActive={props.setFormCommentIsActive}
                    currentCommentId={props.currentCommentId}
                    level={props.level}
                />
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