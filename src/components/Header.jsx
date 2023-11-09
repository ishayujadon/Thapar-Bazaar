import { Link, Navigate, useNavigate } from 'react-router-dom';
import './Header.css'
import Categories from './Categories';
import axios from 'axios';
import { useState } from 'react';
import {FaSearch} from "react-icons/fa";

function Header(props){

    const navigate = useNavigate()

    const handleLogout= () =>{
        localStorage.removeItem('token')
        navigate('/login')
    }

    return(
        <div className='header-container d-flex justify-content-between'>
            <div>
                {/* <Link to="/">HOME</Link> */}
                <button className='btn' onClick={()=>props.handlePage && props.handlePage()}>
                    <Link className="links" to="/">HOME</Link>
                </button>
                <input className='search' type='text' value={props && props.search}
                    onChange={(e)=>props.handlesearch  && props.handlesearch(e.target.value)}
                />
                <button className='search-btn' onClick={()=>props.handleClick && props.handleClick()}><FaSearch/></button>
                
            </div>
            <div>
                {!!localStorage.getItem('token') && <Link to="/add-product"><button className="logout-btn">ADD PRODUCT</button></Link>}
                {!localStorage.getItem('token') ? 
                        <Link to="/login"><button className='logout-btn'>Login</button></Link> :
                        <button className="logout-btn" onClick={handleLogout}>LOGOUT</button>}
            </div>
        </div>
    ) 
}

export default Header;