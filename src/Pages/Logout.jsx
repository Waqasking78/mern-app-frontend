  import { Link, useNavigate } from "react-router-dom";
  import Cookies from 'js-cookie'
  import { useContext } from "react";
  import { UserContext } from "../Context/AuthContext";
import axios from "axios";

  const Logout = (props) => {
    const {user,updateUser} = useContext(UserContext)
    const navigate = useNavigate()
    console.log(props);

    const HandleLogout = async () => {
      updateUser(null)
      navigate("/login")
      const res = await axios.post(`${import.meta.env.VITE_BACKEND_API_URL}/logout`, {}, {withCredentials: true})
      console.log(res)
    } 

    return (
      <div className="h-screen w-screen z-[9999] bg-[#ffffff15] backdrop-blur-lg top-0 fixed cursor-default left-0 right-0 flex items-center justify-center">
        <div className="box bg-white px-5 py-7 rounded flex flex-col items-center h-1/3 w-1/5 justify-evenly">
          <p className="text-lg text-black">Are you sure you want to logout?</p>
          <div className="btns flex gap-3">
            {/* ✅ Fix: Use correct prop name */}
            <div
              onClick={() => props.setLogoutPageToggle((prev)=>!prev)}
              className="btn-2 px-3 py-2 rounded cursor-pointer text-black bg-[#e4e4e4] hover:bg-[#dadada]"
            >
              Cancel
            </div>
            <span

              onClick={()=>{HandleLogout(); props.setLogoutPageToggle((prev)=>!prev)}}
              className="btn-1 px-3 py-2 rounded cursor-pointer text-white bg-[#ff0202be] hover:bg-[#ff0202a3]"
            >
              Logout
            </span>
          </div>
        </div>
      </div>
    );
  };

  export default Logout;
