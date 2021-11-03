const express = require("express");
const UserController = require("./Controller/UserController");
const jwt = require("./Utils/JWT");

const router = express.Router();

router.post("/register", jwt.verifyJWT, UserController.createUser);
router.post("/login", UserController.loginUser);
router.post("/user/change-password", jwt.verifyJWT, UserController.updatePassword);
router.get("/users/all", jwt.verifyJWT, UserController.getUsersList);
router.get("/user/access-level", jwt.verifyJWT, UserController.getAccessLevel);
router.get("/user/info", jwt.verifyJWT, UserController.getUserInfo);
router.get("/departments", UserController.getAvailableDepartments);
router.get("/levels", UserController.getPrivilegeLevels);
router.get("/sections", UserController.getAvailableSections);
router.get("/user/:id/info", jwt.verifyJWT, UserController.getUserByID);
router.post("/user/change-user", jwt.verifyJWT, UserController.updateUser);
router.post("/sections", UserController.createSection);
router.post("/departments", UserController.createDepartment);
router.post("/sections/change-section/:id", UserController.editSection);
router.post("/departments/change-department/:id", UserController.editDepartment);

module.exports = router;
