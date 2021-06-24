require("dotenv").config();
const { Recipe, Diet } = require("../db");
const axios = require("axios");
const { API_KEY } = process.env;
const { v4: uuidv4 } = require("uuid");
const { Op } = require("sequelize");

async function getAllRecipes(req, res, next) {
  try {
    if (req.query.name) {
      const name = req.query.name;
      console.log(name);
      let temporalrecipes = [];
      let temporalrecipes_bd2 = [];
      const requestquery = await axios.get(
        `https://api.spoonacular.com/recipes/complexSearch?query=${name}&number=9&addRecipeInformation=true&apiKey=${API_KEY}`
      );
      const recipes_bd = await Recipe.findAll({
        where: {
          name: {
            [Op.iLike]: `%${name}%`,
          },
        },
        attributes: { exclude: ["createdAt", "updatedAt"] },
        include: [Diet],
      });
      recipes_bd.forEach((recipe) => {
        console.log(recipe);
        let temporal_array = [];
        recipe.dataValues.diets.forEach((diet) =>
          temporal_array.push(diet.dataValues.name)
        );
        let obj = {
          id: recipe.dataValues.id,
          name: recipe.dataValues.name,
          summary: recipe.dataValues.summary,
          rating: recipe.dataValues.rating,
          image: recipe.dataValues.image,
          level_of_healthy: recipe.dataValues.level_of_healthy,
          step_by_step: recipe.dataValues.step_by_step,
          diets: temporal_array,
        };
        temporalrecipes_bd2.push(obj);
      });

      for (i = 0; i < requestquery.data.results.length; i++) {
        let obj = {
          id: requestquery.data.results[i].id,
          name: requestquery.data.results[i].title,
          image: requestquery.data.results[i].image,
          diets: requestquery.data.results[i].diets,
        };
        temporalrecipes.push(obj);
        console.log(requestquery.data.results[i].id);
      }
      if (recipes_bd.length < 1 && temporalrecipes < 1)
        return res.status(404).json({ error: "not founded recipes" });
      return res.status(200).json([...temporalrecipes_bd2, ...temporalrecipes]);
    }
  } catch (err) {
    next(err);
  }
  let temporalrecipes_bd = [];
  let temporalrecipes = [];
  const recipes_bd2 = await Recipe.findAll({
    include: Diet,
    attributes: { exclude: ["createdAt", "updatedAt"] },
  });

  const requestquery2 = await axios.get(
    `https://api.spoonacular.com/recipes/complexSearch?&number=100&addRecipeInformation=true&apiKey=${API_KEY}`
  );
  for (i = 0; i < requestquery2.data.results.length; i++) {
    let obj = {
      id: requestquery2.data.results[i].id,
      name: requestquery2.data.results[i].title,
      image: requestquery2.data.results[i].image,
      diets: requestquery2.data.results[i].diets,
      level_of_healthy: requestquery2.data.results[i].healthScore,
      rating: requestquery2.data.results[i].spoonacularScore,
    };
    temporalrecipes.push(obj);
  }

  recipes_bd2.forEach((recipe) => {
    let temporal_array = [];
    console.log("RECIPEEES", recipe);
    recipe.dataValues.diets.forEach((diet) =>
      temporal_array.push(diet.dataValues.name)
    );
    let obj = {
      id: recipe.dataValues.id,
      name: recipe.dataValues.name,
      summary: recipe.dataValues.summary,
      rating: recipe.dataValues.rating,
      image: recipe.dataValues.image,
      level_of_healthy: recipe.dataValues.level_of_healthy,
      step_by_step: recipe.dataValues.step_by_step,
      diets: temporal_array,
    };
    temporalrecipes_bd.push(obj);
  });

  console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA", temporalrecipes_bd);
  return res.status(200).json([...temporalrecipes_bd, ...temporalrecipes]);
}

async function getRecipeDetail(req, res, next) {
  try {
    let id = req.params.id;
    console.log(req.params.id);
    if (req.params.id.includes("-")) {
      let recipe_bd = await Recipe.findOne({
        where: {
          id: req.params.id,
        },
        include: [Diet],
      });

      let temporal_array = [];
      recipe_bd.dataValues.diets.forEach((diet) =>
        temporal_array.push(diet.dataValues.name)
      );
      let obj = {
        id: recipe_bd.id,
        title: recipe_bd.name,
        summary: recipe_bd.summary,
        score: recipe_bd.rating,
        image: recipe_bd.image,
        healthy_score: recipe_bd.level_of_healthy,
        step: recipe_bd.step_by_step,
        diets: temporal_array,
      };
      if (!recipe_bd)
        return res.send({ error: "not founded recipes in database" });
      res.send(obj);
    } else {
      let id = req.params.id;
      let request_params = await axios.get(
        `https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`
      );

      let obj_params = {
        id: request_params.data.id,
        title: request_params.data.title,
        image: request_params.data.image,
        summary: request_params.data.summary,
        score: request_params.data.spoonacularScore,
        healthy_score: request_params.data.healthScore,
        step: request_params.data.instructions,
        diets: request_params.data.diets,
      };
      res.json(obj_params);
    }
  } catch (err) {
    next(err);
  }
}

module.exports = {
  getAllRecipes,
  getRecipeDetail,
};
