import React from 'react'
import SideLayout from '../side-layout';


function ProfileInfo({name, phone, email}) {
    return ( 
        <SideLayout padding="medium" side="start">
            <div className='ProfileInfo'>
                <h1 >Профиль</h1>
                <p>Имя: <strong>{name}</strong></p>
                <p>Телефон: <strong>{phone}</strong></p>
                <p>email: <strong>{email}</strong></p>
            </div>
        </SideLayout>
    );
}

export default React.memo(ProfileInfo);