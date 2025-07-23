const express = require("express");
const router = express.Router();
const {
  getAllUsers,
  getUserById,
  createUser,
  loginUser,
  deleteUser,
  updateUserById,
  getCurrentUser,
  checkToken,
} = require("../controllers/userController");
const verifyToken = require("../middleware/verifyToken");
//http://localhost:5000/user/user/:id

router.get("/", getAllUsers);

router.get("/:id", getUserById);

router.post("/signup", createUser);

router.post("/login", loginUser);

router.delete("/:id", deleteUser);

router.patch("/:id", updateUserById);

router.get("/get-current-user",verifyToken,getCurrentUser);

router.get("/check-token/:token",checkToken)


module.exports = router;
