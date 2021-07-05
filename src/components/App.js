import React, { useEffect, useState } from 'react';
import api from '../services/api';
import Container from './Container';

function App() {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    async function fetchData() {
      let response = null;
      try {
        response = await api();
        setEmployees(response.data);
      } catch (ex) {
        console.error(ex);
      }
    }
    fetchData();
  }, []);

  return (
    <>
      <Container employees={employees} />
    </>
  );
}

export default App;
