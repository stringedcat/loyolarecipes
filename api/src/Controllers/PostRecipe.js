require("dotenv").config();
const { Recipe, Diet } = require("../db");
const { API_KEY } = process.env;
const { v4: uuidv4 } = require("uuid");

async function AddRecipe(req, res, next) {
  try {
    const {
      name,
      summary,
      rating,
      image,
      level_of_healthy,
      step_by_step,
      diets,
    } = req.body;

    let recipebd = await Recipe.create({
      id: uuidv4(),
      name,
      summary,
      image,
      rating,
      level_of_healthy,
      step_by_step,
    });
    const temporal_obj = {
      name: name,
      summary: summary,
      image: image,
      rating: rating,
      level_of_healthy: level_of_healthy,
      step_by_step: step_by_step,
      diets: diets,
    };
    for (i = 0; i < diets.length; i++) {
      const diet_db = await Diet.findOne({
        where: {
          name: diets[i],
        },
      });
      recipebd.addDiet(diet_db);
    }
    res.send([temporal_obj]);
  } catch (err) {
    next(err);
  }
}

module.exports = {
  AddRecipe,
};
