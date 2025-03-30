import React, { useEffect,useState } from 'react'
import { axiosInstance } from '../config/axiosinstance'

export const Usefetch = (url) => {

    const [data,SetData]=useState()
    const [isLoading,setIsLoading]=useState(true)
    const [error,setError] = useState(null)
 
   const fetchData =async()=>{
           try {
              const response = await axiosInstance({method:"GET",url:url})
              console.log("===response",response)
              SetData(response?.data?.data);
   
           setIsLoading(false)
           } catch (error) {
               console.log(error)
               setError(error)
           }
       };
 
       useEffect(()=>{
         fetchData();
       },[]);



  return [data,isLoading,error]
}


