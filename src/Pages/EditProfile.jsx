import axios from "axios";
import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../Context/AuthContext";

const EditProfile = () => {
  const { updateUser, user } = useContext(UserContext);
  const [editProfileErr, setEditProfileErr] = useState("");
  const [successMsg, setSuccessMsg] = useState("")
  const [editProfileData, setEditProfileData] = useState({...user});

  const navigate = useNavigate();
  const input = useRef();

  const handleFileClick = () => {
    input.current.click();
    console.log(editProfileData);
  };

  useEffect(() => {
    async function dataGetter() {
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_BACKEND_API_URL}/profile`,
          {},
          { withCredentials: true }
        );
        setEditProfileData({
          ...editProfileData,
          username: response.data.profileUser.username,
          bio: response.data.profileUser.bio,
        });
      } catch (error) {
        navigate("/");
        console.error("Error:", error.response);
      }
    }
    dataGetter();
  }, []);

  const ProfilePictureEdit = async function (e) {
    try {
      const formData = new FormData();
      formData.append("file", e.target.files[0]);
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_API_URL}/profilePic/upload`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
      );
      updateUser({ ...user, profilePicture: "http://localhost:3000/images/" + response.data.fileName });
    } catch (error) {
      console.error("Upload failed:", error);
    }
  };

  const bioAndUsernameEdit = async () => {
    setEditProfileErr("");
    setSuccessMsg("")
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_API_URL}/edit-profile`,
        editProfileData,
        { withCredentials: true }
      );
      updateUser(response.data.profileUser);
      setSuccessMsg(response.data.message);
      setTimeout(() => {
        setSuccessMsg("")
      }, 3000);
    } catch (error) {
      setEditProfileErr(error.response.data.err);
      setSuccessMsg("")
      setTimeout(() => {
        setEditProfileErr("")
      }, 3000);
    }
  };

  return (
    <div className="div w-full h-[100vh] flex justify-center ">
      <div className="w-2/3 h-full bg--400 px-10 py-5 flex items-center justify-center">
        <div className="user w-2/3 mx-auto my-auto flex flex-col gap-5">
          {editProfileErr ? (
            <p className="text-center font-bold mx-auto text-red-600">
              {editProfileErr}
            </p>
          ) : (
            ""
          )}
          {successMsg ? (
            <p className="text-center font-bold mx-auto text-green-600">
              {successMsg}
            </p>
          ) : (
            ""
          )}
          <div className="profilePicture rounded w-full bg-[rgba(255,255,255,.14)] px-10 py-2 flex items-center justify-between">
            <div className="left h-20 w-20 rounded-full bg-green-300 overflow-hidden">
              <input
                ref={input}
                hidden
                onChange={(e)=>{
                  ProfilePictureEdit(e);
                }}
                
                type="file"
                name=""
                id=""
              />
              <img
                className="h-full w-full object-cover object-center"
                src={user?.profilePicture}
                alt=""
              />
            </div>
            <div className="right">
              <button
                onClick={() => {
                  handleFileClick();
                }}
                className="px-3 py-2 bg-[rgb(0,149,246)] text-white font-bold rounded-md cursor-pointer"
              >
                Change
              </button>
            </div>
          </div>
          <div className="bio rounded w-full flex gap-5 bg-[rgba(255,255,255,.14)] px-10 py-2 text-end">
            {/* <span>bio</span> */}
            <input
              value={editProfileData?.username}
              onChange={(e) => {
                setEditProfileData((prev) => ({
                  ...prev,
                  username: e.target.value,
                }));
              }}
              placeholder="Change username."
              name=""
              id=""
              rows="3"
              className="flex resize-none w-full outline-none text-white border-[1px] rounded border-[rgba(255,255,255,.5)] p-2"
            ></input>
            <button
              onClick={bioAndUsernameEdit}
              className="px-3 mt-3 py-2 bg-[rgb(0,149,246)] text-white font-bold rounded-md cursor-pointer"
            >
              Change
            </button>
          </div>
          <div className="bio rounded w-full bg-[rgba(255,255,255,.14)] px-10 py-2 text-end">
            {/* <span>bio</span> */}
            <textarea
              value={editProfileData?.bio}
              onChange={(e) => {
                setEditProfileData((prev) => ({
                  ...prev,
                  bio: e.target.value,
                }));
              }}
              placeholder="Add bio."
              name=""
              id=""
              rows="3"
              className="resize-none w-full outline-none text-white border-[1px] rounded border-[rgba(255,255,255,.5)] p-2"
            ></textarea>
            <button
              onClick={bioAndUsernameEdit}
              className="px-3 mt-3 py-2 bg-[rgb(0,149,246)] text-white font-bold rounded-md cursor-pointer"
            >
              Change
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
