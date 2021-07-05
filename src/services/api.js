import axios from 'axios';

export default function fetchUsers() {
  const url = process.env.REACT_APP_API_URL;
  const token = process.env.REACT_APP_API_KEY;

  return axios.get(url, {
    headers: {
      Authorization: `${token}`,
    },
  });
}
