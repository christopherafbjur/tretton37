import React from 'react';
import PropTypes from 'prop-types';
import style from './ToolMenu.module.css';

function ToolMenu({ onQueryChange, onOfficeChange, onSortChange, onSortDirectionChange }) {
  return (
    <>
      <div className={style.mainWrapper}>
        <div className={style.toolWrapper}>
          <div className={style.filterWrapper}>
            <h4>Filter</h4>
            <input type="text" onChange={onQueryChange} placeholder="Name" />
            <select id="office" onChange={onOfficeChange} name="office">
              <option value="">Office</option>
              <option value="lund">Lund</option>
              <option value="helsingborg">Helsingborg</option>
              <option value="stockholm">Stockholm</option>
              <option value="borlänge">Borlänge</option>
              <option value="ljubljana">Ljubljana</option>
            </select>
          </div>
          <div className={style.sortWrapper}>
            <h4>Sort</h4>
            <select id="sortBy" onChange={onSortChange} name="sortBy">
              <option value="">Sort by</option>
              <option value="office">Office</option>
              <option value="name">Name</option>
            </select>
            <h4>Direction</h4>
            <select id="direction" onChange={onSortDirectionChange} name="direction">
              <option value="">Direction</option>
              <option value="ASC">Ascending</option>
              <option value="DESC">Descending</option>
            </select>
          </div>
        </div>
      </div>
    </>
  );
}

ToolMenu.propTypes = {
  onQueryChange: PropTypes.func.isRequired,
  onOfficeChange: PropTypes.func.isRequired,
  onSortChange: PropTypes.func.isRequired,
  onSortDirectionChange: PropTypes.func.isRequired,
};

export default ToolMenu;
