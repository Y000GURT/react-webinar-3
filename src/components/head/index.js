import { memo } from 'react';
import PropTypes from 'prop-types';
import useStore from '../../store/use-store';
import './style.css';

function Head({ title }) {
  // const [language, setLanguage] = useState('ru');
  const store = useStore();

  function handleChange(event) {
    store.actions.language.switchLanguage(event.target.value);
  }
  return (
    <div className="Head">
      <h1>{title}</h1>
      <select onChange={handleChange}>
        <option value='ru'>RU</option>
        <option value='en'>EN</option>
      </select>
    </div>
  );
}

Head.propTypes = {
  title: PropTypes.node,
};

export default memo(Head);
