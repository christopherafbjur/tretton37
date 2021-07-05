import React from 'react';
import PropTypes from 'prop-types';
import Card from './Card';

function Container({ employees }) {
  return <div>{employees && employees.map((employee) => <Card employee={employee} />)}</div>;
}

Container.propTypes = {
  employees: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Container;
