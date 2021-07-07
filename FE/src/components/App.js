import React, { useState, useRef, useCallback } from 'react';
import useEmployeePopulate from '../hooks/useEmployeePopulate';
import Container from './Container';
import ToolMenu from './ToolMenu';

function App() {
  const [query, setQuery] = useState({ office: '' });
  const [pageNumber, setPageNumber] = useState(0);
  const { loading, error, employees, hasMore } = useEmployeePopulate(pageNumber, query);

  const observer = useRef();
  const lastEmployeeElementRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      // eslint-disable-next-line no-undef
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPageNumber((prevPageNumber) => prevPageNumber + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  const handleQueryChange = (e) => {
    setQuery({ ...query, searchQuery: e.target.value });
    setPageNumber(0);
  };

  const handleOfficeChange = (e) => {
    setQuery({ ...query, office: e.target.value });
    setPageNumber(0);
  };

  const handleSortChange = (e) => {
    setQuery({ ...query, sortBy: e.target.value });
    setPageNumber(0);
  };

  const handleSortDirectionChange = (e) => {
    setQuery({ ...query, sortDir: e.target.value });
    setPageNumber(0);
  };

  return (
    <>
      <ToolMenu
        onQueryChange={handleQueryChange}
        onOfficeChange={handleOfficeChange}
        onSortChange={handleSortChange}
        onSortDirectionChange={handleSortDirectionChange}
      />
      {employees && <Container lastEmployeeRef={lastEmployeeElementRef} employees={employees} />}
      {loading && <h1>Loading</h1>}
      {error && <h1>Error</h1>}
    </>
  );
}

export default App;
