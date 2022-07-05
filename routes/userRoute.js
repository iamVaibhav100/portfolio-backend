const express = require('express');
const userController = require("../controls/userController");
const route = express.Router();

route.get('/dataForUser', userController.dataForUser);
route.get("/about", userController.getAbout);
route.get("/skills", userController.getSkills);
route.get("/project", userController.getProjects);
route.get("/tags", userController.getTags);
route.post("/logout", userController.postLogout);

module.exports = route;