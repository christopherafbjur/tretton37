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

  useEffect(() => {
    setLoading(true);
    setError(false);
    let cancel;

    axios({
      method: 'GET',
      url: `${BASE_URL}/employees`,
      params: {
        query: queryOptions.searchQuery,
        office: queryOptions.office,
        sortBy: queryOptions.sortBy,
        sortDir: queryOptions.sortDir,
        limit: ITEM_LOAD_LIMIT,
        offset: ITEM_LOAD_LIMIT * pageNumber,
        cancelToken: new axios.CancelToken((c) => {
          cancel = c;
        }),
      },
    })
      .then((res) => {
        setEmployees((prevEmployees) => [...prevEmployees, ...res.data]);
        setHasMore(res.data.length > 0);
        setLoading(false);
      })
      .catch((ex) => {
        setError(true);
        console.error(ex);
      });
    return () => cancel();
  }, [queryOptions, pageNumber]);

  return { loading, error, employees, hasMore };
}
