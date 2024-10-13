import React, { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import { cn as bem } from '@bem-react/classname';
import useTranslate from '../../hooks/use-translate';
import { Link, useNavigate } from 'react-router-dom';
import './style.css';

function FormComment({ mode, title, id = '', sendComment, type, exists, setFormCommentIsActive = () => {}, currentCommentId, level = null }) {
    const cn = bem('FormComment');
    const { t } = useTranslate();
    const navigate = useNavigate();
    const [text, setText] = useState('');
    const formRef = useRef(null);

    useEffect(() => {
        if (formRef.current && mode === 'answer') {
            formRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [])
    
    function handleCansel(e) {
        e.preventDefault();
        setFormCommentIsActive();
    }
    function signIn() {
        navigate('/login', { state: { back: location.pathname }});
    }
    
    function handleAnswer(e) {
        e.preventDefault();
        if (!text.replace(/\s+/g, '')) {
            return;
        }
        if (mode === 'answer') {
            sendComment({ text, parent: { _id: currentCommentId, _type: type } });
        }
        else {
            sendComment({ text, parent: { _id: id, _type: type } });
        }
    }

    return (     
        <>
            {
                exists ?
                <form className={cn()} ref={formRef}>
                    <h6 className={cn('title')}>{ title }</h6>
                    <textarea className={cn('textarea')} rows="5" onChange={e => setText(e.target.value)} value={text}></textarea>
                    <div className={cn('actions')}>
                        <button className={cn('submit')} onClick={handleAnswer}>{t('form.comment.submit')}</button>
                        {
                            mode === 'answer' ?
                            <button onClick={handleCansel}>{t('form.answer.cancel')}</button>
                            :
                            null
                        }
                    </div>
                </form>
                :
                <>
                    {
                        mode === 'answer' ?
                        <div className={cn('login')}> <a onClick={signIn}>Войдите</a>, чтобы иметь возможность ответить. 
                            <span className={cn('cancel')} onClick={handleCansel}> Отмена</span>
                        </div>
                        :
                        <div className={cn('login')}> <a onClick={signIn}>Войдите</a>, чтобы иметь возможность комментировать</div>
                    }
                </>
            }
        </>
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

export default React.memo(FormComment);