import React, { useState,useEffect } from 'react'
import Select from "react-select"
import { useDispatch } from 'react-redux';
import {postRecipe} from "../../actions/index"
import "./RecipeForm.css"
const RecipeForm = () => {
    const imageHandler = (e) =>{
        const newdata={...data}
        newdata[e.target.id]=e.target.value;
        setImage(e.target.value)
        setData(newdata)
        console.log(newdata)
    }
    const dispatch = useDispatch();
    const [image,setImage] = useState("");
    const [data,setData] = useState({
        name:"",
        summary:"",
        rating:0,
        image:"",
        level_of_healthy:0,
        step_by_step:"",
        diets:[]
    });
    const handleOnChange = (e) =>{
      const newdata={...data}
      newdata[e.target.id]=e.target.value;
      setData(newdata)
      console.log(newdata)

    }
    const onChange = (e) =>{
        data.diets.push(e.target.value);
    }
    const onSubmit = (e) =>{
    e.preventDefault();
    if(!data.name){
       return alert("Please enter a correctly name") 
    }
    if(!data.summary){
        return alert("Please enter a resume")
    }
    if(data.rating>100 || data.rating<0){
        return alert("Please enter a correct number (0/100)")
    }
    if(data.level_of_healthy>100 || data.level_of_healthy<0){
        return alert("Please enter a correct number (0/100)")
    }
    dispatch(postRecipe(data))
    alert("Recipe was sucessful save")
    }

    useEffect(() => {
   
    }, [data])
    return (
        <div>
            <form onSubmit={(e)=> onSubmit(e)}>
                <label>Name of the recipe: </label>
                <input onChange={(e) => handleOnChange(e)} id="name" value={data.name} placeholder ="Your recipe name..." type ="text"></input>
                <br/>
                <label>Resume of that recipe: </label>
                <textarea onChange={(e) => handleOnChange(e)} id="summary" value={data.summary} placeholder = "Your summary of recipe" type="text"></textarea>
                <br/>
                <label> Instructions: </label>
                <textarea onChange={(e) => handleOnChange(e)}id="step_by_step" value={data.step_by_step} placeholder ="Tipe here your step by step of your recipe"rows="5" cols="80"></textarea>
                <br/>
                <label> Paste an url of your recipe: </label>
                <input onChange={(e) => imageHandler(e)} id="image" placeholder ="Your image" type="text" accept="image/*"/>
                <br/>
                <label>Your Score: </label>
                <input onChange={(e) => handleOnChange(e)} id="rating" value={data.rating}placeholder="Your Score of this recipe" type="number"></input>
                <br/>
                <label> Level of Healthy: </label>
                <input onChange={(e) => handleOnChange(e)} id="level_of_healthy" value={data.level_of_healthy}placeholder="Healthy level ?/100" type="number"></input>
                <br/>
                <label>Diets: </label>
             <select onChange={(e) => onChange(e)} id="diets" selected={data.diets}>
                 <option value="gluten free">Gluten Free</option>
                 <option value="ketogenic">Ketogenic</option>
                 <option value="vegetarian">Vegetarian</option>
                 <option value="dairy free">Dairy free</option>
                 <option value="lacto ovo vegetarian">Lacto Ovo-Vegetarian</option>
                 <option value="pescatarian">Pescatarian</option>
                 <option value="paleolithic">Paleo</option>
                 <option value="primal">Primal</option>
                 <option value="whole 30">Whole 30</option>
                 <option value="vegan">Vegan</option>
             </select>
             <button>Submit</button>
            </form>
            <div className="img-holder">
            <img height="auto"
  width = "30%" src={image} />
            </div>

        </div>
    )
}

export default RecipeForm
