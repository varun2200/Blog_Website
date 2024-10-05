import React from "react";
import { useDispatch } from "react-redux";
import authservice from "../../appwrite/auth";
import { logout } from "../../store/authslice";

function LogoutBtn(){
    const dispatch = useDispatch();
    const logoutHandler = ()=>{
        authservice.logout().then(()=>{
            dispatch(logout());
        })
    }
    return(
        <button
        className="px-6 py-2 duration-200 bg-red-500 text-white rounded-full hover:bg-yellow-300 hover:text-gray-800 transition-colors"
        onClick={logoutHandler}>
            Logout
        </button>
    )
}

export default LogoutBtn;