import React, { useContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import { UserContext } from "../Context/AuthContext";
import { Link } from "react-router-dom";
const SeeStories = () => {
  const [Stories, setStories] = useState();
  const fileInput = useRef();
  const { user, updateUser } = useContext(UserContext);

  const HandleClick = () => {
    fileInput.current.click();
  };

  const HandleFileChange = async (e) => {
    const file = e.target.files[0];
    console.log("Selected File:", file);

    const form = new FormData();
    form.append("file", file);

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_API_URL}/create-story`,
        form,
        {
            withCredentials: true,
            headers: {
                "Content-Type": "multipart/form-data"
            },
        }
    );
      console.log(res)
      updateUser({...user,stories: res.data.user.stories})
    } catch (error) {
      console.error("Error uploading story:", error);
    }
  };

  useEffect(() => {
    const GetStories = async () => {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_API_URL}/get-stories`,
        {},
        { withCredentials: true }
      );
      console.log("first", res.data)
      setStories(res.data);
    };
    GetStories();
  }, []);
  return (
    <div className="text-center w-full pl-48 min-h-full">
      <div className="p-10">
        <h1 className="text-5xl font-bold border-b border-[#ffffff42] text-white py-4 ">
          Stories
        </h1>
        <div className="p-10 flex flex-col gap-10">
          <div className="flex gap-5">
            <div
              onClick={HandleClick}
              className="Add-story w-1/4 h-56 rounded flex border border-[#fff7] cursor-pointer items-center justify-center flex-col gap-5"
            >
              <input
                onChange={HandleFileChange}
                accept="image/*, video/*"
                type="file"
                name="file"
                hidden
                ref={fileInput}
                id=""
              />
              <div className="profile-Image h-2/4 w-2/4 rounded-full overflow-hidden flex items-center justify-center border-2 border-[rgba(255,255,255,0.3)] ">
                <i className="ri-add-line text-5xl text-white"></i>
              </div>
              <span className="username text-md font-medium text-white">
                Add Story
              </span>
            </div>
            {user?.stories.length > 0 ? (
              <Link to={"/my-stories"} className="box transition-all duration-200 hover:scale-[.99] cursor-pointer w-1/4 h-56 border border-[#fff7] rounded flex items-center justify-center flex-col gap-5">
                <div className="profile-Image h-2/4 w-2/4 rounded-full overflow-hidden">
                  <img
                    className="h-full w-full object-cover object-center"
                    src={user.profilePicture}
                    alt=""
                  />
                </div>
                <span className="username text-md font-medium text-white">
                  Your Story <br />
                  <span className="text-xs text-gray-500">
                  ({user.stories.length} {user.stories.length > 1 ? "stories" : "story"})
                  </span>
                </span>
              </Link>
            ) : (
              <div></div>
            )}
          </div>
          <div className="grid grid-cols-4 gap-4">
            {Stories?.map((user2, index) => {
              return (
                <Link to={`/stories/${user2.username}`}>
                <div
                  key={index}
                  className="box transition-all duration-200 hover:scale-[.99] cursor-pointer w-full h-56 border border-[#fff7] rounded flex items-center justify-center flex-col gap-5"
                >
                  <div className="profile-Image h-2/4 w-2/4 rounded-full overflow-hidden">
                    <img
                      className="h-full w-full object-cover object-center"
                      src={user2.profilePicture}
                      alt=""
                    />
                  </div>
                  <span className="username text-md font-medium text-white ">
                    {user2.username} <br />
                    <span className="text-xs text-gray-500">
                      ({user2.stories.length}{" "}
                      {user2.stories.length > 1 ? "stories" : "story"})
                    </span>
                  </span>
                </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeeStories;
