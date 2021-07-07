import { useEffect, useState } from 'react';
import axios from 'axios';

const ITEM_LOAD_LIMIT = 10;

export default function useEmployeeSearch(pageNumber, query) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [cached, setCached] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    // Responsible for caching all employees in a initial request since no limit/sort params available for API

    setLoading(true);
    setError(false);

    axios({
      method: 'GET',
      url: process.env.REACT_APP_API_URL,
      headers: {
        Authorization: `${process.env.REACT_APP_API_KEY}`,
      },
    })
      .then((res) => {
        setCached(res.data);
        setLoading(false);
      })
      .catch((ex) => {
        console.log(ex);
        setError(true);
      });
  }, []);

  useEffect(() => {
    setEmployees([]);
  }, [query]);

  useEffect(() => {
    setEmployees((prevEmployees) => {
      // Filter by name
      let filtered = cached.filter(
        ({ name = '' }) => !query.name || name.toLowerCase().startsWith(query.name)
      );

      // Filter by office
      filtered = filtered.filter(
        ({ office = '' }) =>
          !query.office || (office && office.toLowerCase().startsWith(query.office))
      );

      const inView = [...filtered.slice(0, pageNumber * ITEM_LOAD_LIMIT)];

      setHasMore(inView.length < filtered.length);

      return inView;
    });
  }, [cached, query, pageNumber]);
  return { loading, error, employees, hasMore };
}
