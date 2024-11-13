import React from 'react';
import { NavLink } from 'react-router-dom';
import { HiHome } from "react-icons/hi2";
import { HiOutlineUserCircle } from "react-icons/hi";
import './Header.css'; 




const Header = () => {
    return (
    <header>
        <nav>
            <NavLink to="/" exact activeClassName="active"> 
            <HiHome /> 
            <span>Home</span>
            </NavLink>
            <NavLink to="/login" exact activeClassName="active"><HiOutlineUserCircle /></NavLink>
            <NavLink to="/dashboard">Dashboard</NavLink>
            <NavLink to='/booking'>Booking</NavLink>



        </nav>

    </header>
    )
}

export default Header;