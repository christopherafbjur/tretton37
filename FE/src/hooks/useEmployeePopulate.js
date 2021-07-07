import { useEffect, useState } from 'react';
import axios from 'axios';

const ITEM_LOAD_LIMIT = 10;
const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';

export default function useEmployeeSearch(pageNumber, queryOptions) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [employees, setEmployees] = useState([]);
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    setEmployees([]);
  }, [queryOptions]);

  console.log(queryOptions, pageNumber);
  useEffect(() => {
    setLoading(true);
    setError(false);

    axios({
      method: 'GET',
      url: `${BASE_URL}/employees`,
      params: {
        query: queryOptions.searchQuery,
        office: queryOptions.office || 'stockholm',
        limit: ITEM_LOAD_LIMIT,
        offset: ITEM_LOAD_LIMIT * pageNumber,
      },
    })
      .then((res) => {
        setEmployees((prevEmployees) => [...prevEmployees, ...res.data]);
        setHasMore(res.data.length > 0);
        setLoading(false);
      })
      .catch((ex) => {
        console.log(ex);
        setError(true);
      });
  }, [queryOptions, pageNumber]);

  return { loading, error, employees, hasMore };
}
