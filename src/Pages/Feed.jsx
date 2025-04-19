import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../Context/AuthContext";
import { Link } from "react-router-dom";
import { checkPostIsLike } from "../utils/utils";





const Feed = () => {

  const { user, updateUser } = useContext(UserContext);
  const [posts, setPosts] = useState(null);


  useEffect(() => {
    async function GetPosts() {
      const res = await axios.post(`${import.meta.env.VITE_BACKEND_API_URL}/feed`);
      console.log(res.data);
      setPosts(res.data);
    }
    GetPosts();
  }, []);

  async function likeHandler(e, post) {
    e.target.style.color = "red"
    const res = await axios.post(
      `${import.meta.env.VITE_BACKEND_API_URL}/post/like/${post._id}`,
      {},
      { withCredentials: true }
    )
    if (res.statusText == "OK") {
      updateUser({ ...user, likedPosts: [...user.likedPosts, res.data.postId] })
    }

    setPosts((prev) =>
      prev.map((p) =>
        p._id === post._id
          ? { ...p, likes: [...p.likes, user._id] }
          : p
      )
    );
  }



  const SaveButton = async (e, post) => {
    const res = await axios.post(
      `${import.meta.env.VITE_BACKEND_API_URL}/post/save/${post._id}`,
      {},
      { withCredentials: true }
    );
    console.log(res);
    e.target.style.cursor = "default"
    e.target.style.background = "#2e2e2e"
    e.target.textContent = "Saved"
  };

  if (user) {
    return (
      <div className="container py-10 mx-auto sm:px-20  flex items-center flex-col gap-4">
        {posts?.map((post, index) => {
          return (
            <div
              key={index}
              className=" rounded overflow-hidden lg:w-6/12 md:w-6/12 bg-[#171717] mx-3 md:mx-0 lg:mx-0 border border-b-[rgba(255,255,255,0.33)]"
            >
              <div className="w-full flex justify-between p-3">
                <div className="flex">
                  <div className="rounded-full h-8 w-8 bg-gray-500 flex items-center justify-center overflow-hidden">
                    <img
                      className="h-full w-full object-cover object-center"
                      src={post?.author.profilePicture}
                      alt="profilepic"
                    ></img>
                  </div>
                  <Link to={`/user/${post?.author.username}`} className="pt-1 ml-2 font-bold text-sm text-[#acacac]">
                    {post?.author.username}
                  </Link>
                </div>
                <span className="relative text-white hover:bg-[#2e2e2e] flex items-center justify-center rounded">
                  {user?.savedPosts.some(user => user._id == post._id) ? <span className="rounded px-3 py-2 cursor-default bg-[#2e2e2e]">Saved</span> : <span className="rounded px-3 py-2 cursor-pointer" onClick={(e) => SaveButton(e, post)}>Save</span>}
                </span>
              </div>
              <div className="con rounded-lg overflow-hidden flex items-center justify-center relative">
                <Link to={`/post/${post._id}`}>
                  <img
                    className="object-contain bg-cover"
                    src={`${post?.picture}`}
                  ></img>
                </Link>
              </div>
              <div className="px-3 pb-2">
                <div className="pt-2 flex gap-1 items-center">
                  <i
                    onClick={(e) => { likeHandler(e, post) }}
                    className={`ri-heart-fill hover:scale-[0.98] relative ${checkPostIsLike(user, post) ? "text-red-600" : "text-[#dddd]"} cursor-pointer text-xl font-extralight overflow-hidden rounded-full`}
                  ></i>
                  <span className={`text-sm text-gray-400 font-medium`}>
                    {post?.likes?.length} likes
                  </span>
                </div>
                <div className="pt-1">
                  <div className="mb-2 text-sm text-white">
                    <span className="font-medium mr-2 text-white">
                      {post?.author.username}
                    </span>
                    <span>{post?.description}</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  } else {
    return (
      <div className="text-gray-400 text-2xl text-center flex gap-2 items-center justify-center my-auto py-29">
        <span className="font-bold">Note: </span> Login or Register first to see feed page.
      </div>
    );
  }
};

export default Feed;
