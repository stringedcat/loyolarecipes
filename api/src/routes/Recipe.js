const { Router } = require("express");
const {
  getAllRecipes,
  getRecipeDetail,
} = require("../Controllers/RecipeController");
const router = Router();

router.get("/", getAllRecipes);
router.get("/:id", getRecipeDetail);

module.exports = router;
