const { Router } = require("express");
const { getAllDiets } = require("../Controllers/DietsController");
const router = Router();

router.get("/", getAllDiets);

module.exports = router;
