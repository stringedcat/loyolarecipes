import React from 'react'
import { useDispatch, useSelector } from "react-redux";
import { getAllRecipes,getAllDiets} from "../../actions/index";
import Logo from "../../assets/pollo-fritoxd.png"
import {Link} from "react-router-dom"
import "../Navbar/Navbar.css";
function Navbar() {
    
    const dispatch = useDispatch();
const onClick = (e) =>{
    dispatch(getAllRecipes());
 }
    return ( 
        <div className='navbar'>
            <div className="leftSide"></div>
            <img className="imgnav"onClick={<Link O to="/home">Home</Link>} src={Logo}/>
            <div className="rightSide">
                <Link onClick={(e) => onClick(e)}  to="/home" refresh="true">Home</Link>
                <Link to="/create-recipe">Create your own recipe</Link>
            </div>
        </div>
    )
}

export default Navbar
