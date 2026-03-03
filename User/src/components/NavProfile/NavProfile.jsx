import React from 'react'
import './NavProfile.css'
import { useFace } from '../../context/FaceContext'
import { profilePic } from '../../assets/assets'
import { useNavigate } from 'react-router-dom';
const BACKENDAPI = import.meta.env.VITE_BACKEND_API_URL;
function NavProfile() {
    const { User,setController } = useFace()
    const Navigate = useNavigate()
    return (
        <div className='NavProfile'>
            <div className="profileBar" onClick={(e)=>{
                setController({
                    pop:'',
                    right:0
                })
                e.stopPropagation()
                Navigate('/profile')
            }}>
                <div className="ProfileImgName">
                    {User && <img src={User.profilePic != '' ? `${BACKENDAPI}${User.profilePic}` : profilePic} alt="" srcset="" />}
                    {User && <p>{User.firstName + ' ' + User.lastName}</p>}
                </div>
            </div>

            <div className="mt-2 Icons">
                <div className="left">
                    <svg width={30} height={30} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
                        <path d="M259.1 73.5C262.1 58.7 275.2 48 290.4 48L350.2 48C365.4 48 378.5 58.7 381.5 73.5L396 143.5C410.1 149.5 423.3 157.2 435.3 166.3L503.1 143.8C517.5 139 533.3 145 540.9 158.2L570.8 210C578.4 223.2 575.7 239.8 564.3 249.9L511 297.3C511.9 304.7 512.3 312.3 512.3 320C512.3 327.7 511.8 335.3 511 342.7L564.4 390.2C575.8 400.3 578.4 417 570.9 430.1L541 481.9C533.4 495 517.6 501.1 503.2 496.3L435.4 473.8C423.3 482.9 410.1 490.5 396.1 496.6L381.7 566.5C378.6 581.4 365.5 592 350.4 592L290.6 592C275.4 592 262.3 581.3 259.3 566.5L244.9 496.6C230.8 490.6 217.7 482.9 205.6 473.8L137.5 496.3C123.1 501.1 107.3 495.1 99.7 481.9L69.8 430.1C62.2 416.9 64.9 400.3 76.3 390.2L129.7 342.7C128.8 335.3 128.4 327.7 128.4 320C128.4 312.3 128.9 304.7 129.7 297.3L76.3 249.8C64.9 239.7 62.3 223 69.8 209.9L99.7 158.1C107.3 144.9 123.1 138.9 137.5 143.7L205.3 166.2C217.4 157.1 230.6 149.5 244.6 143.4L259.1 73.5zM320.3 400C364.5 399.8 400.2 363.9 400 319.7C399.8 275.5 363.9 239.8 319.7 240C275.5 240.2 239.8 276.1 240 320.3C240.2 364.5 276.1 400.2 320.3 400z" /></svg>
                    Settings & privacy
                </div>
                <div className="right"></div>
            </div>
            <div className="mt-2 Icons">
                <div className="left">
                    <svg width={30} height={30} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
                        <path d="M224 224C224 171 267 128 320 128C373 128 416 171 416 224C416 266.7 388.1 302.9 349.5 315.4C321.1 324.6 288 350.7 288 392L288 416C288 433.7 302.3 448 320 448C337.7 448 352 433.7 352 416L352 392C352 390.3 352.6 387.9 355.5 384.7C358.5 381.4 363.4 378.2 369.2 376.3C433.5 355.6 480 295.3 480 224C480 135.6 408.4 64 320 64C231.6 64 160 135.6 160 224C160 241.7 174.3 256 192 256C209.7 256 224 241.7 224 224zM320 576C342.1 576 360 558.1 360 536C360 513.9 342.1 496 320 496C297.9 496 280 513.9 280 536C280 558.1 297.9 576 320 576z" /></svg>
                    Settings & privacy
                </div>
                <div className="right"></div>
            </div>
            <div className="mt-2 Icons">
                <div className="left">
                    <svg width={30} height={30} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
                        <path d="M320 64C178.6 64 64 178.6 64 320C64 461.4 178.6 576 320 576C388.8 576 451.3 548.8 497.3 504.6C504.6 497.6 506.7 486.7 502.6 477.5C498.5 468.3 488.9 462.6 478.8 463.4C473.9 463.8 469 464 464 464C362.4 464 280 381.6 280 280C280 207.9 321.5 145.4 382.1 115.2C391.2 110.7 396.4 100.9 395.2 90.8C394 80.7 386.6 72.5 376.7 70.3C358.4 66.2 339.4 64 320 64z" /></svg>
                    Display
                </div>
                <div className="right"></div>
            </div>
            <div className="mt-2 Icons"  onClick={(e) => {
                    e.stopPropagation()
                    localStorage.setItem('token', 'null')
                    Navigate('/login')
                }}>
                <div className="left">
                    <svg width={30} height={30} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
                        <path d="M224 160C241.7 160 256 145.7 256 128C256 110.3 241.7 96 224 96L160 96C107 96 64 139 64 192L64 448C64 501 107 544 160 544L224 544C241.7 544 256 529.7 256 512C256 494.3 241.7 480 224 480L160 480C142.3 480 128 465.7 128 448L128 192C128 174.3 142.3 160 160 160L224 160zM566.6 342.6C579.1 330.1 579.1 309.8 566.6 297.3L438.6 169.3C426.1 156.8 405.8 156.8 393.3 169.3C380.8 181.8 380.8 202.1 393.3 214.6L466.7 288L256 288C238.3 288 224 302.3 224 320C224 337.7 238.3 352 256 352L466.7 352L393.3 425.4C380.8 437.9 380.8 458.2 393.3 470.7C405.8 483.2 426.1 483.2 438.6 470.7L566.6 342.7z" /></svg>
                    LogOut
                </div>
                <div className="right"></div>
            </div>
            Privacy  · Terms  · Advertising  · Ad choices   · Cookies  ·  more
        </div>
    )
}

export default NavProfile