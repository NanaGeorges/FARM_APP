import { useState, useEffect } from 'react'
import axios from 'axios'

const useFetchCategory = ({category, supplierId, userLogin}) => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchData = async () => {
        setIsLoading(true)
        try {
            let response
            if (supplierId) {
                //const supplierId= '65f00a54b75c0d5c0476802e'
               //const supplierId= userData._id
                //response = await axios.get(`http://192.168.1.5:3000/api/products//supplierId/${supplierId}/category/${category}`)
               response = await axios.get(`http://172.20.10.2:3000/api/products//supplierId/${supplierId}/category/${category}`)
             } else if (supplierId===null){
                //response = await axios.get('http://192.168.1.5:3000/api/products/category/')
                response = await axios.get(`http://172.20.10.2:3000/api/products/category/${category}`)
             }

            //const response = await axios.get(`http://192.168.1.2:3000/api/products/category/${category}`)
            //const response = await axios.get('http://172.20.10.2:3000/api/products/category/')  
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

    useEffect(() => {
        if (supplierId !== null) {
          fetchData();
        }
    
      }, [supplierId, userLogin]); // Run the effect whenever supplierId or userLogin changes

    const refetch = () => {
        setIsLoading(true);
        fetchData();
    };

    return { data, isLoading, error, refetch };
};

export default useFetchCategory;
