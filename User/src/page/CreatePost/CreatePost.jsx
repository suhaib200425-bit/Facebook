import React, { useEffect, useState } from 'react'
import './CreatePost.css'
import axios from 'axios';
import { useFace } from '../../context/FaceContext';
const BACKENDAPI = import.meta.env.VITE_BACKEND_API_URL;
function CreatePost({ setpickimage, setActiveCreatePostScreen, pickimage }) {
    const {setAllPosts}=useFace()
    const [Postdata, setPostdata] = useState({
        caption: '',
        contentType: 'text'
    })
    const [Preview, setPreview] = useState(null)

    useEffect(() => {
        if (pickimage) {
            handleclickimage()
        }
    }, [])

    function handleclickimage() {
        document.getElementById('mediaId').click()
    }
    function handleImageChange(e) {
        const file = e.target.files[0];

        if (file) {
            setPostdata(prev => {
                return {
                    ...prev,
                    media: file,
                    contentType: 'image'
                }
            }); // file object
            setPreview(URL.createObjectURL(file)); // preview URL
        }
    };

    async function handleSubmit() {
        console.log(Postdata);
        try {
            const Token= localStorage.getItem('token')
            const formData = new FormData();

            formData.append("caption", Postdata.caption);
            formData.append("contentType", Postdata.contentType);

            // If image selected
            if (Postdata.media) {
                formData.append("media", Postdata.media);
            }

            const response = await axios.post(
                `${BACKENDAPI}/api/post/upload`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${Token}`,
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            console.log(response.data);
            alert("Post uploaded successfully ✅");
            if(response.data.status){
                setActiveCreatePostScreen(false)
                setAllPosts(prev=>{
                    return [response.data.data,...prev]
                })
            }

        } catch (error) {
            console.log(error.response?.data || error.message);
            alert("Upload failed ❌");
        }
    }

    return (
        <div className='CreatePost'>
            <div className="Card col-11 col-md-5">
                <div className="col-12">
                    <div className="hed">
                        <h5>Create Post</h5>
                        <svg onClick={() => {
                            setpickimage(false)
                            setActiveCreatePostScreen(false)
                        }} width={30} height={30} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
                            <path d="M183.1 137.4C170.6 124.9 150.3 124.9 137.8 137.4C125.3 149.9 125.3 170.2 137.8 182.7L275.2 320L137.9 457.4C125.4 469.9 125.4 490.2 137.9 502.7C150.4 515.2 170.7 515.2 183.2 502.7L320.5 365.3L457.9 502.6C470.4 515.1 490.7 515.1 503.2 502.6C515.7 490.1 515.7 469.8 503.2 457.3L365.8 320L503.1 182.6C515.6 170.1 515.6 149.8 503.1 137.3C490.6 124.8 470.3 124.8 457.8 137.3L320.5 274.7L183.1 137.4z" /></svg>
                    </div>
                    <div className="profilebar">
                        <div className="profileimage" style={{ backgroundImage: `url(https://i.pinimg.com/736x/f4/0c/6f/f40c6f5fc070d90ee72eda4f797c6ad2.jpg)` }}>

                        </div>
                        <strong>Prasad</strong>
                    </div>
                    <div className="scroll">
                        <input
                            value={Postdata.caption}
                            onChange={(e) => {
                                setPostdata(prev => {
                                    return { ...prev, [e.target.name]: e.target.value }
                                })
                            }} type="text" name='caption' placeholder="What's on your mind, Suhaib?" style={{ fontSize: Preview != null ? '16px' : '', border: Preview != null ? '1px solid gray' : '' }} />
                        {
                            Preview != null &&
                            <div className="Preview">
                                <img src={Preview} alt="" srcset="" />
                            </div>
                        }
                    </div>
                </div>
                <div className="col-12">
                    <div className="col-12 bottompostmenu">
                        <div className="">
                            <strong> Add to your Post</strong>
                        </div>
                        <div className="IconsBox">
                            <svg onClick={handleclickimage} width={30} height={30} fill='green' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
                                <path d="M160 144C151.2 144 144 151.2 144 160L144 480C144 488.8 151.2 496 160 496L480 496C488.8 496 496 488.8 496 480L496 160C496 151.2 488.8 144 480 144L160 144zM96 160C96 124.7 124.7 96 160 96L480 96C515.3 96 544 124.7 544 160L544 480C544 515.3 515.3 544 480 544L160 544C124.7 544 96 515.3 96 480L96 160zM224 192C241.7 192 256 206.3 256 224C256 241.7 241.7 256 224 256C206.3 256 192 241.7 192 224C192 206.3 206.3 192 224 192zM360 264C368.5 264 376.4 268.5 380.7 275.8L460.7 411.8C465.1 419.2 465.1 428.4 460.8 435.9C456.5 443.4 448.6 448 440 448L200 448C191.1 448 182.8 443 178.7 435.1C174.6 427.2 175.2 417.6 180.3 410.3L236.3 330.3C240.8 323.9 248.1 320.1 256 320.1C263.9 320.1 271.2 323.9 275.7 330.3L292.9 354.9L339.4 275.9C343.7 268.6 351.6 264.1 360.1 264.1z" /></svg>
                            <svg width={30} height={30} fill='orange' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
                                <path d="M528 320C528 205.1 434.9 112 320 112C205.1 112 112 205.1 112 320C112 434.9 205.1 528 320 528C434.9 528 528 434.9 528 320zM64 320C64 178.6 178.6 64 320 64C461.4 64 576 178.6 576 320C576 461.4 461.4 576 320 576C178.6 576 64 461.4 64 320zM241.3 383.4C256.3 399 282.4 416 320 416C357.6 416 383.7 399 398.7 383.4C407.9 373.8 423.1 373.5 432.6 382.7C442.1 391.9 442.5 407.1 433.3 416.6C411.2 439.6 373.3 464 320 464C266.7 464 228.8 439.6 206.7 416.6C197.5 407 197.8 391.8 207.4 382.7C217 373.6 232.2 373.8 241.3 383.4zM240 244C224.5 244 212 256.5 212 272L212 280C212 291 203 300 192 300C181 300 172 291 172 280L172 272C172 234.4 202.4 204 240 204C277.6 204 308 234.4 308 272L308 280C308 291 299 300 288 300C277 300 268 291 268 280L268 272C268 256.5 255.5 244 240 244zM372 272L372 280C372 291 363 300 352 300C341 300 332 291 332 280L332 272C332 234.4 362.4 204 400 204C437.6 204 468 234.4 468 272L468 280C468 291 459 300 448 300C437 300 428 291 428 280L428 272C428 256.5 415.5 244 400 244C384.5 244 372 256.5 372 272z" /></svg>
                            <svg width={25} height={25} fill='blue' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
                                <path d="M256 72C322.3 72 376 125.7 376 192C376 258.3 322.3 312 256 312C189.7 312 136 258.3 136 192C136 125.7 189.7 72 256 72zM226.3 368L285.7 368C289.6 368 293.6 368.1 297.5 368.4C281.3 396.6 272 429.2 272 464C272 505.8 285.4 544.5 308 576L77.7 576C61.3 576 48 562.7 48 546.3C48 447.8 127.8 368 226.3 368zM320 464C320 384.5 384.5 320 464 320C543.5 320 608 384.5 608 464C608 543.5 543.5 608 464 608C384.5 608 320 543.5 320 464zM464 384C455.2 384 448 391.2 448 400L448 464C448 472.8 455.2 480 464 480L512 480C520.8 480 528 472.8 528 464C528 455.2 520.8 448 512 448L480 448L480 400C480 391.2 472.8 384 464 384z" /></svg>
                            <svg width={30} height={30} fill='red' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
                                <path d="M128 252.6C128 148.4 214 64 320 64C426 64 512 148.4 512 252.6C512 371.9 391.8 514.9 341.6 569.4C329.8 582.2 310.1 582.2 298.3 569.4C248.1 514.9 127.9 371.9 127.9 252.6zM320 320C355.3 320 384 291.3 384 256C384 220.7 355.3 192 320 192C284.7 192 256 220.7 256 256C256 291.3 284.7 320 320 320z" /></svg>
                            <svg fill='skyblue' width={30} height={30} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
                                <path d="M385.5 132.8C393.1 119.9 406.9 112 421.8 112L424 112C446.1 112 464 129.9 464 152C464 174.1 446.1 192 424 192L350.7 192L385.5 132.8zM254.5 132.8L289.3 192L216 192C193.9 192 176 174.1 176 152C176 129.9 193.9 112 216 112L218.2 112C233.1 112 247 119.9 254.5 132.8zM344.1 108.5L320 149.5L295.9 108.5C279.7 80.9 250.1 64 218.2 64L216 64C167.4 64 128 103.4 128 152C128 166.4 131.5 180 137.6 192L96 192C78.3 192 64 206.3 64 224L64 256C64 273.7 78.3 288 96 288L544 288C561.7 288 576 273.7 576 256L576 224C576 206.3 561.7 192 544 192L502.4 192C508.5 180 512 166.4 512 152C512 103.4 472.6 64 424 64L421.8 64C389.9 64 360.3 80.9 344.1 108.4zM544 336L344 336L344 544L480 544C515.3 544 544 515.3 544 480L544 336zM296 336L96 336L96 480C96 515.3 124.7 544 160 544L296 544L296 336z" /></svg>

                            <input
                                id='mediaId'
                                type="file"
                                name="media"
                                hidden
                                accept="image/*"
                                onChange={(e) => {
                                    handleImageChange(e)
                                }} />
                        </div>
                    </div>

                    <div className="postbtn">
                        <button className="btn col-12" onClick={handleSubmit}>POST</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreatePost