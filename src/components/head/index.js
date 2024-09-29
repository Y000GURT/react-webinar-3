import { memo } from 'react';
import PropTypes from 'prop-types';
import LanguageSwitcher from '../language-switcher/language-switcher';
import './style.css';

function Head({ title, switchLanguage, languageMode }) {
  return (
    <div className="Head">
      <h1>{title}</h1>
      <LanguageSwitcher switchLanguage={switchLanguage} languageMode={languageMode}/>
    </div>
  );
}

Head.propTypes = {
  title: PropTypes.node,
  switchLanguage: PropTypes.func,
  languageMode: PropTypes.string,
};

export default memo(Head);
