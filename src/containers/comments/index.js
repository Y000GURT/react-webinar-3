import React, { useMemo} from 'react'
import { useCallback } from 'react'
import PropTypes from 'prop-types'
import { Link, useParams } from 'react-router-dom';
import ItemComment from '../../components/item-comment';
import { cn as bem } from '@bem-react/classname';
import useTranslate from '../../hooks/use-translate';
import useSelector from '../../hooks/use-selector';
import { useSelector as useSelectorRedux } from 'react-redux';
import { useStore as useStoreRedux } from 'react-redux';
import { useDispatch } from 'react-redux';
import shallowequal from 'shallowequal';
import commentsActions from '../../store-redux/comments/actions';
import FormComment from '../../components/form-comment';
import treeToList from '../../utils/tree-to-list';
import listToTree from '../../utils/list-to-tree';
import './style.css';

function Comments() {
    const cn = bem('Comments');
    const { t } = useTranslate();
    const store = useStoreRedux();
    const dispatch = useDispatch();
    const params = useParams();

    const select = useSelector(state => ({
        exists: state.session.exists,
        name: state.session.user.profile.name,
    }));
    const selectRedux = useSelectorRedux(state => ({
        count: state.comments.count,
        comments: state.comments.data,
        index: state.comments.index,
        formCommentIsActive: state.comments.formCommentIsActive,
        formAnswerIsActive: state.comments.formAnswerIsActive,
        currentCommentId: state.comments.currentCommentId,
    }),
    shallowequal,
    );

    const callbacks = {
        // Установка идентификатора для ответа на комментарий
        setIdActiveAnswer: useCallback((id) => {
            dispatch(commentsActions.setIdActiveAnswer(id));
        }, [store]),
        sendComment: useCallback((comment, name = select.name) => {
            dispatch(commentsActions.send({...comment}, name))
        }, [store]),
        setFormAnswerIsActive: useCallback((id) => {
            dispatch(commentsActions.setFormAnswerIsActive(id));
        }, [store]),
        setFormCommentIsActive: useCallback(() => {
            dispatch(commentsActions.setFormCommentIsActive());
        }),
        addForm: useCallback(( id, level, comments = options.comments) => {
            dispatch(commentsActions.addForm(id, level, comments));
        }, [store])
    };

    const options = {
    comments: useMemo(
        () => [
        ...treeToList(listToTree(selectRedux.comments), (item, level) => ({
            name: item.author?.profile?.name,
            datetime: item.dateCreate,
            value: item._id,
            text: item.text,
            level: level,
            mode: 'comment'
        })),
        ],
        [select.comments],
    ),
    };

    return ( 
        <div className={cn()}>
            <h2 className={cn('header')}>{t('comments.title')} ({selectRedux.count})</h2>
            <div className={cn('list')}>
                {
                    options.comments.map((item, index) => (

                        item.value &&
                        <ItemComment 
                            id={item.value}
                            name={item.name} 
                            text={item.text}  
                            key={item.value} 
                            datetime={item.datetime}
                            level={item.level}
                            answer={t('comments.answer')}
                            index1={selectRedux.index}
                            index2={index}
                            exists={select.exists}
                            formAnswerIsActive={selectRedux.formAnswerIsActive}
                            setFormAnswerIsActive={callbacks.setFormAnswerIsActive}
                            setFormCommentIsActive={callbacks.setFormCommentIsActive}
                            addForm={callbacks.addForm}
                            sendComment={callbacks.sendComment}
                            currentCommentId={selectRedux.currentCommentId}
                        />
                      
                    ))
                }
            </div>
            {
                selectRedux.formCommentIsActive &&
                <FormComment 
                    mode='comment' 
                    title={t('form.comment.title.comment')}
                    id={params.id}
                    sendComment={callbacks.sendComment}
                    type='article'
                    exists={select.exists}
                />
            }
        </div>
     );
}

export default React.memo(Comments)