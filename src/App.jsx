import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Register from "./Pages/Register";
import Header from "./Components/Header";
import Login from "./Pages/Login";
import DynamicTitle from "./Components/DynamicTitle";
import Profile from "./Pages/Profile";
import CreatePost from "./Pages/Create-post";
import EditProfile from "./Pages/EditProfile";
import Feed from "./Pages/Feed";
import UserProfile from "./Pages/UserProfile";
import { UserContextProvider } from "./Context/AuthContext";
import Logout from "./Pages/Logout";
import SeeStories from "./Pages/SeeStories";
import MyStories from "./Pages/MyStories";
import UserStories from "./Pages/UserStories";
import Search from "./Pages/Search";
import Messages from "./Pages/Messages";
import Chat from "./Pages/Chat";
import ViewPost from "./Pages/ViewPost";
import Settings from "./Pages/Settings";
import Mysetting from "./Pages/Mysetting";


const App = () => {
  return (
    <Router>
      <UserContextProvider>
      <DynamicTitle />
      <Header />
      <Routes>
        <Route path="/" element={<Feed />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/create-post" element={<CreatePost />} />
        <Route path="/post/:postId" element={<ViewPost />} />
        <Route path="/edit-profile" element={<EditProfile />} />
        <Route path="/user/:username" element={<UserProfile />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/stories" element={<SeeStories />} />
        <Route path="/my-stories" element={<MyStories />} />
        <Route path="/stories/:username" element={<UserStories />} />
        <Route path="/search" element={<Search />} />
        <Route path="/messages" element={<Messages />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/chat/:username" element={<Chat />} />
        <Route path="/setting/:settingName" element={<Mysetting />} />

      </Routes>
    </UserContextProvider>
    </Router>
  );
};

export default App;
