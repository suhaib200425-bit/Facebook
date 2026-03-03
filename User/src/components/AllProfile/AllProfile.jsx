import React, { useEffect, useState } from 'react'
import './AllProfile.css'
import PostCard from '../PostCard/PostCard'
import { useFace } from '../../context/FaceContext'
import { profilePic } from '../../assets/assets'
import CommentScreen from '../../page/Comment/CommentScreen'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
const BACKENDAPI = import.meta.env.VITE_BACKEND_API_URL;
function AllProfile({ ProfileId, ProfileUser, setactiveTab, setActiveCreatePostScreen, setpickimage }) {
    // const { User } = useFace()
    const Token = localStorage.getItem('token')
    const Navigate=useNavigate()
    const [ActiveCommentScreen, setActiveCommentScreen] = useState(false)
    const [ProfilePosts, setProfilePosts] = useState([])
    const [ProfilePhotos, setProfilePhotos] = useState([])
    function DateOfBirth(dateString) {
        const date = new Date(dateString);
        const formattedDate = date.toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
        });
        return formattedDate
    }

    useEffect(() => {
        async function ProfileData() {
            const response = await axios.get(`${BACKENDAPI}/api/post/profile/${ProfileId ? ProfileId : ProfileUser._id}`, {
                headers: {
                    Authorization: `Bearer ${Token}`
                }
            })
            console.log(response.data);
            
            if (response.data.status) {
                console.log(response.data);
                setProfilePhotos(response.data.photos)
                setProfilePosts(response.data.posts)
            }
        }
        
        ProfileData()
    }, [ProfileId,ProfileUser])
    return (
        <div className='AllProfile row'>
            <div className="col-5 p-2">
                <div className="PersonalDetails  p-3">
                    <h5>Personal details</h5>
                    <div className="BirthdayDate">
                        <svg width={20} height={20} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
                            <path d="M182.4 53.5L157.8 95.6C154 102.1 152 109.6 152 117.2L152 120C152 142.1 169.9 160 192 160C214.1 160 232 142.1 232 120L232 117.2C232 109.6 230 102.2 226.2 95.6L201.6 53.5C199.6 50.1 195.9 48 192 48C188.1 48 184.4 50.1 182.4 53.5zM310.4 53.5L285.8 95.6C282 102.1 280 109.6 280 117.2L280 120C280 142.1 297.9 160 320 160C342.1 160 360 142.1 360 120L360 117.2C360 109.6 358 102.2 354.2 95.6L329.6 53.5C327.6 50.1 323.9 48 320 48C316.1 48 312.4 50.1 310.4 53.5zM413.8 95.6C410 102.1 408 109.6 408 117.2L408 120C408 142.1 425.9 160 448 160C470.1 160 488 142.1 488 120L488 117.2C488 109.6 486 102.2 482.2 95.6L457.6 53.5C455.6 50.1 451.9 48 448 48C444.1 48 440.4 50.1 438.4 53.5L413.8 95.6zM224 224C224 206.3 209.7 192 192 192C174.3 192 160 206.3 160 224L160 277.5C122.7 290.6 96 326.2 96 368L96 388.8C116.9 390.1 137.6 396.1 156.3 406.8L163.4 410.9C189.7 425.9 222.3 424.3 247 406.7C290.7 375.5 349.3 375.5 393 406.7C417.6 424.3 450.3 426 476.6 410.9L483.7 406.8C502.4 396.1 523 390.1 544 388.8L544 368C544 326.2 517.3 290.6 480 277.5L480 224C480 206.3 465.7 192 448 192C430.3 192 416 206.3 416 224L416 272L352 272L352 224C352 206.3 337.7 192 320 192C302.3 192 288 206.3 288 224L288 272L224 272L224 224zM544 437C531.3 438.2 518.9 442 507.5 448.5L500.4 452.6C457.8 476.9 405 474.3 365.1 445.8C338.1 426.5 301.9 426.5 274.9 445.8C235 474.3 182.2 477 139.6 452.6L132.5 448.5C121.1 442 108.7 438.1 96 437L96 512C96 547.3 124.7 576 160 576L480 576C515.3 576 544 547.3 544 512L544 437z" /></svg>
                        <label>{ProfileUser && DateOfBirth(ProfileUser.dateOfBirth)}</label>
                    </div>
                </div>

                {
                    ProfileUser && ProfileUser.followers?.length > 0 &&
                    <div className="Friends p-3">
                        <div className='Hed'>
                            <div className="">
                                <strong onClick={() => setactiveTab("Friends")}>Friends</strong>
                                <br />
                                {ProfileUser.followers.lendth}friends
                            </div>
                            <p>See All Friends</p>
                        </div>
                        <div className="grid-container">
                            {
                                ProfileUser.followers.map(elem => (
                                    <div className="grid-item" key={elem._id} onClick={()=>{
                                        scrollTo(0,0)
                                        Navigate(`/profile/${elem._id}`)
                                    }}>
                                        <div className="image" style={{ backgroundImage: elem.profilePic != '' ? `url(${BACKENDAPI}${elem.profilePic})` : `url(${profilePic})` }}></div>
                                        <p className='text-start fw-500'>{elem.firstName + " " + elem.lastName}</p>
                                    </div>
                                ))
                            }

                        </div>
                    </div>
                }

                {ProfilePhotos.length>0 &&<div className="Friends p-3">
                    <div className='Hed'>
                        <div className="">
                            <strong onClick={() => setactiveTab("Friends")}>Photos</strong>
                            <br />
                            {ProfilePhotos.lenth} Photos
                        </div>
                        <p>See All Photos</p>
                    </div>
                    <div className="grid-container">
                        {
                             ProfilePhotos.map(elem => {
                                return <div className="grid-item" >
                                    <div className="image" style={{ backgroundImage: `url(${BACKENDAPI}${elem.media})` }}></div>

                                </div>
                            })
                        }

                    </div>
                </div>}
            </div>
            <div className="col-7 p-2">
                {
                    !ProfileId && <div className="Mymind p-3">
                        <div className="Headder">
                            {ProfileUser && <div className="ProfileImage" style={{ backgroundImage: ProfileUser.profilePic ? `url(${BACKENDAPI}${ProfileUser.profilePic})` : profilePic }}></div>}
                            <input onClick={() => {
                                setActiveCreatePostScreen(true)
                            }} type="text" placeholder="What's on your mind?" />
                        </div>
                        <hr />
                        <div className="row">
                            <div className="col-4 p-2">
                                <div className="Icons">
                                    <svg fill='red' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" width={30} height={30}>
                                        <path d="M128 128C92.7 128 64 156.7 64 192L64 448C64 483.3 92.7 512 128 512L384 512C419.3 512 448 483.3 448 448L448 192C448 156.7 419.3 128 384 128L128 128zM496 400L569.5 458.8C573.7 462.2 578.9 464 584.3 464C597.4 464 608 453.4 608 440.3L608 199.7C608 186.6 597.4 176 584.3 176C578.9 176 573.7 177.8 569.5 181.2L496 240L496 400z" /></svg>
                                    Live Video
                                </div>
                            </div>
                            <div className="col-4 p-2" onClick={() => {
                                setActiveCreatePostScreen(true)
                                setpickimage(true)
                            }}>
                                <div className="Icons">
                                    <svg width={30} height={30} fill='green' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
                                        <path d="M192 128C192 92.7 220.7 64 256 64L576 64C611.3 64 640 92.7 640 128L640 352C640 387.3 611.3 416 576 416L256 416C220.7 416 192 387.3 192 352L192 128zM320 160C320 142.3 305.7 128 288 128C270.3 128 256 142.3 256 160C256 177.7 270.3 192 288 192C305.7 192 320 177.7 320 160zM476.5 171.5C472.1 164.4 464.4 160 456 160C447.6 160 439.9 164.4 435.5 171.5L381.5 259.8L363.6 234.2C359.1 227.8 351.8 224 343.9 224C336 224 328.7 227.8 324.2 234.2L268.2 314.2C263.1 321.5 262.4 331.1 266.6 339C270.8 346.9 279.1 352 288 352L544 352C552.7 352 560.7 347.3 564.9 339.7C569.1 332.1 569 322.9 564.4 315.4L476.4 171.4zM144 192L144 352C144 413.9 194.1 464 256 464L448 464L448 480C448 515.3 419.3 544 384 544L64 544C28.7 544 0 515.3 0 480L0 256C0 220.7 28.7 192 64 192L144 192zM52 260L52 284C52 292.8 59.2 300 68 300L92 300C100.8 300 108 292.8 108 284L108 260C108 251.2 100.8 244 92 244L68 244C59.2 244 52 251.2 52 260zM68 340C59.2 340 52 347.2 52 356L52 380C52 388.8 59.2 396 68 396L92 396C100.8 396 108 388.8 108 380L108 356C108 347.2 100.8 340 92 340L68 340zM68 436C59.2 436 52 443.2 52 452L52 476C52 484.8 59.2 492 68 492L92 492C100.8 492 108 484.8 108 476L108 452C108 443.2 100.8 436 92 436L68 436z" /></svg>
                                    Photo/Video
                                </div>
                            </div>
                            <div className="col-4 p-2">
                                <div className="Icons">
                                    <svg fill='blue' width={30} height={30} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
                                        <path d="M160 96C160 78.3 145.7 64 128 64C110.3 64 96 78.3 96 96L96 544C96 561.7 110.3 576 128 576C145.7 576 160 561.7 160 544L160 422.4L222.7 403.6C264.6 391 309.8 394.9 348.9 414.5C391.6 435.9 441.4 438.5 486.1 421.7L523.2 407.8C535.7 403.1 544 391.2 544 377.8L544 130.1C544 107.1 519.8 92.1 499.2 102.4L487.4 108.3C442.5 130.8 389.6 130.8 344.6 108.3C308.2 90.1 266.3 86.5 227.4 98.2L160 118.4L160 96z" /></svg>
                                    Life Update
                                </div>
                            </div>
                        </div>
                    </div>
                }
                <div className="ProfilePost">
                    {
                        ProfilePosts.length > 0 ? ProfilePosts.map(elem => {
                            return <PostCard setAllPosts={setProfilePosts} key={elem._id} Data={elem} setActiveCommentScreen={setActiveCommentScreen} />
                        }) :
                            <div className="Mymind" style={{
                                minHeight: '100px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                <h4><strong>Post Is Empty..</strong></h4>
                            </div>
                    }
                </div>
            </div>
            {ActiveCommentScreen && <CommentScreen />}
        </div>
    )
}

export default AllProfile