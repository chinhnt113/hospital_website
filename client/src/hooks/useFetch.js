import { useEffect, useState } from "react";
import axios from "axios";
import { apiUrl, LOCAL_STORAGE_TOKEN_NAME } from "../contexts/constants";
import setAuthToken from "../utils/setAuthToken";

function useFetch(url, body) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setAuthToken(localStorage[LOCAL_STORAGE_TOKEN_NAME]);
      try {
        const res = await axios.get(`${apiUrl}${url}`, {params: body});
        setData(res.data);
      } catch (err) {
        setError(err);
      }
      setLoading(false);
    };
    fetchData();
  }, [url]);

  const reFetch = async () => {
    setLoading(true);
    try {
      const res = await axios.get(url);
      setData(res.data);
    } catch (err) {
      setError(err);
    }
    setLoading(false);
  };

  return { data, loading, error, reFetch };
};

export default useFetch;