const User = require('../model/user');
const Skills = require('../model/skill')
const Project = require('../model/project')

exports.dataForUser = async (req, res, next) => {

    try{
        const data = await User.find().select("-name -email -password"); // don't want the name, email and password
        res.status(200).json(
            {
                message: "SUCCESSFULL",
                data
            }
        )
    }
    catch(error){
        next(error);
    }
}

exports.login = async (req, res, next) => {

    const { email, password } = req.body;
    try{
        const data = await User.findOne({email, password})
        if(!data){
            res.status(401).json({
                message: "Invalid email or password"
            });
        }
        else{
            res.status(200).json({
                message: "Success",
                data
            });

            // Need to set the tokens
        }
    }
    catch(error){
        res.status(400).json({
            message: "Something went wrong",
            error: error.message
        });
    }
    
}

// -----------------------ABOUT--------------------------

exports.getAbout = async (req, res, next) => {
    try{
        const about = await User.find().select("-email -name -password");
        res.status(200).json({about});
    }
    catch(error){
        next(error);
    }
}

// --------------------------SKILLS--------------------------
exports.getSkills = async (req, res, next) => {
    try{
        const skills = await Skills.find();
        res.status(200).json({
            message: "SUCCESSFULLY FETCHED THE SKILL DATA",
            skills
        });
    }
    catch(error){
        next(error);
    }
}

// ------------------PROJECT--------------------
exports.getProjects = async (req, res, next) => {
    try{
        const data = await Project.find();
        res.status(200).json({
            message: "SUCCESSFULLY FETCHED THE PROJECT",
            data
        })
    }
    catch(error) {
        next(error);
    }
}

// ---------------------------TAGS------------------------
exports.getTags = async (req, res, next) => {
    try{
        const tagData = await User.findOne().select("tags -_id");
        res.status(200).json({
            message: "SUCCESSFULLY FETCHED TAGS",
            tagData
        })
    }
    catch(error) {
        next(error);
    }
}

exports.postLogout =  async (req, res, next) => {
    try{
        res.status(200).json({
            message: "SUCCESSFULLY LOGOUT"
        })
    }
    catch(error) {
        next(error)
    }

}


