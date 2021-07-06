import React, { useEffect, useState, useRef, useCallback } from 'react';
import useEmployeePopulate from '../hooks/useEmployeePopulate';
import Container from './Container';

function App() {
  const [query, setQuery] = useState({});
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

  const onQueryChange = (e) => {
    setQuery({ ...query, name: e.target.value });
    setPageNumber(1);
  };

  return (
    <>
      <input type="text" onChange={onQueryChange} />
      {employees && <Container lastEmployeeRef={lastEmployeeElementRef} employees={employees} />}
      {loading && <h1>Loading</h1>}
      {error && <h1>Error</h1>}
    </>
  );
}

export default App;
