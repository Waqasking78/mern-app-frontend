import React, { useContext, useEffect, useRef, useState } from "react";
import { UserContext } from "../Context/AuthContext";
import axios from "axios";

const MyStories = () => {
  const { user } = useContext(UserContext);
  const [stories, setStories] = useState();
  const [numberOfSlide, setNumberOfSlide] = useState()
  const [x, setX] = useState(1)
  const rightBtn = useRef();
  const leftBtn = useRef();
  const slide = useRef();


  useEffect(() => {
    const GetStories = async () => {
      try {
        const res = await axios.post(
          `${import.meta.env.VITE_BACKEND_API_URL}/user-stories?id=my`,
          {},
          { withCredentials: true }
        );
        setStories(res?.data?.stories)
        setNumberOfSlide(res?.data?.stories?.length)
        console.log(res?.data?.stories);
      } catch (error) {
        console.log(error)
      }
    }
    GetStories();
  }, []);


  const HandleLeftBtn = () => {
    if (x > 1) {
      setX(prevX => {
        console.log("Left", prevX - 1); // Logs correct value
        return prevX - 1;
      });
    } else if (x == 1){
    }
  };
  
  const HandleRightBtn = () => {
    if (x < numberOfSlide) { // Change `<=` to `<` to prevent going out of bounds
      setX(prevX => {
        console.log("Right", prevX + 1); // Logs correct value
        return prevX + 1;
      });
    } else if(x == numberOfSlide){

    }
  };
  

  useEffect(()=>{
    if (numberOfSlide > 0) {
      if (x == 1) {
        leftBtn.current.style.cursor = "not-allowed"
        rightBtn.current.style.cursor = "pointer"
      } else if (x == numberOfSlide){
        rightBtn.current.style.cursor = "not-allowed"
        leftBtn.current.style.cursor = "pointer"
      } else {
        leftBtn.current.style.cursor = "not-allowed"
        rightBtn.current.style.cursor = "not-allowed"
      }
      slide.current.style.transform = `translateX(-${x - 1}00%)`
      console.log("useEffect run", x);
    }
  }, [x])


  return (
    <div className="w-full pl-58 !text-white">
      {numberOfSlide > 0 ? (
              <div className="w-full h-[100vh] flex items-center justify-center">
              <div className="w-full h-full flex items-center justify-center flex-col gap-5">
                <h1 className="py-4 border-1 w-full text-center text-3xl font-extrabold border-b-[#ffffff69] border-transparent ">
                  <span>My Stories</span>
                  <span className="font-medium cursor-pointer">(@{`${user?.username}`})</span>
                  </h1>
                <div className="w-2/7 h-96 border border-[#ffffff67] flex flex-col gap-6 relative">
                  <div onClick={HandleLeftBtn} ref={leftBtn} className="left-icon absolute top-1/2 -translate-y-1/2 h-14 w-14 cursor-pointer transition-all hover:bg-[#a0a0a05e]   rounded-full flex items-center justify-center text-6xl -left-1/3  ">
                    <i className="ri-arrow-drop-left-line"></i>
                  </div>
                  <div onClick={HandleRightBtn} ref={rightBtn} className="right-icon absolute top-1/2 -translate-y-1/2 h-14 w-14 cursor-pointer transition-all hover:bg-[#a0a0a05e] rounded-full flex items-center justify-center text-6xl -right-1/3  ">
                    <i className="ri-arrow-drop-right-line"></i>
                  </div>
                  <div className="top pt-2 px-2 flex items-center gap-2">
                    <div className="profile-pic h-6 w-6 overflow-hidden rounded-full bg-red-400">
                      <img
                        className="h-full w-full object-cover object-center"
                        src={user?.profilePicture}
                        alt=""
                      />
                    </div>
                    <div className="username">{user?.username}</div>
                  </div>
                  <div className="slider h-full w-full bg-amber-950 rounded overflow-hidden flex">
                    <div ref={slide} className="flex w-full h-full translate-0 justify-start">
                    {stories?.map((story, index)=>{
                      if (story.mediaType.startsWith("image/")) {
                        return (
                          <div className="h-full w-full shrink-0">
                            <img
                              className="h-full w-full object-cover object-center"
                              src={`${story.url}`}
                              alt=""
                            />
                          </div>
                        )
                      } else {
                        return (
                          <div className="h-full w-full shrink-0">
                            <video
                              className="h-full w-full object-cover object-center"
                              src={`${story.url}`}
                              controls
                            />
                          </div>
                        )
                      }
                    })}
                    </div>
      
                  </div>
                </div>
              </div>
            </div>
      ) : (
        <span className="text-center w-full text-xl h-full mx-auto my-auto text-red-600">Sorry story not found.</span>
      )}
    </div>
  );
};

export default MyStories;
