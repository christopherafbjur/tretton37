import React, { useEffect } from 'react';
import api from '../services/api';

function App() {
  useEffect(() => {
    async function getEmployeesFn() {
      let employees = null;
      try {
        employees = await api();
        console.log(employees);
      } catch (ex) {
        console.log(ex);
      }
    }
    getEmployeesFn();
  }, []);

  return <h1>Hello Tretton37</h1>;
}

export default App;
