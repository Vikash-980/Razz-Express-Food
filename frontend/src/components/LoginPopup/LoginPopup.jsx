import React, { useContext, useState } from 'react'
import './LoginPopup.css'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../context/StoreContext'
import axios from "axios"

const LoginPopup = ({ setShowLogin }) => {

    const { url, setToken } = useContext(StoreContext)
    const [currState, setCurrState] = useState("Login")
    const [otp, setOtp] = useState("") 
    const [data, setData] = useState({ name: "", email: "", password: "" })

    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData(data => ({ ...data, [name]: value }))
    }

    const onLogin = async (event) => {
        event.preventDefault()
        let newUrl = url;

        if (currState === "Login") {
            newUrl += "/api/user/login"
            const response = await axios.post(newUrl, data);
            if (response.data.success) {
                alert("OTP sent to your email!");
                setCurrState("Verify OTP"); 
            } else {
                alert(response.data.message)
            }
        } 
        else if (currState === "Sign Up") {
            newUrl += "/api/user/register"
            const response = await axios.post(newUrl, data);
            if (response.data.success) {
                alert("Registration Successful! Please Login.");
                setCurrState("Login");
            } else {
                alert(response.data.message)
            }
        } 
        else if (currState === "Verify OTP") {
            newUrl += "/api/user/verify"
            const response = await axios.post(newUrl, { email: data.email, otp: otp });
            if (response.data.success) {
                setToken(response.data.token);
                localStorage.setItem("token", response.data.token);
                setShowLogin(false)
            } else {
                alert(response.data.message)
            }
        }
    }

    return (
        <div className='login-popup'>
            <form key={currState} onSubmit={onLogin} className='login-popup-container' autoComplete="off">
                <div className='login-popup-title'>
                    <h2>{currState}</h2>
                    <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt='' />
                </div>

                {/* Browser ko dhoka dene ke liye hidden inputs */}
                <input type="text" style={{ display: 'none' }} />
                <input type="password" style={{ display: 'none' }} />

                <div className="login-popup-inputs">
                    {currState === "Verify OTP" ? (
                        <input 
                            name={`otp_field_${Math.random()}`} // Random name har render par
                            onChange={(e) => setOtp(e.target.value)} 
                            value={otp} 
                            type="tel" // 'text' ki jagah 'tel' autofill ko rokta hai
                            placeholder="Enter 4-digit OTP" 
                            autoComplete="one-time-code"
                            required 
                        />
                    ) : (
                        <>
                            {currState === "Sign Up" && (
                                <input name='name' onChange={onChangeHandler} value={data.name} type="text" placeholder="Your name" required autoComplete="off" />
                            )}
                            <input name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder="Your email" required autoComplete="off" />
                            <input name='password' onChange={onChangeHandler} value={data.password} type="password" placeholder="Your Password" required autoComplete="new-password" />
                        </>
                    )}
                </div>
                
                <button type='submit'>
                    {currState === "Sign Up" ? "Create account" : currState === "Login" ? "Login" : "Verify & Login"}
                </button>

                <div className="login-popup-condition">
                    <input type="checkbox" required />
                    <p>By continuing, i agree to the terms of use & privacy policy.</p>
                </div>

                {currState === "Login"
                    ? <p>Create a new account? <span onClick={() => {setCurrState("Sign Up"); setOtp("")}}>Click here</span></p>
                    : currState === "Sign Up"
                        ? <p>Already have an account? <span onClick={() => {setCurrState("Login"); setOtp("")}}>Login here</span></p>
                        : <p>Didn't get OTP? <span onClick={() => {setCurrState("Login"); setOtp("")}}>Try Again</span></p>
                }
            </form>
        </div>
    )
}

export default LoginPopup
