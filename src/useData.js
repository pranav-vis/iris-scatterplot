import React, {
    useState,
    useCallback,
    useEffect,
  } from 'react';
  import { csv } from 'd3';
  
  export const useData = () => {
    const csvUrl =
      'https://gist.githubusercontent.com/curran/a08a1080b88344b0c8a7/raw/iris.csv';
  
    const [data, setData] = useState(null);
    useEffect(() => {
      const row = (d) => {
        d.sepal_length = +d.sepal_length;
        d.sepal_width = +d.sepal_width;
        d.petal_length = +d.petal_length;
        d.petal_width = +d.petal_width;
        return d;
      };
      csv(csvUrl, row).then((data) => setData(data));
    }, []);
  
    return data;
  };
  