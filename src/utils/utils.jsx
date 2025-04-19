import axios from "axios"


export function checkPostIsLike(user, post){
    console.log(post.likes.includes(user._id))
    return post.likes.includes(user._id)
}



export const followBtn = async (followBtn, updateUser, user, userData, setUserData) => {
  console.log(userData._id, user._id)
  if (userData._id == user._id) {
    followBtn.current.innerHTML = "You post."
    return;
  }
    const res = await axios.post(`${import.meta.env.VITE_BACKEND_API_URL}/follow/${userData._id}?unfollow=f`, {}, {withCredentials: true})
    console.log(res)
    if(res.status == 200){
      
      followBtn.current.innerHTML = "Following"
      followBtn.current.style.background = "rgb(54,54,54)"
      updateUser((prevUser) => ({
        ...prevUser, // ✅ Keep old data
        following: [...prevUser.following, res.data.userToFollow._id] // ✅ Append a new follower
      }));
      if (setUserData && userData) setUserData((prevUserData) => ({
        ...prevUserData, // ✅ Keep old data
        followers: [...prevUserData.followers, user._id] // ✅ Append a new follower
      }));
    //   console.log("object", user)
    }
  }