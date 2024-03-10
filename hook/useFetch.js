import { useState, useEffect } from 'react'
import axios from 'axios'

const useFetch = () => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchData = async () => {
        setIsLoading(true)
        try {
            const response = await axios.get('http://192.168.1.2:3000/api/products/')
            //const response = await axios.get('http://172.20.10.2:3000/api/products/')  
            //console.log(response.data);
            setData(response.data)
        } catch(error) {
            console.error('Error fetching data:', error);
            setError(error)
        }finally{
            setIsLoading(false)
        }
    }
    
    useEffect(()=> {
        fetchData()
    }, []); // Only run once when the component mounts 

    const refetch = () => {
        setIsLoading(true);
        fetchData();
    };

    return { data, isLoading, error, refetch };
};

export default useFetch;
