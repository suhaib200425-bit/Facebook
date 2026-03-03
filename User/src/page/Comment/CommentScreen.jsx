import React, { useEffect } from 'react'
import './CommentScreen.css'
import PostCard from '../../components/PostCard/PostCard'
// import { comments } from '../../assets/assets'
import axios from 'axios'
import { useState } from 'react'
import { profilePic } from '../../assets/assets'
const BACKENDAPI = import.meta.env.VITE_BACKEND_API_URL;
function CommentScreen({ setActiveCommentScreen, CommentPostId }) {
  const Token = localStorage.getItem('token')
  const [Post,SetPost]=useState([])
  const [Comments,SetComments]=useState([])
  const [text,Settext]=useState('')
  useEffect(() => {
    async function getComments() {
      try {
        const response = await axios.get(
          `${BACKENDAPI}/api/comment/post/${CommentPostId}`,
          {
            headers: {
              Authorization: `Bearer ${Token}`
            }
          }
        )
        console.log(response.data);
        if(response.data.status){
          SetPost(response.data.post)
          SetComments(response.data.comments)
        }else{
          alert(response.data.message)
        }

      } catch (error) {
        alert(error.message)
      }
    }
    getComments()
  }, [CommentPostId])

  async function handlecomment(){
    try{
      const response= await axios.post(`${BACKENDAPI}/api/comment/sent/${CommentPostId}`,{
        text
      },{
        headers:{
          Authorization:`Bearer ${Token}`
        }
      })
      console.log(response.data);
      
    }catch(error){
      alert(error.message)
    }
  }
  return (
    <div className='CommentScreen'>
      <div className="col-10 Box">
        <div className="header">
          <h4>Wirally Malayalam's post</h4>
          <svg onClick={() => {
            setActiveCommentScreen(false)
          }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" width={30} height={30}>
            <path d="M183.1 137.4C170.6 124.9 150.3 124.9 137.8 137.4C125.3 149.9 125.3 170.2 137.8 182.7L275.2 320L137.9 457.4C125.4 469.9 125.4 490.2 137.9 502.7C150.4 515.2 170.7 515.2 183.2 502.7L320.5 365.3L457.9 502.6C470.4 515.1 490.7 515.1 503.2 502.6C515.7 490.1 515.7 469.8 503.2 457.3L365.8 320L503.1 182.6C515.6 170.1 515.6 149.8 503.1 137.3C490.6 124.8 470.3 124.8 457.8 137.3L320.5 274.7L183.1 137.4z" /></svg>
        </div>
        <div className="row displayCommentAndpost col-12 ">
          <div className="col-10">
            <PostCard Comment Data={Post}/>
            <hr />
            <div className="commests ps-4">
              {
                Comments.map((elem, index) => (
                  <div className="comment" key={index}>
                    <div className="CommentUser" style={{ backgroundImage: elem.user.profilePic!=''?`url(${BACKENDAPI}${elem.user.profilePic})`: `url(${profilePic})` }}></div>
                    <div className="UserComment">
                      <strong>{elem.user.firstName}</strong>
                      <br />
                      {elem.text}
                    </div>

                  </div>
                ))
              }
            </div>
          </div>
        </div>
        <div className="inputBox">
          <input value={text} name="" placeholder='Comment' id="" onChange={(e)=>{
            Settext(e.target.value)
          }}></input>
          {/* <svg className='' width={40} height={40} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
            <path d="M457.5 71C450.6 64.1 440.3 62.1 431.3 65.8C422.3 69.5 416.5 78.3 416.5 88L416.5 144L368.5 144C280.1 144 208.5 215.6 208.5 304C208.5 350.7 229.2 384.4 252.1 407.4C260.2 415.6 268.6 422.3 276.4 427.8C285.6 434.3 298.1 433.5 306.5 425.9C314.9 418.3 316.7 405.9 311 396.1C307.4 389.8 304.5 381.2 304.5 369.4C304.5 333.2 333.8 303.9 370 303.9L416.5 303.9L416.5 359.9C416.5 369.6 422.3 378.4 431.3 382.1C440.3 385.8 450.6 383.8 457.5 376.9L593.5 240.9C602.9 231.5 602.9 216.3 593.5 207L457.5 71zM464.5 168L464.5 145.9L542.6 224L464.5 302.1L464.5 280C464.5 266.7 453.8 256 440.5 256L370 256C319.1 256 276.1 289.5 261.7 335.6C258.4 326.2 256.5 315.8 256.5 304C256.5 242.1 306.6 192 368.5 192L440.5 192C453.8 192 464.5 181.3 464.5 168zM144.5 160C100.3 160 64.5 195.8 64.5 240L64.5 496C64.5 540.2 100.3 576 144.5 576L400.5 576C444.7 576 480.5 540.2 480.5 496L480.5 472C480.5 458.7 469.8 448 456.5 448C443.2 448 432.5 458.7 432.5 472L432.5 496C432.5 513.7 418.2 528 400.5 528L144.5 528C126.8 528 112.5 513.7 112.5 496L112.5 240C112.5 222.3 126.8 208 144.5 208L168.5 208C181.8 208 192.5 197.3 192.5 184C192.5 170.7 181.8 160 168.5 160L144.5 160z" /></svg> */}
          <svg onClick={()=>{handlecomment()}} fill='blue' className='' width={40} height={40} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
            <path d="M416.5 88L416.5 160L352.5 160C273 160 208.5 224.5 208.5 304C208.5 397.4 291.3 438.8 309.1 446.6C311.3 447.6 313.7 448 316.2 448L318.7 448C328.5 448 336.5 440 336.5 430.2C336.5 421.9 330.6 414.7 323.7 409.9C314.8 403.7 304.5 391.7 304.5 369.4C304.5 324.4 341 287.9 386 287.9L416.5 287.9L416.5 359.9C416.5 369.6 422.3 378.4 431.3 382.1C440.3 385.8 450.6 383.8 457.5 376.9L593.5 240.9C602.9 231.5 602.9 216.3 593.5 207L457.5 71C450.6 64.1 440.3 62.1 431.3 65.8C422.3 69.5 416.5 78.3 416.5 88zM144.5 160C100.3 160 64.5 195.8 64.5 240L64.5 496C64.5 540.2 100.3 576 144.5 576L400.5 576C444.7 576 480.5 540.2 480.5 496L480.5 464C480.5 446.3 466.2 432 448.5 432C430.8 432 416.5 446.3 416.5 464L416.5 496C416.5 504.8 409.3 512 400.5 512L144.5 512C135.7 512 128.5 504.8 128.5 496L128.5 240C128.5 231.2 135.7 224 144.5 224L160.5 224C178.2 224 192.5 209.7 192.5 192C192.5 174.3 178.2 160 160.5 160L144.5 160z" /></svg>
        </div>
      </div>
    </div>
  )
}

export default CommentScreen