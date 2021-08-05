import { useEffect, useState } from "react";
const useApiRequest = url => {
    const [data, setData] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      const fetchData = () => {
          fetch(url, {method:"GET"})
          .then(response=> response.json())
          .then(data => {
            setIsLoaded(true);
            setData(data);
          })
          .catch(error => {
            setError(error);
           // openNotification({type:'error',message:error,description:""})

          });
      };
      fetchData();
    }, [url]);
  
    return { error, isLoaded, data };
  };
export default useApiRequest