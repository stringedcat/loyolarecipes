const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const Recipe = require("./Recipe");
const Diet = require("./Diet");
const PostRecipe = require("./PostRecipe");
const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use("/types", Diet);
router.use("/recipes", Recipe);
router.use("/recipe", PostRecipe);

module.exports = router;
