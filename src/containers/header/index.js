import React, { useCallback } from 'react'
import { useNavigate  } from 'react-router-dom';
import Head from '../../components/head';
import Auth from '../../components/auth';
import LocaleSelect from '../locale-select';
import useSelector from '../../hooks/use-selector';
import useTranslate from '../../hooks/use-translate';
import useStore from '../../hooks/use-store';

function Header() {

    const navigate = useNavigate()
    const store = useStore();
    const select = useSelector(state => ({
        isAuth: state.auth.isAuth,
        name: state.auth.user.name
    }))
    const callbacks = {
        onAuth: useCallback(() => navigate('/auth'), [store]),
        logout: useCallback(() => {store.actions.auth.logout(); navigate('/auth')}, [store])
    }
    const { t } = useTranslate();
    return ( 
        <>
            <Auth 
                auth={select.isAuth ? t('logout') : t('auth')} 
                onAuth={select.isAuth ? callbacks.logout : callbacks.onAuth} 
                name={select.name} 
                isAuth={select.isAuth}
            />
            <Head title={t('title')}>
                <LocaleSelect />
            </Head>
        </>
    );
}

export default React.memo(Header);