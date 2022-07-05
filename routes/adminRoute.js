const express = require('express');
const route = express.Router();
const adminController = require("../controls/adminController");
const isAuth = require('../middleware/is-auth');

route.get('/about', isAuth, adminController.getAbout);
route.post('/about', isAuth, adminController.postAbout);
route.get("/skills", isAuth, adminController.getSkills);
route.post("/skill", isAuth, adminController.postSkill);
route.post("/delete", isAuth, adminController.postDeleteSkill);
route.get("/projects", isAuth, adminController.getProjects)
route.post("/edit", isAuth, adminController.postEditSKill);
route.post("/project", isAuth, adminController.postProject);
route.post("/project-edit", isAuth, adminController.postProjectEdit);
route.post("/project-delete", isAuth, adminController.postDeleteProject);
route.get("/tags", isAuth, adminController.getTags);
route.post("/tags", isAuth, adminController.postTags);
route.post("/login", adminController.postLogin);
module.exports = route;