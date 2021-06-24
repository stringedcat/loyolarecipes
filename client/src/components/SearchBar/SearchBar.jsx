import React from 'react'
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getNameRecipe } from '../../actions';
import "./SearchBar.css"
const SearchBar = () => {
      const dispatch = useDispatch();
      const [recipe,setRecipe] = useState("");

      const handleInputChange = (event) =>{
          event.preventDefault();
        setRecipe(event.target.value);
      }

      const handleClick = (event)=>{
          event.preventDefault();
          dispatch(getNameRecipe(recipe));
      }
    return (
        <div class="search-box">
            <input class="search-txt"
            type="search"
            placeholder="Search for recipes"
            onChange={(e)=> handleInputChange(e)}/>
            <button onClick={(e)=> handleClick(e)}>Find</button>
            
        </div>
    )
}

export default SearchBar
