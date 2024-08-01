import { useState, useEffect } from 'react'
import axios from 'axios'
import { useIsFocused } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { useAuth } from '../components/auth/AuthProvider';

const useFetch = ({ supplierId, userLogin }) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  // const [userData, setUserData] = useState(null)
  //const [userLogin, setUserLogin] = useState(false)
  //const [done, setDone] = useState(false)
  //  const isFocused = useIsFocused()
  //const { userLogin, userData } = useAuth();

  //console.log("supplierID in  useFetch: ", supplierId);
  //console.log("userLogin in useFetch: ",userLogin)



  const fetchData = async () => {
    setIsLoading(true)
    try {
      let response;
      if (supplierId) {
        //console.log("I'm in if statement === supplierID in  useFetch: ", supplierId);
        //const supplierId= '65f00a54b75c0d5c0476802e'
        //const supplierId= userData._id
        response = await axios.get(`http://192.168.1.4:3000/api/products/supplierId/${supplierId}`);
       // response = await axios.get(`http://172.20.10.2:3000/api/products/supplierId/${supplierId}`);
      } else if (supplierId==null ){
        //console.log("i'm in else statement ----- supplierID in  useFetch: ", supplierId);
       response = await axios.get('http://192.168.1.4:3000/api/products/');
        //response = await axios.get('http://172.20.10.2:3000/api/products/') 
      }

      //const response = await axios.get('http://192.168.1.2:3000/api/products/')
      //const response = await axios.get(`http://192.168.1.2:3000/api/products/supplierId/${supplierId}`)
      //const response = await axios.get('http://172.20.10.2:3000/api/products/')  
      //console.log(response.data);

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

export default useFetch;
