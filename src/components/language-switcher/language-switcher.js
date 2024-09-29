import React from 'react'
import PropTypes from 'prop-types';
import { language } from '../../store/exports';

function LanguageSwitcher({switchLanguage, languageMode}) {

    function handleChange(event) {
      switchLanguage(event.target.value);
    }
    return ( 
        <select value={languageMode} onChange={handleChange}>
            <option value='ru'>RU</option>
            <option value='en'>EN</option>
        </select>
    );
}

LanguageSwitcher.propTypes = {
    switchLanguage: PropTypes.func,
    languageMode: PropTypes.string,
};

export default React.memo(LanguageSwitcher);