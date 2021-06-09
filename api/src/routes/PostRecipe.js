const { Router } = require("express");
const { AddRecipe } = require("../Controllers/PostRecipe");
const router = Router();

router.post("/", AddRecipe);

module.exports = router;
