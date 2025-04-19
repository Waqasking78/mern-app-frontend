import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import formatDate from "../utils/DateFormat";

const Messages = () => {
  const [search, setSearch] = useState({ value: "", err: "" })
  const [searchUsers, setSearchUsers] = useState()
  const [users, setUsers] = useState(null);
  const queries = new URLSearchParams(location.search)
  const [queryS, setQueryS] = useState(queries.get("s"))

  useEffect(() => {
    async function GetData() {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_API_URL}/get-friends`,
        {},
        { withCredentials: true }
      );
      setUsers(res.data);
      console.log("OOoooooooooooooooo", res.data);
    }

    GetData();
  }, []);

  const ChangeHandler = function (e) {
    setSearch({ value: e.target.value });
    console.log(search)
  }

  useEffect(() => {
    async function GetUsers() {
      if (search.value) {
        const res = await axios.post(
          `${import.meta.env.VITE_BACKEND_API_URL}/search/user?q=${search.value}`
        );
        res.data.length > 0 ? setSearchUsers(res.data) : setSearchUsers({ err: "Sorry! User not found." })
        console.log("logged",res, res.data.length, searchUsers)
      } else {
        setSearchUsers(null);
      }
    }
    GetUsers();
    // console.log("first", search);
  }, [search]);

  return (
    <div className="w-full pl-44 bg-black h-screen">
      <div className="h-full w-full bg-black px-5 py-4 flex flex-col gap-8 ">
        <div className="heading grow-0 shrink-0 flex flex-col gap-7">
          <h1 className="text-3xl font-bold text-white">Messages</h1>
          {queryS ? (
            <div className=" border-b border-gray-800 bg-black z-10">
              <input
                type="text"
                placeholder="Search users to chat..."
                value={search.value}
                onChange={(e) => ChangeHandler(e)}
                className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white"
              />
            </div>
          ) : ("")}
          <div className="options text-white flex gap-3">
            <Link to={"/messages"} onClick={(e) => { setQueryS("") }} className="btn-1 bg-gray-800 p-3 rounded-lg cursor-pointer text-xs font-medium">All Chats</Link>
            <Link to={"/messages?s=t"} onClick={(e) => { setQueryS("t") }} className="btn-2 bg-gray-800 p-3 rounded-lg cursor-pointer text-xs font-medium">Search users to chat</Link>
          </div>
        </div>
        {queryS ? (
          <div className="suggestions flex-1 h-96 overflow-y-auto no-scrollbar">
            {!searchUsers?.err ? (
              searchUsers?.map((user, index) => {
                return (
                  <div
                    key={index}
                    className="list shrink-0 mb-2 bg-gray-900 hover:bg-gray-800 transition p-3 cursor-pointer rounded-xl"
                  >
                    <div className="item-1 flex items-center justify-between gap-5">
                      <div className="left flex items-center gap-5">
                        <div className="profile-picture h-10 w-10 rounded-full bg-green-100 overflow-hidden">
                          <img
                            className="h-full w-full object-center object-cover"
                            src={user.profilePicture}
                            alt=""
                          />
                        </div>
                        <div className="username text-white font-bold">
                          <span>{user.username}</span>
                        </div>
                      </div>
                      <div className="btn">
                        <Link
                          to={`/chat/${user.username}`}
                          className="px-4 py-2 text-white bg-[#0095F6] rounded font-bold cursor-pointer hover:opacity-90"
                        >
                          Chat now
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="text-red-600 text-center mt-10 text-xl font-bold ">{searchUsers?.err}</div>
            )}
          </div>
        ) : (
          <div className="chating-user grow bg-black overflow-y-auto no-scrollbar">
            <div className="list text-center">
              {users?.map((user, index) => {
                return (
                  <Link to={`/chat/${user?.username}`}
                    key={index}
                    className="item-1 w-full px-2 py-3 rounded-lg flex items-center justify-between cursor-pointer hover:bg-[#ffffff1c]"
                  >
                    <div className="first-second-con flex items-center gap-2">
                      <div className="first h-9 w-9 rounded-full overflow-hidden bg-gray-600">
                        <img
                          className="h-full w-full object-cover object-center"
                          src={user?.profilePicture}
                          alt=""
                        />
                      </div>
                      <div className="second flex flex-col items-start ">
                        <span className="username text-white font-bold text-sm">
                          {user?.username}
                        </span>
                        {/* {console.log("messages", user?.user?.lastMessage?.msg)} */}
                        <span className="text-xs text-white font-extralight">{user?.msg?.msg || "Not messages yet."}</span>
                      </div>
                    </div>
                    <div className="third flex items-start text-[#bababac7] text-xs h-full ">
                      {user?.msg ? formatDate(user?.msg?.createdAt) : (<Link
                        to={`/chat/${user?.username}`}
                        className="last-time-chat text-xs text-white font-medium px-3 py-2 rounded bg-[#0095f6] "
                      >
                        Chat now
                      </Link>)}
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        )
        }
              <div className="text-center pt-3 text-[#565656d2] text-sm ">
                <span className="font-medium">Note: </span>
                {queryS ? (
                  <span>Search users to chat (only if user allow).</span>
                ) : (
                  <span>Your recent chats will appear here.</span>
                )
                }
              </div>
      </div>
    </div>
  );
};

export default Messages;