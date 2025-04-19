import React, { useContext, useEffect, useRef, useState } from 'react'
import { checkPostIsLike, followBtn } from '../utils/utils'
import { UserContext } from '../Context/AuthContext'
import { useParams } from 'react-router-dom'
import axios from 'axios'

const ViewPost = () => {
    const { user, updateUser } = useContext(UserContext)
    const followBtnRef = useRef()
    const { postId } = useParams()
    const [postData, setPostData] = useState()

    useEffect(() => {
        async function GetData() {
            const res = await axios.post(`${import.meta.env.VITE_BACKEND_API_URL}/post/${postId}`)
            setPostData(res.data)
        }
        GetData();
    }, [postId])

    return (
        <div className="min-h-screen bg-black text-white flex justify-center p-4">
            {postData ? (
                <div className="w-full max-w-2xl bg-neutral-900 rounded-2xl shadow-lg overflow-hidden">
                    {/* <!-- Header: User Info --> */}
                    <div className="flex items-center justify-between px-4 py-3 border-b border-neutral-700">
                        <div className="flex items-center gap-3">
                            <img src={postData?.author.profilePicture} alt="User" className="w-10 h-10 rounded-full"></img>
                            <span className="font-semibold text-white">{postData?.author.username}</span>
                        </div>
                        {postData?.likes.includes(user?._id) ? <button className="bg-[rgb(54,54,54)] cursor-pointer text-white px-3 py-1 font-medium text-md rounded-lg">Following</button> :
                            <button ref={followBtnRef} onClick={() => followBtn(followBtnRef, updateUser, user, postData.author)} className="bg-[rgb(0,149,246)] cursor-pointer text-white px-3 py-1 font-medium text-md rounded-lg">Follow</button>
                        }
                    </div>

                    {/* <!-- Post Image --> */}
                    <div className="w-full">
                        <img src={postData?.picture} alt="Post" className="w-full object-cover"></img>
                    </div>

                    {/* <!-- Post Info --> */}
                    <div className="px-4 py-3 space-y-2">
                        <div className="pt-2 flex gap-1 items-center">
                            <i
                                className={`ri-heart-fill hover:scale-[0.98] relative ${user && checkPostIsLike(user, postData) ? "text-red-600" : "text-[#dddd]"} cursor-pointer text-xl font-extralight overflow-hidden rounded-full`}
                            ></i>
                            <span className={`text-sm text-gray-400 font-medium`}>
                                {postData?.likes?.length} likes
                            </span>
                        </div>
                        <p className="text-white leading-relaxed">
                            <span className="font-semibold mr-4">{postData?.title}</span>
                            <span>
                                {postData?.description}
                            </span>                        </p>
                    </div>
                </div>
            ) : (
                <span className='text-xl text-red-600 text-center my-auto'>Post not found</span>
            )}
        </div>

    )
}

export default ViewPost
