import axios from 'axios';
import { useContext, useEffect, useRef, useState } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { UserContext } from '../Context/AuthContext';
import { followBtn } from '../utils/utils';
import Loader from '../Components/Loader'
const UserProfile = () => {

  const followBtnRef = useRef()
  const navigate = useNavigate()
  const { user, updateUser } = useContext(UserContext)
  const [userData, setUserData] = useState(null)
  const { username } = useParams()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!username || !user) return;
    async function UserProfileGet() {

      const res = await axios.post(`${import.meta.env.VITE_BACKEND_API_URL}/user/${username}`)
      setUserData(res.data)
      // console.log(res)
      if (res.status == 200) setLoading(false)
    }
    if (username && user.username) {
      if (username == user.username) return navigate("/profile")
    }
    UserProfileGet()
  }, [username, user])

  useEffect(() => {
    console.log(user, "HELLOWIOU", username && "hek")
  }, [user])




  return (
    <div className="profile flex justify-center min-h-[100vh]">
      <div className="profile__container w-full pl-48 bg-black ">
        {loading && <Loader />}
        <div className="top-profle-container mr-50 items-center flex justify-center py-10 pb-20 gap-10 text-white">
          <div className="group profile_img h-40 w-40 bg-red-400 rounded-full mt-5 relative cursor-pointer">
            <img className="h-full w-full object-cover object-center z-10 rounded-full absolute top-0 left-0" src={userData?.profilePicture} alt="" />
          </div>
          <div className="other_profile_stuff flex flex-col gap-5">
            <div className="username-edit-options flex  gap-3">
              <div className="username">
                <span className="text-2xl">{userData?.username}</span>
              </div>
              <div className="btns-con">
                <div className="btn1">

                  {userData?.followers.includes(user?._id) ? <button className="bg-[rgb(54,54,54)] cursor-pointer text-white px-3 py-1 font-medium text-md rounded-lg">Following</button> : <button onClick={() => followBtn(followBtnRef, updateUser, user, userData, setUserData,)} ref={followBtnRef} className="bg-[rgb(0,149,246)] cursor-pointer text-white px-3 py-1 font-medium text-md rounded-lg">Follow</button>}
                </div>
              </div>
            </div>
            <div className="posts-following-followers flex gap-8">
              <div className="posts flex gap-1">
                <span className="font-bold">{userData?.posts.length}</span>
                <span>posts</span>
              </div>
              <div className="followers flex gap-1">
                <span className="font-bold">{userData?.followers.length}</span>
                <span>followers</span>
              </div>
              <div className="following flex gap-1">
                <span className="font-bold">{userData?.following.length}</span>
                <span>following</span>
              </div>
            </div>
            <div className="decription -mt-2">
              <span className="">{userData?.bio}</span>
            </div>
          </div>
        </div>
        <div className="posts-saved container text-white px-10">
          <div className="container text-sm border-t-[1px] border-[rgba(255,255,255,0.33)]">
            <div className="top flex justify-center gap-10">
              <span className="cursor-pointer py-3 border-t-2 border-white tracking-wider">POSTS</span>
            </div>
            <div className="posts flex flex-wrap justify-center gap-1">

              <div className="h-full w-full relative grid grid-cols-3 gap-4 py-10">
                {userData?.posts && userData?.posts.length > 0 ? (
                  userData?.posts?.map((post, key) => {
                    return (
                      <div key={key} className="card h-[70vh] rounded-md">
                        <img
                          className="h-full w-full object-cover object-center"
                          src={`${post?.picture}`}
                          alt=""
                        />
                      </div>
                    );
                  })
                ) : (
                  <div className="text-xl text-center items-center gap-5 flex flex-col absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <span>No posts found.</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserProfile
