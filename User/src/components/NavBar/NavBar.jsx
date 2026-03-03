import React, { useEffect, useState } from 'react'
import './NavBar.css'
import { Logo, profilePic } from '../../assets/assets.js'
import { useNavigate } from 'react-router-dom'
import { useFace } from '../../context/FaceContext.jsx'
import NavProfile from '../NavProfile/NavProfile.jsx'

const BACKENDAPI = import.meta.env.VITE_BACKEND_API_URL;
function NavBar() {
    const [active, setavtive] = useState('Home')
    const Navigate = useNavigate()
    const { User, AllPosts, setController, Controller } = useFace()

    return (
        <div className='NavBar'
            onClick={() => {
                console.log(User)
                console.log(AllPosts);
                setController({
                    pop: '',
                    right: 0
                })

            }
            }>
            <div className="LeftBar">
                <div className="Facebook_logo">
                    <img src={Logo} alt="" srcSet="" />

                </div>
                <div className="SearchBox">
                    <svg fill='black' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
                        <path d="M480 272C480 317.9 465.1 360.3 440 394.7L566.6 521.4C579.1 533.9 579.1 554.2 566.6 566.7C554.1 579.2 533.8 579.2 521.3 566.7L394.7 440C360.3 465.1 317.9 480 272 480C157.1 480 64 386.9 64 272C64 157.1 157.1 64 272 64C386.9 64 480 157.1 480 272zM272 416C351.5 416 416 351.5 416 272C416 192.5 351.5 128 272 128C192.5 128 128 192.5 128 272C128 351.5 192.5 416 272 416z" />
                    </svg>
                    <input type="text" placeholder='Search Facebook' />
                </div>
            </div>
            <div className="CenterBar">
                <svg onClick={() => {
                    setavtive('Home')
                    Navigate('/home')
                    scrollTo(0, 0)
                }} fill={active == 'Home' ? 'rgb(60, 60, 252)' : 'gray'} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" width={35} height={35}>
                    <path d="M341.8 72.6C329.5 61.2 310.5 61.2 298.3 72.6L74.3 280.6C64.7 289.6 61.5 303.5 66.3 315.7C71.1 327.9 82.8 336 96 336L112 336L112 512C112 547.3 140.7 576 176 576L464 576C499.3 576 528 547.3 528 512L528 336L544 336C557.2 336 569 327.9 573.8 315.7C578.6 303.5 575.4 289.5 565.8 280.6L341.8 72.6zM304 384L336 384C362.5 384 384 405.5 384 432L384 528L256 528L256 432C256 405.5 277.5 384 304 384z" /></svg>
                <svg onClick={() => {
                    setavtive('Friends')
                    Navigate('/friend')
                    scrollTo(0, 0)
                }} fill={active == 'Friends' ? 'rgb(60, 60, 252)' : 'gray'} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" width={35} height={35}>
                    <path d="M96 192C96 130.1 146.1 80 208 80C269.9 80 320 130.1 320 192C320 253.9 269.9 304 208 304C146.1 304 96 253.9 96 192zM32 528C32 430.8 110.8 352 208 352C305.2 352 384 430.8 384 528L384 534C384 557.2 365.2 576 342 576L74 576C50.8 576 32 557.2 32 534L32 528zM464 128C517 128 560 171 560 224C560 277 517 320 464 320C411 320 368 277 368 224C368 171 411 128 464 128zM464 368C543.5 368 608 432.5 608 512L608 534.4C608 557.4 589.4 576 566.4 576L421.6 576C428.2 563.5 432 549.2 432 534L432 528C432 476.5 414.6 429.1 385.5 391.3C408.1 376.6 435.1 368 464 368z" /></svg>
                <svg onClick={() => {
                    Navigate('/reel')
                    scrollTo(0, 0)
                    setavtive('Reel')
                }} fill={active == 'Reel' ? 'rgb(60, 60, 252)' : 'gray'} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" width={35} height={35}>
                    <path d="M128 128C92.7 128 64 156.7 64 192L64 448C64 483.3 92.7 512 128 512L384 512C419.3 512 448 483.3 448 448L448 192C448 156.7 419.3 128 384 128L128 128zM496 400L569.5 458.8C573.7 462.2 578.9 464 584.3 464C597.4 464 608 453.4 608 440.3L608 199.7C608 186.6 597.4 176 584.3 176C578.9 176 573.7 177.8 569.5 181.2L496 240L496 400z" /></svg>
                <svg onClick={() => setavtive('Store')} fill={active == 'Store' ? 'rgb(60, 60, 252)' : 'gray'} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" width={35} height={35}>
                    <path d="M94.7 136.3C101.6 112.4 123.5 96 148.4 96L492.4 96C517.3 96 539.2 112.4 546.2 136.3L569.6 216.5C582.4 260.2 549.5 304 504 304C477.7 304 454.6 289.1 443.2 266.9C431.6 288.8 408.6 304 381.8 304C355.2 304 332.1 289 320.5 267C308.9 289 285.8 304 259.2 304C232.4 304 209.4 288.9 197.8 266.9C186.4 289 163.3 304 137 304C91.4 304 58.6 260.3 71.4 216.5L94.7 136.3zM160.4 416L480.4 416L480.4 349.6C488 351.2 495.9 352 503.9 352C518.2 352 531.9 349.4 544.4 344.8L544.4 496C544.4 522.5 522.9 544 496.4 544L144.4 544C117.9 544 96.4 522.5 96.4 496L96.4 344.8C108.9 349.4 122.5 352 136.9 352C145 352 152.8 351.2 160.4 349.6L160.4 416z" /></svg>
            </div>
            <div className="RigthBar">
                <div className="CircleBox" onClick={(e) => {
                    // Navigate('/profile')  
                    const right = window.innerWidth - e.clientX;
                    console.log(right);

                    Controller.pop === 'menu' ?
                        setController({ pop: '', right: 0 })
                        : setController({ pop: 'menu', right })
                    e.stopPropagation()
                    // scrollTo(0, 0)
                }}>
                    <svg width={40} height={40} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
                        <path d="M160 96C124.7 96 96 124.7 96 160L96 480C96 515.3 124.7 544 160 544L480 544C515.3 544 544 515.3 544 480L544 160C544 124.7 515.3 96 480 96L160 96zM224 160L224 224L288 224L288 160L352 160L352 224L416 224L416 160L480 160L480 224L416 224L416 288L480 288L480 352L416 352L416 416L480 416L480 480L416 480L416 416L352 416L352 480L288 480L288 416L224 416L224 480L160 480L160 416L224 416L224 352L160 352L160 288L224 288L224 224L160 224L160 160L224 160zM288 288L352 288L352 224L288 224L288 288zM288 352L288 288L224 288L224 352L288 352zM352 352L288 352L288 416L352 416L352 352zM352 352L416 352L416 288L352 288L352 352z" /></svg>
                </div>
                <div className="CircleBox" onClick={(e) => {
                    // Navigate('/profile')  
                    const right = window.innerWidth - e.clientX;
                    Controller.pop === 'message' ?
                        setController({ pop: '', right: 0 })
                        : setController({ pop: 'message', right })
                    e.stopPropagation()
                    // scrollTo(0, 0)
                }}>
                    <svg width={35} height={35} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
                        <path d="M64 416L64 192C64 139 107 96 160 96L480 96C533 96 576 139 576 192L576 416C576 469 533 512 480 512L360 512C354.8 512 349.8 513.7 345.6 516.8L230.4 603.2C226.2 606.3 221.2 608 216 608C202.7 608 192 597.3 192 584L192 512L160 512C107 512 64 469 64 416z" /></svg>
                </div>
                <div className="CircleBox" onClick={(e) => {
                    // Navigate('/profile')  
                    const right = window.innerWidth - e.clientX;
                    Controller.pop === 'notification' ?
                        setController({ pop: '', right: 0 })
                        : setController({ pop: 'notification', right })

                    e.stopPropagation()
                    // scrollTo(0, 0)
                }}>
                    <svg width={35} height={35} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
                        <path d="M320 64C302.3 64 288 78.3 288 96L288 99.2C215 114 160 178.6 160 256L160 277.7C160 325.8 143.6 372.5 113.6 410.1L103.8 422.3C98.7 428.6 96 436.4 96 444.5C96 464.1 111.9 480 131.5 480L508.4 480C528 480 543.9 464.1 543.9 444.5C543.9 436.4 541.2 428.6 536.1 422.3L526.3 410.1C496.4 372.5 480 325.8 480 277.7L480 256C480 178.6 425 114 352 99.2L352 96C352 78.3 337.7 64 320 64zM258 528C265.1 555.6 290.2 576 320 576C349.8 576 374.9 555.6 382 528L258 528z" /></svg>
                </div>
                <div className="CircleBox" onClick={(e) => {
                    // Navigate('/profile')  

                    scrollTo(0, 0)
                    const right = window.innerWidth - e.clientX;
                    Controller.pop === 'profile' ?
                        setController({ pop: '', right: 0 })
                        : setController({ pop: 'profile', right })
                    e.stopPropagation()
                    // scrollTo(0, 0)
                }}>
                    {User && <img src={User.profilePic != '' ? `${BACKENDAPI}${User.profilePic}` : profilePic} alt="" srcSet="" />}
                </div>
            </div>
            {Controller.pop != '' &&
                <div className="PopCard" style={{ right: Controller.right, display: 'block' }}>
                    {Controller.pop == 'profile' && <NavProfile />}
                </div>
            }
        </div>
    )
}

export default NavBar