import { combineReducers } from "redux";
import {
  SET_RECIPES,
  GET_NAME_RECIPES,
  POST_RECIPE,
  RECIPE_LOADING,
  SET_RECIPE_FAIL,
  GET_RECIPE_DETAIL,
  SET_DIETS,
} from "../actionNames";
const initialState = {
  recipes: [],
  loading: false,
  errorMsg: false,
  diets: [],
  detail: [],
  recipe_bd: [],
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    default: {
      return state;
    }
    case RECIPE_LOADING: {
      return {
        ...state,
        loading: true,
      };
    }
    case SET_RECIPES: {
      return {
        ...state,
        loading: false,
        recipes: action.payload,
        errorMsg: "",
      };
    }
    case SET_RECIPE_FAIL: {
      return {
        loading: false,
        errorMsg: true,
        recipes: [],
      };
    }
    case GET_NAME_RECIPES: {
      return {
        ...state,
        recipes: action.payload,
      };
    }
    case POST_RECIPE: {
      return {
        ...state,
        recipe_bd: action.payload,
      };
    }
    case GET_RECIPE_DETAIL: {
      return {
        ...state,
        detail: action.payload,
      };
    }
    case SET_DIETS: {
      return {
        ...state,
        diets: action.payload,
      };
    }
  }
}

export default rootReducer;
