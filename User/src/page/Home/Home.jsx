import React, { useEffect, useRef, useState } from 'react'
import './Home.css'
import StatusCard from '../../components/StatusCard/StatusCard'
import PostCard from '../../components/PostCard/PostCard'
import CommentScreen from '../Comment/CommentScreen'
import { useNavigate } from 'react-router-dom'
import CreatePost from '../CreatePost/CreatePost'
import { useFace } from '../../context/FaceContext'
import { profilePic } from '../../assets/assets'
import axios from 'axios'
const BACKENDAPI = import.meta.env.VITE_BACKEND_API_URL;
function Home() {
    const [ActiveCommentScreen, setActiveCommentScreen] = useState(false)
    const [ActiveCreatePostScreen, setActiveCreatePostScreen] = useState(false)
    const [pickimage, setpickimage] = useState(false)
    const { User, AllPosts, setAllPosts } = useFace()
    const [CommentPostId, setCommentPostId] = useState('')

    const scrollRef = useRef();
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [Page, setPage] = useState(2);
    const navigate = useNavigate()

    const Token = localStorage.getItem('token')
    async function fetchMoreData() {
        try {
            const response = await axios.get(`${BACKENDAPI}/api/post/getall`,
                {
                    params: {
                        page: Page
                    },
                    headers: {
                        Authorization: `Bearer ${Token}`
                    }
                })
            console.log(response.data);
            if (response.data.status) {
                setAllPosts(prev => [...prev, ...response.data.posts])
                if (response.data.posts.length === 0) {
                    setHasMore(false); // no more data
                }
                setPage(response.data.currentPage+ 1)

                setLoading(false);
            }
        } catch (error) {
            console.log(error.response.data);

        }

    }
    useEffect(() => {
        const div = scrollRef.current;

        const handleScroll = () => {
            if (!div) return;

            const scrollTop = div.scrollTop;
            const clientHeight = div.clientHeight;
            const scrollHeight = div.scrollHeight;


            if (
                scrollTop + clientHeight >= scrollHeight &&
                !loading &&
                hasMore
            ) {
                console.log(Page);
                
                setLoading(true);
                fetchMoreData();
            }
        };

        div.addEventListener("scroll", handleScroll);

        return () => div.removeEventListener("scroll", handleScroll);
    }, []);

    function handleclickimage() {
        setpickimage(true)
        setActiveCreatePostScreen(true)
    }
    const leftmenus = [{
        image: 'https://static.xx.fbcdn.net/rsrc.php/v4/yt/r/rJ9k6SVFtYN.png',
        menuName: 'Meta Ai',
        to: '/'
    }, {
        image: 'https://i.pinimg.com/736x/9e/88/8f/9e888f1257744587059be63bf637a67c.jpg',
        menuName: 'Friends',
        to: '/friend'
    }, {
        image: 'https://i.pinimg.com/1200x/63/22/13/632213d0f369245f5879c03bb41ef726.jpg',
        menuName: 'Memories',
        to: '/'
    }, {
        image: 'https://i.pinimg.com/736x/dc/74/6f/dc746fe70ac9ad0397be65333ff331d6.jpg',
        menuName: 'Save',
        to: '/'
    }, {
        image: 'https://i.pinimg.com/736x/0e/2e/3a/0e2e3a0b92373f2c9d2dd2302e4d05d2.jpg',
        menuName: 'Group',
        to: '/'
    }, {
        image: 'https://i.pinimg.com/736x/b7/69/e1/b769e1e96aa5c4d67733dbc7d1380c0c.jpg',
        menuName: 'Reels',
        to: '/reel'
    }, {
        image: 'https://i.pinimg.com/736x/76/36/89/7636893cc1c9601cc8f221323989af78.jpg',
        menuName: 'MarketName',
        to: '/'
    }, {
        image: 'https://i..com/736x/76/36/89/7636893cc1c9601cc8f221323989af78.jpg',
        menuName: 'Feed',
        to: '/'
    }, {
        image: 'https://i.pinimg.com/736x/a9/65/24/a9652465375e71188aa9b9ff898a0261.jpg',
        menuName: 'Event',
        to: '/'
    }, {
        image: 'https://i.pinimg.com/736x/e0/67/45/e06745291a9a573f8b2f77cdb6c5519f.jpg',
        menuName: 'Birthday',
        to: '/'
    }, {
        image: 'https://i.pinimg.com/1200x/4f/35/ea/4f35ea099d71f85feef84d3a14475fba.jpg',
        menuName: 'Messager',
        to: '/'
    }
    ]

    return (
        <div className='Home row'>
            <div className="col-md-3 col-0 leftBar">
                <div className="muneItem" onClick={() => navigate('/profile')} >
                    {User && <div className="IconCircle" style={{ backgroundImage: User.profilePic != '' ? `url(${BACKENDAPI}${User.profilePic})` : profilePic }}></div>}
                    <strong>{User && User.firstName + " " + User.lastName}</strong>
                </div>
                {
                    leftmenus.map((elem, index) => (

                        <div className="muneItem" key={index} onClick={() => {
                            navigate(elem.to)

                        }}>
                            <div className="IconCircle" style={{ backgroundImage: `url(${elem.image})` }}></div>
                            <strong>{elem.menuName}</strong>
                        </div>
                    ))
                }
            </div>

            <div className="PostsBox col-md-6 col-12" ref={scrollRef}>
                <div className="col-md-9 col-12 PostView">
                    <div className="MyMind">
                        {User && <div className="ProfileImage" style={{ backgroundImage: User.profilePic != '' ? `url(${BACKENDAPI}${User.profilePic})` : profilePic }}></div>}
                        <div className="WhatOnYouMain" onClick={() => {
                            setActiveCreatePostScreen(true)
                        }}>What's On Your Maint Suhaib?</div>
                        <div onClick={() => navigate('/livecast')} className="IconBox">
                            <svg fill='red' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
                                <path d="M128 128C92.7 128 64 156.7 64 192L64 448C64 483.3 92.7 512 128 512L384 512C419.3 512 448 483.3 448 448L448 192C448 156.7 419.3 128 384 128L128 128zM496 400L569.5 458.8C573.7 462.2 578.9 464 584.3 464C597.4 464 608 453.4 608 440.3L608 199.7C608 186.6 597.4 176 584.3 176C578.9 176 573.7 177.8 569.5 181.2L496 240L496 400z" /></svg>
                        </div>
                        <div className="IconBox">
                            <svg onClick={() => {
                                handleclickimage()

                            }} fill='green' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
                                <path d="M160 144C151.2 144 144 151.2 144 160L144 480C144 488.8 151.2 496 160 496L480 496C488.8 496 496 488.8 496 480L496 160C496 151.2 488.8 144 480 144L160 144zM96 160C96 124.7 124.7 96 160 96L480 96C515.3 96 544 124.7 544 160L544 480C544 515.3 515.3 544 480 544L160 544C124.7 544 96 515.3 96 480L96 160zM224 192C241.7 192 256 206.3 256 224C256 241.7 241.7 256 224 256C206.3 256 192 241.7 192 224C192 206.3 206.3 192 224 192zM360 264C368.5 264 376.4 268.5 380.7 275.8L460.7 411.8C465.1 419.2 465.1 428.4 460.8 435.9C456.5 443.4 448.6 448 440 448L200 448C191.1 448 182.8 443 178.7 435.1C174.6 427.2 175.2 417.6 180.3 410.3L236.3 330.3C240.8 323.9 248.1 320.1 256 320.1C263.9 320.1 271.2 323.9 275.7 330.3L292.9 354.9L339.4 275.9C343.7 268.6 351.6 264.1 360.1 264.1z" /></svg>


                        </div>
                        <div className="IconBox">
                            <svg fill='orange' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
                                <path d="M528 320C528 205.1 434.9 112 320 112C205.1 112 112 205.1 112 320C112 434.9 205.1 528 320 528C434.9 528 528 434.9 528 320zM64 320C64 178.6 178.6 64 320 64C461.4 64 576 178.6 576 320C576 461.4 461.4 576 320 576C178.6 576 64 461.4 64 320zM241.3 383.4C256.3 399 282.4 416 320 416C357.6 416 383.7 399 398.7 383.4C407.9 373.8 423.1 373.5 432.6 382.7C442.1 391.9 442.5 407.1 433.3 416.6C411.2 439.6 373.3 464 320 464C266.7 464 228.8 439.6 206.7 416.6C197.5 407 197.8 391.8 207.4 382.7C217 373.6 232.2 373.8 241.3 383.4zM240 244C224.5 244 212 256.5 212 272L212 280C212 291 203 300 192 300C181 300 172 291 172 280L172 272C172 234.4 202.4 204 240 204C277.6 204 308 234.4 308 272L308 280C308 291 299 300 288 300C277 300 268 291 268 280L268 272C268 256.5 255.5 244 240 244zM372 272L372 280C372 291 363 300 352 300C341 300 332 291 332 280L332 272C332 234.4 362.4 204 400 204C437.6 204 468 234.4 468 272L468 280C468 291 459 300 448 300C437 300 428 291 428 280L428 272C428 256.5 415.5 244 400 244C384.5 244 372 256.5 372 272z" /></svg>
                        </div>
                    </div>
                    <div className="StatusBar">
                        <StatusCard Me />
                        <StatusCard />
                        <StatusCard />
                        <StatusCard />
                        <StatusCard />
                        <StatusCard />
                        <StatusCard />
                    </div>

                    <div className="Posts">
                        {
                            AllPosts && AllPosts.map(elem => {
                                return <PostCard setAllPosts={setAllPosts} key={elem._id} setCommentPostId={setCommentPostId} Data={elem} setActiveCommentScreen={setActiveCommentScreen} />
                            })
                        }
                    </div>
                    {loading}&& <h1>LODING ......</h1>
                </div>
            </div>
            <div className="Contacts col-3">
                <div className="d-flex justify-content-between">
                    <h5>Contect</h5>
                    <div className="icons d-flex gap-2">

                        <svg width={20} height={20} fill='black' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
                            <path d="M480 272C480 317.9 465.1 360.3 440 394.7L566.6 521.4C579.1 533.9 579.1 554.2 566.6 566.7C554.1 579.2 533.8 579.2 521.3 566.7L394.7 440C360.3 465.1 317.9 480 272 480C157.1 480 64 386.9 64 272C64 157.1 157.1 64 272 64C386.9 64 480 157.1 480 272zM272 416C351.5 416 416 351.5 416 272C416 192.5 351.5 128 272 128C192.5 128 128 192.5 128 272C128 351.5 192.5 416 272 416z" />
                        </svg>

                        <svg width={20} height={20} fill='black' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
                            <path d="M480 272C480 317.9 465.1 360.3 440 394.7L566.6 521.4C579.1 533.9 579.1 554.2 566.6 566.7C554.1 579.2 533.8 579.2 521.3 566.7L394.7 440C360.3 465.1 317.9 480 272 480C157.1 480 64 386.9 64 272C64 157.1 157.1 64 272 64C386.9 64 480 157.1 480 272zM272 416C351.5 416 416 351.5 416 272C416 192.5 351.5 128 272 128C192.5 128 128 192.5 128 272C128 351.5 192.5 416 272 416z" />
                        </svg>
                    </div>
                </div>
                <div className="muneItem" onClick={() => navigate('/')} >
                    <div className="IconCircle" style={{ backgroundImage: `url(https://i.pinimg.com/736x/f4/0c/6f/f40c6f5fc070d90ee72eda4f797c6ad2.jpg)` }}></div>
                    <p className='contectername'> Suhaib Ptb</p>
                </div>
                <div className="muneItem" onClick={() => navigate('/')} >
                    <div className="IconCircle" style={{ backgroundImage: `url(https://i.pinimg.com/736x/f4/0c/6f/f40c6f5fc070d90ee72eda4f797c6ad2.jpg)` }}></div>
                    <p className='contectername'> Suhaib Ptb</p>
                </div>
                <div className="muneItem" onClick={() => navigate('/')} >
                    <div className="IconCircle" style={{ backgroundImage: `url(https://i.pinimg.com/736x/f4/0c/6f/f40c6f5fc070d90ee72eda4f797c6ad2.jpg)` }}></div>
                    <p className='contectername'> Suhaib Ptb</p>
                </div>
                <div className="muneItem" onClick={() => navigate('/')} >
                    <div className="IconCircle" style={{ backgroundImage: `url(https://i.pinimg.com/736x/f4/0c/6f/f40c6f5fc070d90ee72eda4f797c6ad2.jpg)` }}></div>
                    <p className='contectername'> Suhaib Ptb</p>
                </div>
                <div className="muneItem" onClick={() => navigate('/')} >
                    <div className="IconCircle" style={{ backgroundImage: `url(https://i.pinimg.com/736x/f4/0c/6f/f40c6f5fc070d90ee72eda4f797c6ad2.jpg)` }}></div>
                    <p className='contectername'> Suhaib Ptb</p>
                </div>
            </div>

            {ActiveCommentScreen && <CommentScreen CommentPostId={CommentPostId} setActiveCommentScreen={setActiveCommentScreen} />}
            {ActiveCreatePostScreen && <CreatePost setpickimage={setpickimage} setActiveCreatePostScreen={setActiveCreatePostScreen} pickimage={pickimage} />}
        </div>
    )
}

export default Home