import React from 'react'
import { useCallback } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom';
import ItemComment from '../../components/item-comment';
import { cn as bem } from '@bem-react/classname';
import useTranslate from '../../hooks/use-translate';
import useSelector from '../../hooks/use-selector';
import { useSelector as useSelectorRedux } from 'react-redux';
import { useStore as useStoreRedux } from 'react-redux';
import { useDispatch } from 'react-redux';
import commentsActions from '../../store-redux/comments/actions';
import FormComment from '../../components/form-comment';
import './style.css';

function Comments({ comments, count, productId }) {
    const cn = bem('Comments');
    const { t } = useTranslate();
    const store = useStoreRedux();
    const dispatch = useDispatch();

    const select = useSelector(state => ({
        exists: state.session.exists,
        profile: state.profile.dataб
    }));
    const selectRedux = useSelectorRedux(state => ({
        data: state.comments.data,
        idActiveAnswer: state.comments.idActiveAnswer
    }))

    const callbacks = {
        // Установка идентификатора для ответа на комментарий
        setIdActiveAnswer: useCallback((id) => {
            dispatch(commentsActions.setIdActiveAnswer(id));
        }, [store]),
        sendComment: useCallback(comment => {
            dispatch(commentsActions.send({...comment}))
        }, [store]),
      };

    return ( 
        <div className={cn()}>
            <h2 className={cn('header')}>{t('comments.title')} ({count})</h2>
            <div className={cn('list')}>
                {
                    comments.map((item) => (
                        item.value &&
                        <ItemComment 
                            id={item.value}
                            name={item.name} 
                            text={item.text}  
                            key={item.value} 
                            datetime={item.datetime}
                            level={item.level}
                            answer={t('comments.answer')}
                            exists={select.exists}
                            setIdActiveAnswer={callbacks.setIdActiveAnswer}
                            idActiveAnswer={selectRedux.idActiveAnswer}
                            sendComment={callbacks.sendComment}
                        />   
                    ))

                }
                {
                    select.exists 
                    ?
                    <FormComment 
                        mode='comment' 
                        title={t('form.comment.title')}
                        id={productId}
                        sendComment={callbacks.sendComment}
                        type='article'

                    />
                    :
                    <div> <Link to='/login'>Войдите</Link>, чтобы иметь возможность комментировать</div>
                }
            </div>


        </div>
     );
}

Comments.propTypes = {
    comments: PropTypes.array,
    count: PropTypes.number,
    productId: PropTypes.string
}

export default React.memo(Comments)