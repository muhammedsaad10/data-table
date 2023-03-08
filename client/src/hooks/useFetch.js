import axios from "axios";
import { useEffect, useState } from "react";

const useFetch = (url) => {
  const [data, setData] = useState([]);
  const [pages, setPages] = useState(1);
  //   const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const fetchData = async () => {
    try {
      console.log("URL", url);

      const res = await axios.get(url);
      console.log("RES:", res);
      setData(res.data.items);
      setPages(res.data.totalPages);
      console.log("pages to be rendered", res.data.totalPages);
      console.log("Response.Data", res.data);
    } catch (err) {
      setError(err);
    }
  };
  useEffect(() => {
    fetchData();
  }, [url]);
  console.log("your data:", data);
  return { data, pages, error, fetchData };
};
export default useFetch;
