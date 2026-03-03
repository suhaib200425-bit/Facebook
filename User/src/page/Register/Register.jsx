import React, { useState } from "react";
import "./Register.css";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const BACKENDAPI = import.meta.env.VITE_BACKEND_API_URL;
function Register() {
    const navigate=useNavigate()
    const [RegistrationData, setRegistrationData] = useState({
        firstName: "",
        lastName: "",
        Email: "",
        Password: "",
        Date: '',
        Month: '',
        Year: '',
        Gender: ''

    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        setRegistrationData({
            ...RegistrationData,
            [e.target.name]: e.target.value
        });
    };

    const validate = () => {
        let newErrors = {};

        if (!RegistrationData.firstName.trim()) {
            newErrors.firstName = "First name is required";
        }

        if (!RegistrationData.lastName.trim()) {
            newErrors.lastName = "Last name is required";
        }

        if (!RegistrationData.Date.trim()) {
            newErrors.Birth = "Date is required";
        }
        if (!RegistrationData.Month.trim()) {
            newErrors.Birth = "Date is required";
        }
        if (!RegistrationData.Year.trim()) {
            newErrors.Birth = "Date is required";
        }

        if (!RegistrationData.Gender.trim()) {
            newErrors.Gender = "Gender is required";
        }
        if (!RegistrationData.Email.trim()) {
            newErrors.Email = "Email is required";
        }
        if (!RegistrationData.Password.trim()) {
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
                firstName: RegistrationData.firstName,
                lastName: RegistrationData.lastName,
                email: RegistrationData.Email,
                password: RegistrationData.Password,
                gender: RegistrationData.Gender,
                dateOfBirth: `${RegistrationData.Date}-${RegistrationData.Month}-${RegistrationData.Year}`,
            }
            try {
                console.log('start');
                console.log(BACKENDAPI);
                

                const response = await axios.post(
                    `${BACKENDAPI}/api/user/register`,
                    formData,
                );
                console.log(response);

                if (response.data.status) {
                    toast.success(`${response.data.message} ✅`);
                    navigate('/login')
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
        <div className="Register">
            <form className="col-4" onSubmit={(e) => handleSubmit(e)}>
                <h5>Get started on Facebook</h5>
                <p>Create an account to connect with friends, family and communities of people who share your interest</p>
                <h6>Name</h6>
                <div className="row">

                    <div className="col-6 p-1">
                        <div className="form-floating col-12">
                            <input onChange={(e) => handleChange(e)} type="text" className="form-control" id="floatingName" name="firstName" placeholder="Name" />
                            <label for="floatingName">Name</label>
                        </div>
                    </div>
                    <div className="col-6 p-1">
                        <div className="form-floating col-12">
                            <input onChange={(e) => handleChange(e)} type="text" className="form-control" id="floatingLast" name="lastName" placeholder="Last Name" />
                            <label for="floatingName">Last Name</label>
                        </div>
                    </div>
                    {errors.firstName && <p style={{ color: 'red' }}>{errors.firstName}</p>}
                    {errors.lastName && <p style={{ color: 'red' }}>{errors.lastName}</p>}

                </div>
                <h6>Date of birth</h6>
                <div className="mt-2 row">
                    <div className="col-3 p-2">
                        <div class="inputdates input-group mb-3">
                            <select onChange={(e) => handleChange(e)} class="form-select" id="inputGroupSelect01" name="Date">
                                <option selected></option>
                                <option value="1">One</option>
                                <option value="2">Two</option>
                                <option value="3">Three</option>
                            </select>
                        </div>
                    </div>

                    <div className="col-5 p-2">
                        <div class="inputdates input-group mb-3">
                            <select onChange={(e) => handleChange(e)} class="form-select" id="inputGroupSelect01" name="Month">
                                <option selected></option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                            </select>
                        </div>
                    </div>
                    <div className="col-4 p-2">
                        <div class="inputdates input-group mb-3">
                            <select onChange={(e) => handleChange(e)} class="form-select" id="inputGroupSelect01" name="Year">
                                <option selected></option>
                                <option value="1">One</option>
                                <option value="2">Two</option>
                                <option value="3">Three</option>
                            </select>
                        </div>
                    </div>
                </div>

                {errors.Birth && <p style={{ color: 'red' }}>{errors.Birth}</p>}
                <h6>Gender</h6>
                <div class="inputdates input-group mb-3">
                    <select onChange={(e) => handleChange(e)} name="Gender" class="form-select" id="inputGroupSelect01">
                        <option selected></option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                    </select>
                </div>

                {errors.Gender && <p style={{ color: 'red' }}>{errors.Gender}</p>}
                <h6>Email Address</h6>
                <div className="form-floating col-12">
                    <input onChange={(e) => handleChange(e)} type="email" className="form-control" id="floatingEmail" name="Email" placeholder="Email" />
                    <label for="floatingEmail">Email</label>
                </div>

                {errors.Email && <p style={{ color: 'red' }}>{errors.Email}</p>}
                <h6>Password</h6>

                <div className="form-floating col-12">
                    <input onChange={(e) => handleChange(e)} type="password" className="form-control" id="floatingPassword" name="Password" placeholder="Password" />
                    <label for="floatingPassword">Password</label>
                </div>

                {errors.Password && <p style={{ color: 'red' }}>{errors.Password}</p>}
                <button type="button" className="mt-4 rounded-pill btn btn-primary col-12"
                    onClick={(e) => {
                        handleSubmit(e)
                    }}>SUBMIT</button>
                <button onClick={()=>navigate('/')} type="button" className="mt-2 rounded-pill btn  col-12">I have an Account</button>
            </form>
        </div>
    );
}

export default Register;