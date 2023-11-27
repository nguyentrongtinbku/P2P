const userController = require("../controllers/userController");

const router = require("express").Router();
//GET ALL USERS
router.post("/register", userController.Register);
router.post("/login", userController.Login);
router.post("/publish", userController.Publish);
router.post("/fet", userController.Fetch);
router.post("/discover", userController.Discover);
router.post("/ping", userController.Ping);
router.get("/allfile", userController.GetAll);


module.exports = router;