import React, { useCallback, useEffect } from 'react'
import PageLayout from '../../components/page-layout';
import Header from '../../containers/header';
import Navigation from '../../containers/navigation';
import LoginForm from '../../components/login-form';
import useTranslate from '../../hooks/use-translate';
import useSelector from '../../hooks/use-selector';
import useStore from '../../hooks/use-store';
import { useNavigate, useLocation } from 'react-router-dom';

function AuthPage() {
    const { t } = useTranslate();
    const store = useStore();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        store.actions.auth.clearErrors();
    }, [location]);

    const select = useSelector(state => ({
        error: state.auth.errorMessage
    }))

    async function handleClickLogin(userData) {
        await store.actions.auth.login(userData)

        if (store.getState().auth.errorMessage === '') {
            navigate('/profile')
        }
    }
    const callbacks = {
        // Вход и переход на страницу профиля
        onLogin: useCallback((userData) => handleClickLogin(userData), [store]),
    }

    return (
        <PageLayout>
            <Header title={t('title')} auth={t('auth')}/>
            <Navigation />
            <LoginForm 
                login={t('login')} 
                password={t('password')} 
                logIn={t('logIn')} 
                onLogin={callbacks.onLogin} 
                error={select.error}
            />
        </PageLayout>
    );
}

export default React.memo(AuthPage);
