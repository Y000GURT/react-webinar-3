import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { cn as bem } from '@bem-react/classname';
import useTranslate from '../../hooks/use-translate';
import './style.css';
import { Form } from 'react-router-dom';

function FormComment({ mode, title, id, setIdActiveAnswer = () => {}, sendComment, type }) {
    const cn = bem('FormComment');
    const { t } = useTranslate();
    const [text, setText] = useState('');

    function handleCansel(e) {
        e.preventDefault();
        setIdActiveAnswer(null)
    }

    function handleAnswer(e) {
        e.preventDefault();
        sendComment({ text, parent: { _id: id, _type: type } });
    }
    return ( 
        <form className={cn()}>
            <h6 className={cn('title')}>{ title }</h6>
            <textarea className={cn('textarea')} rows="5" onChange={e => setText(e.target.value)} value={text}></textarea>
            <div className={cn('actions')}>
                <button className={cn('submit')} onClick={handleAnswer}>{t('form.comment.submit')}</button>
                {
                    mode === 'answer' ?
                    <button className={cn('cancel')} onClick={handleCansel}>{t('form.answer.cancel')}</button>
                    :
                    null
                }
            </div>
        </form>
     );
}

FormComment.propTypes = {
    mode: PropTypes.string,
    title: PropTypes.string,
    id: PropTypes.string,
    setIdActiveAnswer: PropTypes.func,
    sendComment: PropTypes.func,
    type: PropTypes.string
}

export default FormComment;