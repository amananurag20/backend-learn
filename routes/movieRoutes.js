const express = require("express");
const { getAllMovies, createMovies } = require("../controllers/movieController");
const verifyToken = require("../middleware/verifyToken");
const router = express.Router();

router.get("/", verifyToken,getAllMovies);

router.post("/", createMovies);

module.exports = router;