const User = require('../model/user')
const Skills = require('../model/skill');
const Project = require("../model/project")
const jwt = require("jsonwebtoken");

// -------------ABOUT -----------------------
exports.getAbout = async (req, res, next) => {
    try {
        const about = await User.find().select("-email -name -password");
        res.status(200).json({ about });
    }
    catch (error) {
        next(error);
    }
}

exports.postAbout = async (req, res, next) => {
    const { about } = req.body
    try {
        const data = await User.findOneAndUpdate({
            about
        });

        res.status(200).json({ data })
    }
    catch (error) {
        next(error);
    }

}

// ---------------------Skills------------------
exports.getSkills = async (req, res, next) => {
    try {
        const skills = await Skills.find();
        res.status(200).json({
            message: "SUCCESSFULLY FETCHED THE SKILL DATA",
            skills
        });
    }
    catch (error) {
        next(error);
    }
}
exports.postSkill = async (req, res, next) => {
    try {
        const { title, percentage } = req.body;
        const data = await Skills.create({
            title,
            percentage
        });
        res.status(200).json({
            message: "SUCCESSFULLY UPDATED THE SKILL LIST",
            data
        })
    }
    catch (error) {
        next(error);
    }


}

exports.postDeleteSkill = async (req, res, next) => {
    const { id } = req.body
    try {
        const data = await Skills.findByIdAndDelete(id);
        res.status(200).json({
            message: "SUCCESSFULLY DELETED",
            data
        })
    }
    catch (error) {
        next(error);
    }
}

exports.postEditSKill = async (req, res, next) => {
    const { id, title, percentage } = req.body
    try {
        const data = await Skills.findByIdAndUpdate(id, {
            title,
            percentage
        });
        res.status(200).json({
            message: "SUCCESSFULLY UPDATED",
            data
        })
    }
    catch (error) {
        next(error);
    }
}
// ----------------------PROJECTS-------------------------
exports.getProjects = async (req, res, next) => {
    try {
        const data = await Project.find();
        res.status(200).json({
            message: "SUCCESSFULLY FETCHED THE PROJECT",
            data
        })
    }
    catch (error) {
        next(error);
    }
}
exports.postProject = async (req, res, next) => {
    const { title, link, desc, tag } = req.body;

    const tagArray = (tag.split(',')).map(tag => tag.toUpperCase());

    try {
        const data = await Project.create({
            title,
            link,
            desc,
            tag: tagArray
        })
        res.status(200).json({
            message: 'Project created successfully',
            data
        })
    }
    catch (error) {
        next(error);
    }

}

exports.postProjectEdit = async (req, res, next) => {
    const { id, title, desc, tag, link } = req.body
    let tagArray;
    if (!Array.isArray(tag)) {
        tagArray = (tag.split(",")).map(tag => tag.toUpperCase().trim());
    }
    else {
        tagArray = tag.map(tag => tag.toUpperCase().trim());
    }
    try {
        const data = await Project.findByIdAndUpdate(id, {
            title,
            desc,
            tag: tagArray,
            link
        });
        res.status(200).json({
            message: "SUCCESSFULLY UPDATED",
            data
        })
    }
    catch (error) {
        next(error);
    }
}

exports.postDeleteProject = async (req, res, next) => {
    const { id } = req.body
    try {
        const data = await Project.findByIdAndDelete(id);
        res.status(200).json({
            message: "SUCCESSFULLY DELETED",
            data
        })
    }
    catch (error) {
        next(error);
    }
}

// -----------------------tags--------------------------------

exports.getTags = async (req, res, next) => {
    try {
        const tagData = await User.findOne().select("tags -_id");
        res.status(200).json({
            message: "SUCCESSFULLY FETCHED TAGS",
            tagData
        })
    }
    catch (error) {
        next(error);
    }
}
exports.postTags = async (req, res, next) => {
    const { tags } = req.body;
    const tagsArray = tags.split(',').map(tag => tag.toUpperCase().trim());
    try {
        const tagData = await User.updateOne({ name: "Anubhav Shukla" }, { $addToSet: { tags: tagsArray } })
        res.status(200).json({
            message: 'Updated tags',
            tagData
        })
    }
    catch (error) {
        next(error);
    }
}
// ----------------------Login------------------------
exports.postLogin = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const data = await User.findOne({ email: email });
        if (!data) {
            const error = new Error("Invalid Email");
            error.statusCode = 401;
            throw error;
        }
        if (data.password !== password) {
            const error = new Error("Invalid password");
            error.statusCode = 401;
            throw error;
        }
        const token = jwt.sign({ name: data.name }, process.env.JWTSECRET, { expiresIn: "1h" });
        res.status(200).json({
            message: "Successfully Authenticated",
            token
        })
    }
    catch (error) {
        next(error);
    }

}
