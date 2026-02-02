import React, { useContext, useEffect } from 'react'
import './Verify.css'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';

const Verify = () => {

    const [searchParams,setSearchParams] = useSearchParams();
    const success = searchParams.get("success")
    const orderId = searchParams.get("orderId")
    const {url} = useContext(StoreContext);
    const navigate = useNavigate();

    const verifyPayment = async () => {
    try {
        console.log("Request bhej rahe hain is URL par:", url + "/api/order/verify");
        const response = await axios.post(url + "/api/order/verify", { success, orderId });
        console.log("Backend se response aaya:", response.data);
        
        if (response.data.success) {
            navigate("/myorders");
        } else {
            navigate("/");
        }
    } catch (error) {
        console.error("CRITICAL ERROR IN FRONTEND:", error);
        // navigate("/"); // Filhal ise comment kar do taaki error dikhe
    }
}


    useEffect(()=>{
        verifyPayment();
    },[])

  return (
    <div className='verify'>
      <div className="spinner"></div>
    </div>
  )
}

export default Verify
