import React, { useEffect } from 'react'
import './Splash.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { useFace } from '../../context/FaceContext';

const BACKENDAPI = import.meta.env.VITE_BACKEND_API_URL;
function Splash() {
    const Token = localStorage.getItem('token')
    const Navigate = useNavigate()

    const { setUser } = useFace();
    useEffect(() => {
        async function LoggedUser() {
            try {
                const response = await axios.get(
                    `${BACKENDAPI}/api/user/logged`,
                    {
                        headers: {
                            Authorization: `Bearer ${Token}`   // ✅ correct format
                        }
                    }
                );
                console.log(response.data);

                if (response.data.status) {
                    setUser(response.data.user)
                    Navigate('/home')
                } else {
                    Navigate('/login')
                }

            } catch (error) {
                console.log(error.response?.data || error.message);
                Navigate('/login')
            }
        }

        if (Token) {
            LoggedUser();
        } else {
            Navigate('/login')
        }
    }, [Token]);
    return (
        <div className='Splash'>
            <img src="https://i.pinimg.com/736x/ab/96/4b/ab964bcf79cbc2d86b15a9e2efe05ffa.jpg" alt="" />
        </div>
    )
}

export default Splash