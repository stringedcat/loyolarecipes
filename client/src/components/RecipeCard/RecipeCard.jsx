import React from 'react'
import { Link } from "react-router-dom"
const RecipeCard = ({recipe,loading,errormsg}) => {
    if(loading){
        return <h2> Loading...</h2>
    }
    const Join = (diets) =>{
        return diets? diets.join(", ") : diets 
    }
    return (
        <div key={recipe.id} className="containerCard">
            <Link to={`recipe/${recipe.id}`} >{recipe.name}</Link>
                    <br/>

         <img src={recipe.image}/>
         <br/>
         <span background-color="black" color="white"> Diet: {Join(recipe.diets)}</span>
        </div>
    )
}

export default RecipeCard
