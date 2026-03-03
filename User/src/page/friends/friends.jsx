import React, { useEffect, useState } from 'react'
import './friends.css'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import { profilePic } from '../../assets/assets';
const BACKENDAPI = import.meta.env.VITE_BACKEND_API_URL;
function Friend() {
  const navigate = useNavigate()
  const Token = localStorage.getItem('token')
  const [Users, setUsers] = useState([])
  useEffect(() => {
    async function GetAllDatas() {
      try {
        const response = await axios.get(`${BACKENDAPI}/api/user/requests`, {
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

  const acceptFollowRequest=async (ID)=>{
    const response= await axios.get(
      `${BACKENDAPI}/api/user/acceptfollowrequest/${ID}`,
      {
        headers:{
            Authorization: `Bearer ${Token}`
        }
      }
    )
    console.log(response.data);
    
  }

  return (
    <div className='Friend row'>
      <div className="col-md-3 col-0 menus">
        <div className="headder">
          <h3>Friends</h3>
          <svg width={30} height={30} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
            <path d="M259.1 73.5C262.1 58.7 275.2 48 290.4 48L350.2 48C365.4 48 378.5 58.7 381.5 73.5L396 143.5C410.1 149.5 423.3 157.2 435.3 166.3L503.1 143.8C517.5 139 533.3 145 540.9 158.2L570.8 210C578.4 223.2 575.7 239.8 564.3 249.9L511 297.3C511.9 304.7 512.3 312.3 512.3 320C512.3 327.7 511.8 335.3 511 342.7L564.4 390.2C575.8 400.3 578.4 417 570.9 430.1L541 481.9C533.4 495 517.6 501.1 503.2 496.3L435.4 473.8C423.3 482.9 410.1 490.5 396.1 496.6L381.7 566.5C378.6 581.4 365.5 592 350.4 592L290.6 592C275.4 592 262.3 581.3 259.3 566.5L244.9 496.6C230.8 490.6 217.7 482.9 205.6 473.8L137.5 496.3C123.1 501.1 107.3 495.1 99.7 481.9L69.8 430.1C62.2 416.9 64.9 400.3 76.3 390.2L129.7 342.7C128.8 335.3 128.4 327.7 128.4 320C128.4 312.3 128.9 304.7 129.7 297.3L76.3 249.8C64.9 239.7 62.3 223 69.8 209.9L99.7 158.1C107.3 144.9 123.1 138.9 137.5 143.7L205.3 166.2C217.4 157.1 230.6 149.5 244.6 143.4L259.1 73.5zM320.3 400C364.5 399.8 400.2 363.9 400 319.7C399.8 275.5 363.9 239.8 319.7 240C275.5 240.2 239.8 276.1 240 320.3C240.2 364.5 276.1 400.2 320.3 400z" /></svg>
        </div>
        <br />


        <div className="menu" style={{ backgroundColor: 'rgba(147, 147, 150, 0.24)' }}>
          <div className="iconText">
            <div className="icon" style={{ backgroundColor: 'blue' }}>
              <svg fill='white' width={25} height={25} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
                <path d="M320 312C386.3 312 440 258.3 440 192C440 125.7 386.3 72 320 72C253.7 72 200 125.7 200 192C200 258.3 253.7 312 320 312zM290.3 368C191.8 368 112 447.8 112 546.3C112 562.7 125.3 576 141.7 576L498.3 576C514.7 576 528 562.7 528 546.3C528 447.8 448.2 368 349.7 368L290.3 368z" /></svg>
            </div>
            Home
          </div>
          <div className="goicon"></div>
        </div>


        <div className="menu" onClick={() => {
          navigate('Requests')
        }}>
          <div className="iconText ">
            <div className="icon">
              <svg width={25} height={25} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
                <path d="M286 368C384.5 368 464.3 447.8 464.3 546.3C464.3 562.7 451 576 434.6 576L78 576C61.6 576 48.3 562.7 48.3 546.3C48.3 447.8 128.1 368 226.6 368L286 368zM585.7 169.9C593.5 159.2 608.5 156.8 619.2 164.6C629.9 172.4 632.3 187.4 624.5 198.1L522.1 338.9C517.9 344.6 511.4 348.3 504.4 348.7C497.4 349.1 490.4 346.5 485.5 341.4L439.1 293.4C429.9 283.9 430.1 268.7 439.7 259.5C449.2 250.3 464.4 250.6 473.6 260.1L500.1 287.5L585.7 169.8zM256.3 312C190 312 136.3 258.3 136.3 192C136.3 125.7 190 72 256.3 72C322.6 72 376.3 125.7 376.3 192C376.3 258.3 322.6 312 256.3 312z" /></svg>
            </div>
            Friend requests
          </div>
          <div className="goicon"></div>
        </div>


        <div className="menu" onClick={() => {
          navigate('Suggestions')
        }}>
          <div className="iconText">
            <div className="icon">
              <svg width={25} height={25} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
                <path d="M256 72C322.3 72 376 125.7 376 192C376 258.3 322.3 312 256 312C189.7 312 136 258.3 136 192C136 125.7 189.7 72 256 72zM226.3 368L285.7 368C289.6 368 293.6 368.1 297.5 368.4C281.3 396.6 272 429.2 272 464C272 505.8 285.4 544.5 308 576L77.7 576C61.3 576 48 562.7 48 546.3C48 447.8 127.8 368 226.3 368zM320 464C320 384.5 384.5 320 464 320C543.5 320 608 384.5 608 464C608 543.5 543.5 608 464 608C384.5 608 320 543.5 320 464zM464 384C455.2 384 448 391.2 448 400L448 464C448 472.8 455.2 480 464 480L512 480C520.8 480 528 472.8 528 464C528 455.2 520.8 448 512 448L480 448L480 400C480 391.2 472.8 384 464 384z" /></svg>
            </div>
            Suggestions
          </div>
          <div className="goicon"></div>
        </div>

        <div className="menu" onClick={() => {
          navigate('Friends')
        }} >
          <div className="iconText">
            <div className="icon">
              <svg width={25} height={25} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
                <path d="M320 80C377.4 80 424 126.6 424 184C424 241.4 377.4 288 320 288C262.6 288 216 241.4 216 184C216 126.6 262.6 80 320 80zM96 152C135.8 152 168 184.2 168 224C168 263.8 135.8 296 96 296C56.2 296 24 263.8 24 224C24 184.2 56.2 152 96 152zM0 480C0 409.3 57.3 352 128 352C140.8 352 153.2 353.9 164.9 357.4C132 394.2 112 442.8 112 496L112 512C112 523.4 114.4 534.2 118.7 544L32 544C14.3 544 0 529.7 0 512L0 480zM521.3 544C525.6 534.2 528 523.4 528 512L528 496C528 442.8 508 394.2 475.1 357.4C486.8 353.9 499.2 352 512 352C582.7 352 640 409.3 640 480L640 512C640 529.7 625.7 544 608 544L521.3 544zM472 224C472 184.2 504.2 152 544 152C583.8 152 616 184.2 616 224C616 263.8 583.8 296 544 296C504.2 296 472 263.8 472 224zM160 496C160 407.6 231.6 336 320 336C408.4 336 480 407.6 480 496L480 512C480 529.7 465.7 544 448 544L192 544C174.3 544 160 529.7 160 512L160 496z" /></svg>
            </div>
            All friends
          </div>
          <div className="goicon"></div>
        </div>

        <div className="menu">
          <div className="iconText">
            <div className="icon">
              <svg width={25} height={25} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
                <path d="M182.4 53.5L157.8 95.6C154 102.1 152 109.6 152 117.2L152 120C152 142.1 169.9 160 192 160C214.1 160 232 142.1 232 120L232 117.2C232 109.6 230 102.2 226.2 95.6L201.6 53.5C199.6 50.1 195.9 48 192 48C188.1 48 184.4 50.1 182.4 53.5zM310.4 53.5L285.8 95.6C282 102.1 280 109.6 280 117.2L280 120C280 142.1 297.9 160 320 160C342.1 160 360 142.1 360 120L360 117.2C360 109.6 358 102.2 354.2 95.6L329.6 53.5C327.6 50.1 323.9 48 320 48C316.1 48 312.4 50.1 310.4 53.5zM413.8 95.6C410 102.1 408 109.6 408 117.2L408 120C408 142.1 425.9 160 448 160C470.1 160 488 142.1 488 120L488 117.2C488 109.6 486 102.2 482.2 95.6L457.6 53.5C455.6 50.1 451.9 48 448 48C444.1 48 440.4 50.1 438.4 53.5L413.8 95.6zM224 224C224 206.3 209.7 192 192 192C174.3 192 160 206.3 160 224L160 277.5C122.7 290.6 96 326.2 96 368L96 388.8C116.9 390.1 137.6 396.1 156.3 406.8L163.4 410.9C189.7 425.9 222.3 424.3 247 406.7C290.7 375.5 349.3 375.5 393 406.7C417.6 424.3 450.3 426 476.6 410.9L483.7 406.8C502.4 396.1 523 390.1 544 388.8L544 368C544 326.2 517.3 290.6 480 277.5L480 224C480 206.3 465.7 192 448 192C430.3 192 416 206.3 416 224L416 272L352 272L352 224C352 206.3 337.7 192 320 192C302.3 192 288 206.3 288 224L288 272L224 272L224 224zM544 437C531.3 438.2 518.9 442 507.5 448.5L500.4 452.6C457.8 476.9 405 474.3 365.1 445.8C338.1 426.5 301.9 426.5 274.9 445.8C235 474.3 182.2 477 139.6 452.6L132.5 448.5C121.1 442 108.7 438.1 96 437L96 512C96 547.3 124.7 576 160 576L480 576C515.3 576 544 547.3 544 512L544 437z" /></svg>
            </div>
            Birthday
          </div>
          <div className="goicon"></div>
        </div>

        <div className="menu">
          <div className="iconText">
            <div className="icon">
              <svg width={25} height={25} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
                <path d="M439.4 96L448 96C483.3 96 512 124.7 512 160L512 512C512 547.3 483.3 576 448 576L192 576C156.7 576 128 547.3 128 512L128 160C128 124.7 156.7 96 192 96L200.6 96C211.6 76.9 232.3 64 256 64L384 64C407.7 64 428.4 76.9 439.4 96zM376 176C389.3 176 400 165.3 400 152C400 138.7 389.3 128 376 128L264 128C250.7 128 240 138.7 240 152C240 165.3 250.7 176 264 176L376 176zM320 408C350.9 408 376 382.9 376 352C376 321.1 350.9 296 320 296C289.1 296 264 321.1 264 352C264 382.9 289.1 408 320 408zM226.3 477C213.4 492.6 228.5 512 248.7 512L391.2 512C411.4 512 426.5 492.6 413.6 477C398.9 459.3 376.7 448 351.9 448L287.9 448C263.1 448 240.9 459.3 226.2 477z" /></svg>
            </div>
            Custom lists
          </div>
          <div className="goicon"></div>
        </div>



      </div>
      <div className="col-md-9 col-12 CardsBox ">
        <div className="hed">Friend requests</div>
        <div className="row pe-4">
          {
            Users && Users.map((elem) => {
              return <div className="col-3 Card" key={elem._id}>
                <div className="ok">
                  <img className='profileImage' src={elem.profilePic!=''?`${BACKENDAPI}${elem.profilePic}`:profilePic} alt="" srcset="" />
                </div>
                <div className="profileContent">
                  <div className="name">{elem.firstName+" "+elem.lastName}</div>
                  <div className="">
                    <button onClick={()=>{acceptFollowRequest(elem._id)}} className="button" style={{ backgroundColor: 'blue', color: 'white' }}>Confirm</button>
                    <button className="button">Delete</button>
                  </div>
                </div>
              </div>
            })
          }

          
        </div>

      </div>
    </div>
  )
}

export default Friend