import { useContext, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Cookies from 'js-cookie'
import { UserContext } from "../Context/AuthContext";

const DynamicTitle = () => {
    const token = Cookies.get("token")
    const location = useLocation();
    


    console.log(Cookies.get("token"))
    useEffect(() => {
        const titles = {
            "/": "Home - Instagram",
            "/register": "Register - Instagram",
            "/login": "Login - Instagram",
            "/edit-profile": "Edit profile - Instagram",
            "/Profile": "Profile - Instagram",  
        };

        document.title = titles[location.pathname] || "My App";
    }, [location]);

    return null; // This component just updates the title
};

export default DynamicTitle;
