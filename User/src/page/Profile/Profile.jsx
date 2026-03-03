import React, { useEffect, useState } from 'react'
import './Profile.css'
import { banner, coverPic, profilePic } from '../../assets/assets.js'
import AllProfile from '../../components/AllProfile/AllProfile.jsx'
import CreatePost from '../CreatePost/CreatePost.jsx'
import { useNavigate, useParams } from 'react-router-dom'
import { useFace } from '../../context/FaceContext.jsx'
import axios from 'axios'

const BACKENDAPI = import.meta.env.VITE_BACKEND_API_URL;
function Profile({ frnd, ProfileId }) {
    const [activeTab, setactiveTab] = useState('All')
    const [ActiveCreatePostScreen, setActiveCreatePostScreen] = useState(false)
    const [pickimage, setpickimage] = useState(false)
    const [ProfileUser, setProfileUser] = useState({})
    const Token = localStorage.getItem('token')
    const {id}=useParams()
   
    const IdProfile=id?id:ProfileId
    const { User } = useFace()
    const Navigate = useNavigate()
    useEffect(() => {
        async function getProfileUser() {
            const response = await axios.get(`${BACKENDAPI}/api/user/profile/${IdProfile}`, {
                headers: {
                    Authorization: `Bearer ${Token}`
                }
            })
            console.log(response.data);
            if (response.data.status)
                setProfileUser(response.data.user)

        }
        if (IdProfile) {
            getProfileUser()
        } else {
            setProfileUser(User)
        }
    }, [User, ProfileId,id])

    async function HandleFriend(){
        const response = await axios.get(`${BACKENDAPI}/api/user/sendrequest/${IdProfile}`,{
            headers:{
                Authorization: `Bearer ${Token}`
            }
        })
        console.log(response.data);
        if(response.data.status){
            setProfileUser(response.data.user)
        }
        
    }

    return (
        <div className='MainProfile'>
            <div className={frnd ? 'col-11 ' : "col-12 col-md-9"} style={{ backgroundColor: 'white' }}>
                <div className="bannerImage">
                    {ProfileUser && <img src={ProfileUser.coverPic != '' ? `${BACKENDAPI}${ProfileUser.coverPic}` : coverPic} alt="" srcSet="" />}
                    {/* <div className="editbtn btn">edit</div> */}
                </div>
                <div className="ProfileDetails">
                    <div className="ProfileImageAndName">
                        <div className="ProfileImage">
                            {ProfileUser && <img src={ProfileUser.profilePic != '' ? `${BACKENDAPI}${ProfileUser.profilePic}` : profilePic} alt="" srcset="" />}
                        </div>
                        <div className="ProfileName">
                            {ProfileUser && <h2><strong>{ProfileUser.firstName} {ProfileUser.lastName}</strong></h2>}
                            <p>{ProfileUser && ProfileUser?.followers?.length} friends </p>
                        </div>
                    </div>
                    <div className="Buttons">
                        {
                            ProfileUser &&
                            <>
                                <button onClick={HandleFriend} className="btn" style={{ backgroundColor: '#1818fa', color: 'white' }}>{
                                    IdProfile ?
                                        ProfileUser.followed ?
                                            'Un Follow' :
                                            ProfileUser.request ?
                                                'Request' :
                                                'Add Friend'
                                        :
                                        'Add to Story'
                                }</button>
                                <button className="btn" onClick={() => {
                                    !IdProfile && Navigate('/editprofile')
                                }} style={{}}>{IdProfile ? 'Message' : 'Edit Profile'}</button>
                                <button className='btn'>^</button></>
                        }
                    </div>
                </div>

                <hr />
                <div className="TabsAndIcon">
                    <div className="Tabs">
                        <div className={activeTab == 'All' ? 'ActiveTab' : ''} onClick={() => {
                            setactiveTab('All')
                        }}
                        >All</div>
                        <div className={activeTab == 'About' ? 'ActiveTab' : ''} onClick={() => {
                            setactiveTab('About')
                        }}
                        >About</div>
                        <div className={activeTab == 'Friends' ? 'ActiveTab' : ''} onClick={() => {
                            setactiveTab('Friends')
                        }}
                        >Friends</div>
                        <div className={activeTab == 'Photos' ? 'ActiveTab' : ''} onClick={() => {
                            setactiveTab('Photos')
                        }}
                        >Photos</div>
                        <div className={activeTab == 'Video' ? 'ActiveTab' : ''} onClick={() => {
                            setactiveTab('Video')
                        }}
                        >Video</div>
                        <div className={activeTab == 'More' ? 'ActiveTab' : ''} onClick={() => {
                            setactiveTab('More')
                        }}
                        >More</div>
                    </div>
                </div>

            </div>
            <div className={frnd ? 'col-11' : "col-9"}>

                {activeTab == 'All' && ProfileUser &&
                    <AllProfile 
                        IdProfile={IdProfile}
                        ProfileUser={ProfileUser}
                        setactiveTab={setactiveTab}
                        setpickimage={setpickimage}
                        setActiveCreatePostScreen={setActiveCreatePostScreen}
                    />}
            </div>
            {ActiveCreatePostScreen && <CreatePost setpickimage={setpickimage} setActiveCreatePostScreen={setActiveCreatePostScreen} pickimage={pickimage} />}

        </div>
    )
}

export default Profile