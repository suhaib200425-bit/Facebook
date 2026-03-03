import React, { useEffect, useState } from "react";
import './EditProfile.css'
import { useFace } from "../../context/FaceContext";
import { coverPic, profilePic } from "../../assets/assets";
import axios from "axios";
import { toast } from "react-toastify";
const BACKENDAPI = import.meta.env.VITE_BACKEND_API_URL;
const EditProfile = () => {
    const { User, setUser } = useFace()
    const [coverImage, setCoverImage] = useState(null);
    const [profileImage, setProfileImage] = useState(null);
    const [Editprofiledata, setEditprofiledata] = useState({
        firstName: '',
        lastName: '',
        dateOfBirth: ''
    });
    const Token = localStorage.getItem('token')
    useEffect(() => {
        const Dataset = () => {
            if (User.coverPic == '') {
                setCoverImage(coverPic)
            } else {
                setCoverImage(`${BACKENDAPI}${User.coverPic}`)
            }
            if (User.profilePic == '') {
                setProfileImage(profilePic)
            } else {
                setProfileImage(`${BACKENDAPI}${User.profilePic}`)
            }
            const formattedDate = new Date(User.dateOfBirth)
                .toISOString()
                .split("T")[0];
            setEditprofiledata(prev => {
                return {
                    ...prev,
                    lastName: User.lastName,
                    firstName: User.firstName,
                    dateOfBirth: formattedDate
                }
            })

        }
        if (User != null) {
            Dataset()
        }
    }, [User])
    // Image preview handle
    const handleCoverChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setEditprofiledata(prev => {
                return {
                    ...prev,
                    coverPic: file
                }
            })
            setCoverImage(URL.createObjectURL(file));
        }
    };

    const handleProfileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setEditprofiledata(prev => {
                return {
                    ...prev,
                    profilePic: file
                }
            })
            setProfileImage(URL.createObjectURL(file));
        }
    };

    const handleTextChange = (e) => {
        setEditprofiledata(prev => {
            return {
                ...prev,
                [e.target.name]: [e.target.value]
            }
        })
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(Editprofiledata);
        const formData = new FormData();

        formData.append("firstName", Editprofiledata.firstName);
        formData.append("lastName", Editprofiledata.lastName);
        formData.append("dateOfBirth", Editprofiledata.dateOfBirth);
        if (Editprofiledata.coverPic)
            formData.append("coverPic", Editprofiledata.coverPic);

        if (Editprofiledata.profilePic) {
            formData.append("profilePic", Editprofiledata.profilePic);
        }

        const response = await axios.patch(`${BACKENDAPI}/api/user/update`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${Token}`

            },
        });
        console.log(response.data);
        if (response.data.status) {
            toast.success(`${response.data.message}`);
            setUser(response.data.user)
        }else{
            toast.error(response.data.message)
        }
    };

    return (
        <div className="container mt-4 EditProfile">
            {
                User &&
                <div className="card p-4 shadow">

                    <h3 className="mb-3">Edit Profile</h3>

                    <div className="d-flex gap-4">
                        {/* Cover Image */}
                        <div className="mb-3">
                            <label className="form-label">Cover Image</label> <br />
                            <input hidden type="file" accept="*/image" id="CoverImage" className="form-control" onChange={handleCoverChange} />

                            <img onClick={() => {
                                document.getElementById('CoverImage').click()
                            }} src={coverImage} alt="cover" className="img-fluid mt-2 rounded" style={{ height: "200px", objectFit: "cover" }} />

                        </div>

                        {/* Profile Image */}

                        <div className="mb-3">
                            <label className="form-label">Profile Image</label> <br />
                            <input hidden id="profileImage" type="file" className="form-control" onChange={handleProfileChange} />
                            <img onClick={() => {
                                document.getElementById('profileImage').click()
                            }} src={profileImage} alt="profile" className="rounded-circle mt-2" width="120" height="120" />

                        </div>

                    </div>
                    <div className="row">
                        {/* First Name */}
                        <div className="mb-3 col-6">
                            <label className="form-label">First Name</label>
                            <input
                                type="text"
                                className="form-control"
                                name="firstName"
                                value={Editprofiledata.firstName}
                                onChange={(e) => handleTextChange(e)}
                            />
                        </div>

                        {/* Last Name */}
                        <div className="mb-3 col-6">
                            <label className="form-label">Last Name</label>
                            <input
                                type="text"
                                className="form-control"
                                name="lastName"
                                value={Editprofiledata.lastName}
                                onChange={(e) => handleTextChange(e)}
                            />
                        </div>

                    </div>
                    {/* Date of Birth */}
                    <div className="mb-3">
                        <label className="form-label">Date of Birth</label>
                        <input
                            type="date"
                            className="form-control"
                            name="dateOfBirth"
                            value={Editprofiledata.dateOfBirth}
                            onChange={(e) => handleTextChange(e)}
                        />
                    </div>

                    <button className="mb-4 btn btn-primary w-100" onClick={handleSubmit}>
                        Save Changes
                    </button>

                </div>
            }
        </div>
    );
};

export default EditProfile;