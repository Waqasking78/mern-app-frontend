import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { useContext } from "react";
import { UserContext } from "../Context/AuthContext";

const Profile = () => {
  const location = useLocation();
  const queries = new URLSearchParams(location.search);
  const [s, setS] = useState(queries.get("s"));
  const navigate = useNavigate();
  const fileElem = useRef();
  const [userPosts, setUserPosts] = useState(null);
  const { updateUser, user } = useContext(UserContext);
  const [savedPosts, setsavedPosts] = useState(null);
  const postBtnRef = useRef()
  const SavedBtnRef = useRef()

  function btnHandler(btn1, btn2){
    btn1.current.style.borderTop = "2px solid white"
    btn2.current.style.borderTop = "none"
  }

  console.log(user)
  useEffect(() => {
    async function dataGetter() {
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_BACKEND_API_URL}/profile`,
          {},
          { withCredentials: true }
        );
        setUserPosts(response.data.profileUser.posts);
        setsavedPosts(response.data.profileUser.savedPosts);
        console.log("Postsssssssssssssssss", response.data);
      } catch (error) {
        console.log(error);
        navigate("/");
      }
    }
    dataGetter();
  }, []);

  const handleFileChange = async (e) => {
    const file = e.target.files[0]; // Get selected file
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_API_URL}/profilePic/upload`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
      );
      updateUser({ ...user, profilePicture: "http://localhost:3000/images/" + response.data.fileName });
      console.log("object", response);
    } catch (error) {
      console.error("Upload failed:", error);
    }
  };

  const handleOverlayClick = () => {
    fileElem.current.click();
  };

  // useEffect(()=>{
  // })

  return (
    <div className="profile flex justify-center bg-red-400">
      <div className="profile__container w-full pl-48 bg-black ">
        <div className="top-profle-container flex justify-center pb-20 pt-10 gap-20 text-white">
          <div className="con flex items-center gap-10 mr-50">
            <div className="group profile_img h-40 w-40 bg-red-400 rounded-full mt-5 relative cursor-pointer">
              <input
                ref={fileElem}
                type="file"
                hidden
                onChange={handleFileChange}
              />
              <img
                title="Change photo."
                onClick={handleOverlayClick}
                className="h-full w-full z-10 rounded-full absolute top-0 left-0 object-cover object-center"
                src={`${user?.profilePicture}`}
                alt=""
                loading="lazy"
              />
            </div>
            <div className="other_profile_stuff flex flex-col gap-5">
              <div className="username-edit-options flex items-center gap-3">
                <div className="username2">
                  <span className="text-2xl">{user?.username}</span>
                </div>
                <div className="btns-con flex items-center gap-7">
                  <div className="btn1">
                    <Link
                      to={"/edit-profile"}
                      className="bg-[rgb(54,54,54)] text-white px-3 py-1 font-medium text-md rounded-lg"
                    >
                      Edit profile
                    </Link>
                  </div>
                  <Link to={"/settings"} className="btn-2 cursor-pointer h-8 w-8 flex items-center justify-center rounded-full hover:bg-[#b4b4b450] hover:opacity-90 ">
                    <i class="ri-settings-5-line text-xl"></i>
                  </Link>
                </div>
              </div>
              <div className="posts-following-followers flex gap-8">
                <div className="posts flex gap-1">
                  <span className="font-bold">{user?.posts?.length || 0}</span>
                  <span>posts</span>
                </div>
                <div className="followers flex gap-1">
                  <span className="font-bold">
                    {user?.followers?.length || 0}
                  </span>
                  <span>followers</span>
                </div>
                <div className="following flex gap-1">
                  <span className="font-bold">
                    {user?.following?.length || 0}
                  </span>
                  <span>following</span>
                </div>
              </div>
              <div className="decription -mt-2">
                <span className="">{user?.bio}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="posts container text-white px-10 ">
          <div className="container text-sm border-t-[1px] border-[rgba(255,255,255,0.33)]">
            <div className="top flex justify-center gap-10 pb-10">
              <Link
                ref={postBtnRef}
                onClick={() => {setS(""); btnHandler(postBtnRef, SavedBtnRef)}}
                to={"/profile"}
                className="cursor-pointer py-3 border-t-2 tracking-wider font-medium"
              >
                POSTS
              </Link>
              <Link
                ref={SavedBtnRef}
                onClick={() => {setS("t"); btnHandler(SavedBtnRef, postBtnRef)}}
                to={"/profile?s=t"}
                className="cursor-pointer py-3 tracking-wider"
              >
                SAVED
              </Link>
            </div>
            <div className="posts flex flex-wrap justify-center gap-1">
              {s == "t" ? (
                <div className="h-full w-full relative grid grid-cols-3 gap-4 py-10">
                  {savedPosts && savedPosts?.length > 0 ? (
                    savedPosts?.map((post, key) => {
                      return (
                        <div key={key} className="card h-[70vh] rounded-md relative group cursor-pointer">
                          <Link to={`/post/${post._id}`} className="overlay h-full w-full absolute left-0 top-0 bg-[#00000041] duration-1000 transition-all hidden group-hover:block"></Link>
                          <Link to={`/post/${post._id}`}>
                          <img
                            className="h-full w-full object-cover object-center"
                            src={`${post?.picture}`}
                            alt=""
                          />
                          </Link>
                        </div>
                      );
                    })
                  ) : (
                    <div className="text-xl text-center items-center gap-5 flex flex-col absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                      <span>No posts saved.</span>
                      <Link
                        to={"/create-post"}
                        className="rounded border border-white bg-black text-white transition hover:bg-white hover:text-black px-4 py-2 font-medium w-fit"
                      >
                        See feed
                      </Link>
                    </div>
                  )}
                </div>
              ) : (
                <div className="h-full w-full relative grid grid-cols-3 gap-4 py-10">
                  {userPosts && userPosts.length > 0 ? (
                    userPosts?.map((post, key) => {
                      return (
                        <div key={key} className="card h-[70vh] rounded-md relative group cursor-pointer">
                          <Link to={`/post/${post._id}`} className="overlay h-full w-full absolute left-0 top-0 bg-[#00000041] duration-1000 transition-all hidden group-hover:block"></Link>

                          <Link to={`/post/${post._id}`}>
                          <img
                            className="h-full w-full object-cover object-center"
                            src={`${post?.picture}`}
                            alt=""
                          />
                          </Link>
                        </div>
                      );
                    })
                  ) : (
                    <div className="text-xl text-center items-center gap-5 flex flex-col absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                      <span>No posts created.</span>
                      <Link
                        to={"/create-post"}
                        className="rounded border border-white bg-black text-white transition hover:bg-white hover:text-black px-4 py-2 font-medium w-fit"
                      >
                        Create now
                      </Link>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
