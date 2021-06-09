require("dotenv").config();
const { Recipe, Diet } = require("../db");
const axios = require("axios");
const { API_KEY } = process.env;

async function getAllDiets(req, res, next) {
  try {
    const diets = await Diet.findAll({
      attributes: ["name"],
    });
    res.send(diets);
  } catch (err) {
    next(err);
  }
}

module.exports = {
  getAllDiets,
};
