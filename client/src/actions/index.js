import axios from "axios";
import {
  SET_RECIPES,
  GET_NAME_RECIPES,
  POST_RECIPE,
  RECIPE_LOADING,
  GET_RECIPE_DETAIL,
  SET_RECIPE_FAIL,
  SET_DIETS,
} from "../actionNames";
export function getAllRecipes() {
  return async (dispatch) => {
    try {
      dispatch({
        type: RECIPE_LOADING,
      });
      const recipes = await axios.get(`http://localhost:3001/recipes`);
      dispatch({ type: SET_RECIPES, payload: recipes.data });
    } catch (err) {
      console.log(err);
      dispatch({
        type: SET_RECIPE_FAIL,
      });
    }
  };
}

export function getNameRecipe(recipe) {
  return async (dispatch) => {
    try {
      const recipes = await axios.get(
        `http://localhost:3001/recipes?name=${recipe}`
      );
      dispatch({
        type: GET_NAME_RECIPES,
        payload: recipes.data,
      });
    } catch (err) {
      console.log(err);
      dispatch({
        type: SET_RECIPE_FAIL,
      });
    }
  };
}

export function postRecipe(recipe) {
  return async (dispatch) => {
    const recipes_bd = await axios.post(`http://localhost:3001/recipe`, {
      name: recipe.name,
      summary: recipe.summary,
      rating: recipe.rating,
      image: recipe.image,
      level_of_healthy: recipe.level_of_healthy,
      step_by_step: recipe.step_by_step,
      diets: recipe.diets,
    });
    dispatch({
      type: POST_RECIPE,
      payload: recipes_bd.data,
    });
  };
}

export function getRecipeDetail(recipeid) {
  return async (dispatch) => {
    try {
      dispatch({
        type: RECIPE_LOADING,
      });
      const recipes = await axios.get(
        `http://localhost:3001/recipes/${recipeid}`
      );
      dispatch({ type: GET_RECIPE_DETAIL, payload: recipes.data });
    } catch (err) {
      console.log(err);
      dispatch({
        type: SET_RECIPE_FAIL,
      });
    }
  };
}

export function getAllDiets() {
  return async (dispatch) => {
    try {
      dispatch({
        type: RECIPE_LOADING,
      });
      const diets = await axios.get(`http://localhost:3001/types`);
      dispatch({ type: SET_DIETS, payload: diets.data });
    } catch (err) {
      console.log(err);
      dispatch({
        type: SET_RECIPE_FAIL,
      });
    }
  };
}

/* export function RecipesSlice(indexOfFirstPost, indexOfLastPost) {
  return (dispatch) => {
    dispatch({
      type: RECIPES_SLICE,
      payload: this.recipes.slice(indexOfFirstPost, indexOfLastPost),
    });
  };
}
 */
