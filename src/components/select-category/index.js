import React from 'react'
import PropTypes from 'prop-types'
import './style.css'

function SelectCategory({ category, onChange, value }) {
    function onSelect(e) {
        onChange(e.target.value);
    }
    return ( 
        <select className='SelectCategory' onChange={onSelect} value={value}>
            <option value=''>Всe</option>
            {
                category.map(item => (
                    <option key={item._id} value={item._id}>
                        {item.title}
                    </option>
                ))
            }
        </select>
    );
}

SelectCategory.propTypes = {
    category: PropTypes.arrayOf(
        PropTypes.shape({
            _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
            title: PropTypes.string,
        }),
    ).isRequired,
    onChange: PropTypes.func,
    value: PropTypes.string,
}
export default React.memo(SelectCategory);