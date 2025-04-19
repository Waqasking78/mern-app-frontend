import axios from "axios"
import { createContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

export const UserContext = createContext(null)
 
export const UserContextProvider = (props) => {
  const [user, setUser] = useState(null)
  
  const navigate = useNavigate()

  const updateUser = function(newUserData) {
    setUser(newUserData)
  }

  const fetchUser = async function () {
    try {
      const res = await axios.post(`${import.meta.env.VITE_BACKEND_API_URL}/profile`, {}, {withCredentials: true})
      console.log("context fetch user function run.......",res.data.profileUser)
      updateUser(res.data.profileUser)
    } catch (error) {
      console.log(error)
      // navigate("/login")/
    }
  }

  useEffect(()=>{
    fetchUser()
  }, [])

  return (
    <UserContext.Provider value={{user, updateUser}}>
      {props.children}
    </UserContext.Provider>
  )
}