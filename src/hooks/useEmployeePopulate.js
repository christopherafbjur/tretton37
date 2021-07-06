import { useEffect, useState } from 'react';
import axios from 'axios';

export default function useEmployeeSearch(pageNumber) {
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
    const limit = 10;
    setEmployees((prevEmployees) => {
      const updated = [
        ...prevEmployees,
        ...cached.slice(prevEmployees.length, prevEmployees.length + limit),
      ];

      setHasMore(updated.length < cached.length);

      return updated;
    });
  }, [cached, pageNumber]);
  return { loading, error, employees, hasMore };
}
