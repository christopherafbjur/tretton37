import React from 'react';
import PropTypes from 'prop-types';
import Card from './Card';
import style from './Container.module.css';

// eslint-disable-next-line react/prop-types
function Container({ employees, lastEmployeeRef }) {
  return (
    <div className={style.container}>
      {employees &&
        employees.map((employee, index) => {
          if (index === employees.length - 1) {
            return <Card lastEmployeeRef={lastEmployeeRef} employee={employee} />;
          }
          return <Card employee={employee} />;
        })}
    </div>
  );
}

Container.propTypes = {
  employees: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Container;
