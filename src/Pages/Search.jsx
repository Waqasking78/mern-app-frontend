import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
const Search = () => {
  const [search, setSearch] = useState({ value: "", err: "" });
  const [users, setuser] = useState();
  const [famousUsers, setFamousUsers] = useState()


  const ChangeHandler = async (e) => {
    setSearch({ value: e.target.value });
  };

  useEffect(() => {
    async function GetUsers() {
      if (search.value) {
        const res = await axios.post(
          `${import.meta.env.VITE_BACKEND_API_URL}/search/user?q=${search.value}`
        );
        res.data.length > 0 ? setuser(res.data) : setuser({err: "Sorry! User not found."})
        console.log(users)
      } else {
        setuser(null);
      }
    }
    GetUsers();
    // console.log("first", search);
  }, [search]);

  useEffect(()=>{
    async function GetData() {
      const res = await axios.post(`${import.meta.env.VITE_BACKEND_API_URL}/famous-users?l=5`, {}, {withCredentials: true})
      setFamousUsers(res.data)
    }
    GetData()
  },[])


  return (
    <div className="pl-44 py-4 flex flex-col gap-5 pr-4 h-screen">
      <form>
      <div className=" border-b border-gray-800 bg-black z-10">
        <input
          type="text"
          placeholder="Search users..."
          value={search.value}
          onChange={(e) => ChangeHandler(e)}
          className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white"
        />
      </div>
      </form>
      <div className="suggestions flex-1 h-96 no-scrollbar">
        {search.value.length == 0 ? (
          <div className="flex-1 overflow-auto no-scrollbar">
            <div className="heading text-white text-3xl font-bold">Top users</div>
            <div className="pt-6 grid grid-cols-4 gap-2">
              {famousUsers?.map((user, index)=>{
                return (
              <div key={index} className="card-1 w-full bg-gray-900 rounded border border-gray-600 px-3 py-4 flex gap-3 flex-col items-center justify-center">
                <div className="profilePicture h-30 w-30 bg-green-300 rounded-full overflow-hidden">
                  <img className="h-full w-full object-center object-cover" src={user.profilePicture}  alt="" />
                </div>
                <div className="user-details flex flex-col items-center ">
                  <span className="username text-gray-200 font-bold">{user.username}</span>
                  <span className="followers text-gray-400">{user.followers.length} followers</span>
                  <Link to={`/user/${user.username}`} className="btn text-white bg-[#0095f6] mt-3 py-2 font-medium px-4 cursor-pointer rounded ">Visit now</Link>
                </div>
              </div>
                )
              })}
            </div>
          </div>
        ) : ""}
        {!users?.err ? (
        users?.map((user, index) => {
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
                    to={`/user/${user.username}`}
                    className="px-4 py-2 text-white bg-[#0095F6] rounded font-bold cursor-pointer hover:opacity-90"
                  >
                    See profile
                  </Link>
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <div className="text-red-600 text-center mt-10 text-xl font-bold ">{users?.err}</div>
      )}
      </div>
    </div>
  );
};

export default Search;
