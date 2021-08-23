import React from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getRecipeDetail } from '../../actions';
import "./RecipeDetail.css"
const RecipeDetail = (props) => {
            console.log(props)
    const dispatch = useDispatch();
    const recipe_params = useSelector((state) => state.detail);
    const replace = (resume) =>{
       return resume?resume.toString().replace(/(<([^>]+)>)/ig, '') : resume 
}
const Join = (diets) =>{
    return diets? diets.join(", ") : diets 
}  
useEffect(() => {
dispatch(getRecipeDetail(props.match.params.id))
/*  console.log(recipe_params.summary.toString().replace(/(<([^>]+)>)/ig, '')) */
}, [])
/* let recipe_params_summary = recipe_params.summary.toString().replace(/(<([^>]+)>)/ig, '') */
    return (
        <div class="Detail">
            <h2>{recipe_params.title}</h2>
            <img height="auto"
  width = "30%" src={recipe_params.image}/>
  <br/>
         <p>RESUME: {replace(recipe_params.summary)}</p>
         <br/>
         <p>INSTRUCTIONS: {replace(recipe_params.step)}</p>
            <h3>SCORE: {recipe_params.score}</h3>
            <h3>HEALTHY SCORE: {recipe_params.healthy_score}</h3>
  
            <h2>DIETS: {Join(recipe_params.diets)}</h2>
        </div>
    )
}

export default RecipeDetail
