import React, { useEffect, useState } from 'react'
import './FirendNav.css'
import { useNavigate, useParams } from 'react-router-dom'
import Profile from '../Profile/Profile'
import axios from 'axios';
import { profilePic } from '../../assets/assets';

const BACKENDAPI = import.meta.env.VITE_BACKEND_API_URL;
function FirendNav() {
  const navigate = useNavigate()
  const { type } = useParams()
  const [profile, setprofile] = useState(null)
  const [Users, setUsers] = useState([])
  const Token = localStorage.getItem('token')
  const APIS = {
    'Suggestions': `${BACKENDAPI}/api/user/all`,
    'Requests': `${BACKENDAPI}/api/user/requests`
  }
  useEffect(() => {
    async function GetAllDatas() {
      try {
        const response = await axios.get(APIS[type], {
          headers: {
            Authorization: `Bearer ${Token}`
          }
        })
        console.log(response.data);
        if (response.data.status) {
          setUsers(response.data.data)
        }
      } catch (error) {
        console.log(error.response.data);

        console.log(error.message);

      }
    }
    GetAllDatas()
  }, [])
  return (
    <div className='FirendNav row' onClick={() => console.log(type)}>
      <div className="col-3 leftBox">
        <div className="Headder">
          <div className="backicon" onClick={() => navigate(-1)}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" width={30} height={30}>
              <path d="M73.4 297.4C60.9 309.9 60.9 330.2 73.4 342.7L233.4 502.7C245.9 515.2 266.2 515.2 278.7 502.7C291.2 490.2 291.2 469.9 278.7 457.4L173.3 352L544 352C561.7 352 576 337.7 576 320C576 302.3 561.7 288 544 288L173.3 288L278.7 182.6C291.2 170.1 291.2 149.8 278.7 137.3C266.2 124.8 245.9 124.8 233.4 137.3L73.4 297.3z" /></svg>

          </div>
          <div className="">
            Friends
            <h3>{type}</h3>
          </div>

        </div>
        <div className="ps-3">57 friend requests</div>
        <div className="AllReq">
          {
            Users && Users.map((elem, index) => {
              return <div key={elem._id} className="Profile" onClick={() => setprofile(elem._id)}>
                <div className="circle">
                  <img src={elem.profilePic != '' ? `${BACKENDAPI}${elem.profilePic}` : profilePic} alt="" srcset="" />
                </div>
                <div className="Content">
                  <div className="name mb-2">
                    <strong>{elem.firstName + " " + elem.lastName}</strong>
                    {type == 'Requests' && <p className='mt-3'>4w</p>}
                  </div>
                  {/* <p className='mutual mt-1'>Hello</p> */}
                  {
                    type != 'Friends' &&
                    <div className="col-12 row">
                      <div className="btns col-6 p-2">
                        <button >{type == 'Requests' ? 'Confirm' : 'Add Friend'}</button>
                      </div>
                      <div className="btns col-6 p-2">
                        <button style={{ backgroundColor: 'white', color: 'black' }}>{type == 'Requests' ? 'Delete' : 'Remove'}</button>
                      </div>
                    </div>
                  }
                </div>
              </div>
            })
          }



        </div>
      </div>
      <div className="col-9">
        {profile != null ?
          <div className="frndProfile">

            <Profile frnd ProfileId={profile} />
          </div> :
          <div className="displaProfile">
            <h3>Select people's names to preview their profile.</h3>
          </div>
        }
      </div>
    </div>
  )
}

export default FirendNav