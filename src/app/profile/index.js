import React, {useEffect} from 'react'
import PageLayout from '../../components/page-layout';
import Header from '../../containers/header';
import Navigation from '../../containers/navigation';
import ProfileInfo from '../../components/profile-info';
import useTranslate from '../../hooks/use-translate';
import useSelector from '../../hooks/use-selector';

function Profile() {
    const { t } = useTranslate();

    const select = useSelector(state => ({
        user: state.auth.user,
    }));

    return ( 
        <PageLayout>
            <Header title={t('title')} auth={t('auth')}/>
            <Navigation />
            <ProfileInfo name={select.user.name} phone={select.user.phone} email={select.user.email} />
        </PageLayout>
    );
}

export default React.memo(Profile);