import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const useFetchRow = ({ userLogin, offline }) => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
  
  
  
  
    const fetchData = async () => {
      setIsLoading(true)
      try {
        let response;
        const parsedId = JSON.parse(id);
        const userId = `user${parsedId._id}`;
        const currentUser = await AsyncStorage.getItem(userId);
        const parsedData = JSON.parse(currentUser);
        const supplierId= parsedData._id;
        if (supplierId!==null) {
          response = await axios.get(`http://192.168.1.4:3000/api/products/supplierId/${supplierId}`);
          //response = await axios.get(`http://172.20.10.2:3000/api/products/supplierId/${supplierId}`);
        } else if (supplierId===null){
          console.log("i'm in else statement ----- supplierID in  useFetch: ", supplierId);
          response = await axios.get('http://192.168.1.4:3000/api/products/');
         //response = await axios.get('http://172.20.10.2:3000/api/products/') 
        }
  
        setData(response.data)
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(error)
      } finally {
        setIsLoading(false)
      }
    }
  
    /*   const checkExistingUser = async () => {
      try {
        const id = await AsyncStorage.getItem('id');
    
        // Logging id to ensure it's not null
        console.log('id:', id);
    
        if (id !== null) {
          const parsedId = JSON.parse(id);
          // Logging parsedId to ensure it's not null
          //console.log('parsedId:', parsedId);
    
          const userId = `user${parsedId._id}`;
          const currentUser = await AsyncStorage.getItem(userId);
    
          if (currentUser !== null) {
            const parsedData = JSON.parse(currentUser);
            setUserData(parsedData);
            setUserLogin(true);
          }
        }
      } catch (error) { 
        console.log("Error retrieving the data", error);
      }
    }; 
     */
  
    useEffect(() => {
      //checkExistingUser();
      fetchData()
    }, []); // Only run once when the component mounts 
  
    useEffect(() => {
      if (supplierId !== null) {
        fetchData();
      }
  
    }, [supplierId, userLogin]); // Run the effect whenever supplierId or userLogin changes
  
  
    /* useEffect(() => {
      if (userLogin) {
        fetchData();
      }
    }, [userLogin]); */
  
    const refetch = () => {
      setIsLoading(true);
      // checkExistingUser();
      fetchData();
    };
    
    return { data, isLoading, error, refetch };
  };

export default useFetchRow

