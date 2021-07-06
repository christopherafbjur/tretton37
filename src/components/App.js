import React, { useEffect, useState, useRef, useCallback } from 'react';
import useEmployeePopulate from '../hooks/useEmployeePopulate';
import Container from './Container';

function App() {
  const [query, setQuery] = useState({ office: '' });
  const [pageNumber, setPageNumber] = useState(1);
  const { loading, error, employees, hasMore } = useEmployeePopulate(pageNumber, query);

  const observer = useRef();
  const lastEmployeeElementRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      // eslint-disable-next-line no-undef
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          console.log('Visible');
          setPageNumber((prevPageNumber) => prevPageNumber + 1);
        }
      });
      if (node) observer.current.observe(node);
      console.log(node);
    },
    [loading, hasMore]
  );

  const onQueryNameChange = (e) => {
    setQuery({ ...query, name: e.target.value });
    setPageNumber(1);
  };

  const onOfficeChange = (e) => {
    setQuery({ ...query, office: e.target.value });
    setPageNumber(1);
  };

  return (
    <>
      <input type="text" onChange={onQueryNameChange} />
      <select id="office" onChange={onOfficeChange} name="office">
        <option value="">Office</option>
        <option value="lund">Lund</option>
        <option value="helsingborg">Helsingborg</option>
        <option value="stockholm">Stockholm</option>
        <option value="svea">Svea</option>
        <option value="borlänge">Borlänge</option>
        <option value="ljubljana">Ljubljana</option>
        <option value="sales">Sales</option>
        <option value="developer">Developer</option>
      </select>
      {employees && <Container lastEmployeeRef={lastEmployeeElementRef} employees={employees} />}
      {loading && <h1>Loading</h1>}
      {error && <h1>Error</h1>}
    </>
  );
}

export default App;
