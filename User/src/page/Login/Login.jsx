import React, { useState } from 'react'
import './Login.css'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import { toast } from "react-toastify";
import { useFace } from '../../context/FaceContext';

const BACKENDAPI = import.meta.env.VITE_BACKEND_API_URL;
function Login() {
    const Navigate = useNavigate()
    const { GetPosts, LoggedUser } = useFace()
    const [errors, setErrors] = useState({});
    const [LoginData, setLoginData] = useState({
        Email: '',
        Password: ''
    })
    const handleChange = (e) => {
        setLoginData({
            ...LoginData,
            [e.target.name]: e.target.value
        });
    };
    const validate = () => {
        let newErrors = {};

        if (!LoginData.Email.trim()) {
            newErrors.Email = "Email is required";
        }

        if (!LoginData.Password.trim()) {
            newErrors.Password = "Password is required";
        }

        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validate();

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
        } else {
            setErrors({});
            const formData = {
                email: LoginData.Email,
                password: LoginData.Password,
            }
            try {
                const response = await axios.post(
                    `${BACKENDAPI}/api/user/login`,
                    formData,
                );
                console.log(response.data);

                if (response.data.status) {
                    toast.success(`${response.data.message} ✅`);
                    localStorage.setItem('token', response.data.token);
                    GetPosts(response.data.token);
                    LoggedUser(response.data.token);
                    Navigate('/home');
                } else {
                    toast.error(`${response.data.message} ❌`);
                }

            } catch (error) {
                console.log(error.message);
                // 👈 add this
                console.log(error.response.data);
                toast.error(`${error.message} ❌`);
            }
            // alert("Form Submitted Successfully ✅");
        }
    };
    return (
        <div className='Login row'>
            <div className="leftbox col-6"></div>
            <div className="rigthbox col-6">
                {/* <div className="topbar col-10">
                    <h5>Log in to Facebook</h5>

                    <svg width={30} height={30} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
                        <path d="M259.1 73.5C262.1 58.7 275.2 48 290.4 48L350.2 48C365.4 48 378.5 58.7 381.5 73.5L396 143.5C410.1 149.5 423.3 157.2 435.3 166.3L503.1 143.8C517.5 139 533.3 145 540.9 158.2L570.8 210C578.4 223.2 575.7 239.8 564.3 249.9L511 297.3C511.9 304.7 512.3 312.3 512.3 320C512.3 327.7 511.8 335.3 511 342.7L564.4 390.2C575.8 400.3 578.4 417 570.9 430.1L541 481.9C533.4 495 517.6 501.1 503.2 496.3L435.4 473.8C423.3 482.9 410.1 490.5 396.1 496.6L381.7 566.5C378.6 581.4 365.5 592 350.4 592L290.6 592C275.4 592 262.3 581.3 259.3 566.5L244.9 496.6C230.8 490.6 217.7 482.9 205.6 473.8L137.5 496.3C123.1 501.1 107.3 495.1 99.7 481.9L69.8 430.1C62.2 416.9 64.9 400.3 76.3 390.2L129.7 342.7C128.8 335.3 128.4 327.7 128.4 320C128.4 312.3 128.9 304.7 129.7 297.3L76.3 249.8C64.9 239.7 62.3 223 69.8 209.9L99.7 158.1C107.3 144.9 123.1 138.9 137.5 143.7L205.3 166.2C217.4 157.1 230.6 149.5 244.6 143.4L259.1 73.5zM320.3 400C364.5 399.8 400.2 363.9 400 319.7C399.8 275.5 363.9 239.8 319.7 240C275.5 240.2 239.8 276.1 240 320.3C240.2 364.5 276.1 400.2 320.3 400z" /></svg>

                </div>
                <div className="profile col-10 p-2">
                    <div className="">
                        <div className="profileImage"
                            style={{ backgroundImage: `url(https://i.pinimg.com/736x/f4/0c/6f/f40c6f5fc070d90ee72eda4f797c6ad2.jpg)` }}></div>
                        <div className="profile name">
                            Suhaib ptb
                        </div>
                    </div>
                    <div className="icons">
                        <svg width={25} height={25} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
                            <path d="M98.9 114.6C91.5 130.6 98.5 149.7 114.5 157.1L467.6 320L114.6 483C98.6 490.4 91.5 509.4 99 525.5C106.5 541.6 125.4 548.5 141.5 541.1L557.5 349.1C568.8 343.9 576.1 332.5 576.1 320C576.1 307.5 568.8 296.2 557.5 290.9L141.4 99C125.4 91.6 106.3 98.6 98.9 114.6z" /></svg>
                    </div>
                </div> */}


                <form action="" className='col-9' onSubmit={(e) => handleSubmit(e)}>
                    <h5 className='mb-5'>Log in to Facebook</h5>
                    <div className="form-floating mb-3">
                        <input onChange={(e) => {
                            handleChange(e)
                        }} type="email" name='Email' className="form-control" id="floatingInput" placeholder="name@example.com" />
                        <label for="floatingInput">Email address</label>
                    </div>
                    {errors.Email && <p style={{ color: 'red' }}>{errors.Email}</p>}
                    <div className="form-floating">
                        <input onChange={(e) => {
                            handleChange(e)
                        }} type="password" name='Password' className="form-control" id="floatingPassword" placeholder="Password" />
                        <label for="floatingPassword">Password</label>
                    </div>
                    {errors.Password && <p style={{ color: 'red' }}>{errors.Password}</p>}

                    <button onClick={(e) => handleSubmit(e)} type="button" className="mt-4 rounded-pill btn btn-primary col-12">Login</button>
                    <button type="button" className="mt-2 rounded-pill btn  col-12">Forgot Password ?</button>
                    <div className="mt-4">

                        <button onClick={() => {
                            Navigate('/register')
                        }} type="button" className="mt-5 rounded-pill btn border border-primary border-1 primary  col-12">Create New Account?</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login