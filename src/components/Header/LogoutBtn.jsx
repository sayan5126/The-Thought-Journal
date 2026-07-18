import React from "react";
import { useDispatch } from "react-redux";
import { authService } from "../../appwrite/authService";
import { logout } from "../../store/authSlice";

function LogoutBtn(){
    const dispatch = useDispatch()
    const logoutHandler = ()=>{
        authService.logout()
        .then(()=> dispatch(logout()))
        .catch(()=> {
            console.error("Logout failed:", error);
            alert("Unable to logout. Please try again.");
        })
    }
    return (
        <button
    className='inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'
    onClick={logoutHandler}
    >Logout</button>
    )
}