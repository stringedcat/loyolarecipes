import { useDispatch, useSelector } from "react-redux";
import { useEffect,useState } from "react";
import { getAllRecipes,getAllDiets} from "../../actions/index";
import React from 'react'
import RecipeCard from "../RecipeCard/RecipeCard";
import SearchBar from "../SearchBar/SearchBar";
import "./Home.css"


const Home = () => {
  // recipes from api    
  const dispatch = useDispatch();
  const recipes = useSelector((state) => state.recipes);
  const loading = useSelector((state) => state.loading);
  const errormsg = useSelector((state) => state.erorMsg);
  const diets = useSelector((state) => state.diets)
  const [order,setOrder]= useState("");
  const [filtro,setFiltro] = useState("");
  const [pageNumer,setPageNumber] = useState(0);
 const ZA = (a, b) => { return a.name > b.name ? 1 : -1 }
 const AZ = (a, b) => { return a.name < b.name ? 1 : -1 }
  const Min = (a, b) => { return b.rating - a.rating }
  const Max = (a, b) => { return a.rating - b.rating }
  
   
  
  const ShowData = () =>{
    if(loading){
      return <p>Loading...</p>
    } 
    if (recipes.length>0){
      return(
        <div flex-direction="column" class="style.containerHome">
           {filtro
           ?(recipes.filter(recipe => recipe.diets.includes(filtro)).slice(pageVisited,pageVisited + recipesPerPage)).map(recipe => (  
           <RecipeCard  key ={recipe.id} recipe={recipe} />
           
           )) 
           :recipes.slice(pageVisited,pageVisited + recipesPerPage).map(recipe => (  
             <RecipeCard  key ={recipe.id} recipe={recipe}/>
             )) 
           }
        </div>) 
    }else{
      return <p> There's not a recipe (if you want to precharge the recipes press)</p>
    }
     

   }
  

   const handleInputChangeOrder = (e) =>{
     e.preventDefault();
     setOrder(e.target.value);
     switch (order) {
      case 'ASC': return recipes.sort(AZ);
      case 'DESC': return recipes.sort(ZA);
      case 'Score_positive': return recipes.sort(Max);
      case 'Score_negative': return recipes.sort(Min); 
      default: return recipes
  }
    /*   if(order === "DESC"){
        recipes.sort(function(a,b){
          if(a.name.toLowerCase()< b.name.toLowerCase()) return -1
          if(a.name.toLowerCase()> b.name.toLowerCase()) return 1
          return 0 
        })
       }
       if(order === "ASC"){
        recipes.sort(function(a,b){
          if(a.name.toLowerCase()> b.name.toLowerCase()) return -1
          if(a.name.toLowerCase()< b.name.toLowerCase()) return 1
          return 0 
        })
       }
       if(order === "Score_positive"){
        recipes.sort(function(a,b){
         return a.rating - b.rating
        })
       }
       if(order === "Score_negative"){
        recipes.sort(function(a,b){
         return b.rating - a.rating
        })} */
   }  



   //filtrado 
   
   const handleInputChangeDiets = (event) =>{   
  setFiltro(event.target.value);
}


   //pagination  
  
    const recipesPerPage = 9;
    const pageVisited = pageNumer*recipesPerPage;
    const buttons = () => {
      let buttonsarray = [];
      for (let i= 0; i< Math.ceil(recipes.length/recipesPerPage); i++){ 
        buttonsarray.push(i)

      }
      return buttonsarray;
    }
    const changePage = (e) => {
      e.preventDefault();
        setPageNumber(e.target.value)
     }

    useEffect(() => {
      dispatch(getAllRecipes());
      dispatch(getAllDiets());
    }, []);

    console.log(recipes);
    return (
        <div class="body">
          <div>
          <label> Type of diets: </label>
          <select onChange={(e) => handleInputChangeDiets(e)} id="diets">
               <option value="">Default</option>
                 <option value="gluten free">Gluten Free</option>
                 <option value="dairy free">Dairy Free</option>
                 <option value="vegetarian">Vegetarian</option>
                 <option value="lacto ovo vegetarian">Lacto Ovo Vegetarian</option>
                 <option value="pescatarian">Pescatarian</option>
                 <option value="paleolithic">Paleo</option>
                 <option value="primal">Primal</option>
                 <option value="whole 30">Whole 30</option>
                 <option value="vegan">Vegan</option>
             </select>
             <br/>
        
          </div>
          <label>Order by: </label>
          <select onChange={(e) => handleInputChangeOrder(e)} id="order">
                 <option value="">Default</option>
                 <option value="DESC">Descending</option>
                 <option value="ASC">Ascending</option>
                 <option value="Score_positive">Best Score</option>
                 <option value="Score_negative">Bad Score</option>
             </select>
          <div>

          </div>
          <SearchBar/>
            <div className="recipes">{
              ShowData()
                }
                </div>
                <div>{
                  buttons().map(button =>(
                    <button key={button} value={button} onClick={(e) => changePage(e)}>{button+1}</button>
    ))}          
                </div>
        </div>
 
    )
}

export default Home
