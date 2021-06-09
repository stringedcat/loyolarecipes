require("dotenv").config();
const { Recipe, Diet } = require("../db");
const axios = require("axios");
const { API_KEY } = process.env;
const { v4: uuidv4 } = require("uuid");

async function getAllRecipes(req, res, next) {
  try {
    if (req.query.name) {
      const name = req.query.name;
      console.log(name);
      let temporalrecipes = [];
      const requestquery = await axios.get(
        `https://api.spoonacular.com/recipes/complexSearch?query=${name}&number=9&addRecipeInformation=true&apiKey=${API_KEY}`
      );
      const recipes_bd = await Recipe.findAll({
        where: {
          name: name,
        },
        attributes: { exclude: ["createdAt", "updatedAt"] },
        include: [Diet],
      });
      for (i = 0; i < requestquery.data.results.length; i++) {
        let obj = {
          name: requestquery.data.results[i].title,
          image: requestquery.data.results[i].image,
          diets: requestquery.data.results[i].diets,
        };
        temporalrecipes.push(obj);
      }
      if (recipes_bd.length < 1 && temporalrecipes < 1)
        return res.status(404).json({ error: "not founded recipes" });
      return res.status(200).json([...recipes_bd, ...temporalrecipes]);
    }
  } catch (err) {
    next(err);
  }
  let temporalrecipes = [];
  const recipes_bd2 = await Recipe.findAll({
    include: Diet,
  });

  const requestquery2 = await axios.get(
    `https://api.spoonacular.com/recipes/complexSearch?&number=100&addRecipeInformation=true&apiKey=${API_KEY}`
  );
  for (i = 0; i < requestquery2.data.results.length; i++) {
    let obj = {
      name: requestquery2.data.results[i].title,
      image: requestquery2.data.results[i].image,
      diets: requestquery2.data.results[i].diets,
    };
    temporalrecipes.push(obj);
  }
  return res.status(200).json([...recipes_bd2, ...temporalrecipes]);
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
      if (!recipe_bd)
        return res.send({ error: "not founded recipes in database" });
      res.send(recipe_bd);
    } else {
      let id = req.params.id;
      let request_params = await axios.get(
        `https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`
      );
      let obj_params = {
        id: request_params.data.id,
        title: request_params.data.title,
        img: request_params.data.image,
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
