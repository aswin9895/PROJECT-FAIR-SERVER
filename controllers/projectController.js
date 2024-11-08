const { json } = require("express");
const projects = require("../models/projectModel")

// add project - authorisation needed
exports.addProjectController = async (req, res) => {
    console.log("Inside projectController");
    const userId = req.userId
    console.log(userId);
    const { title, languages, overview, github, website } = req.body
    const projectImg = req.file.filename
    console.log(title, languages, overview, github, website, projectImg);
    try {
        const existingProject = await projects.findOne({ github })
        if (existingProject) {
            res.status(406).json("Project already exists in our collection... Please upload another!!!")
        } else {
            const newProject = new projects({
                title, languages, overview, github, website, projectImg, userId
            })
            await newProject.save()
            res.status(200).json(newProject)
        }
    } catch (error) {
        res.status(401).json(error)
    }
}

// get home project - no need of authorization 
exports.homePageProjectController = async (req, res) => {
    console.log("indise homePageProjectController");
    try {
        const allHomeProjects = await projects.find().limit(3)
        res.status(200).json(allHomeProjects)
    } catch (error) {
        res.status(401).json(error)
    }
}

// get all project - authorization needed
exports.allProjectsController = async (req, res) => {
    console.log("indise allProjectsController");
    const searchKey = req.query.search
    console.log(searchKey);
    const query = {
        languages: {
            $regex: searchKey, $options: 'i'
        }
    }

    try {
        const allProjects = await projects.find(query)
        res.status(200).json(allProjects)
    } catch (error) {
        res.status(401).json(error)
    }
}

// getuser project - authorization needed
exports.userProjectController=async (req,res) => {
    console.log("inside userProjectController ");
    const userId=req.userId
    try {
        const alluserProjects=await projects.find({userId})
        res.status(200).json(alluserProjects)
    } catch (error) {
        res.status(401).json(error)
    }
}

// edit project -need authorisation 
exports.editProjectController = async (req,res) => {
    console.log("Inside editProjectController");
    const id = req.params.id
    const userId=req.userId
    const { title, languages, overview, github, website, projectImg } = req.body
    const reUploadProjectImg = req.file?req.file.filename:projectImg
    try {
        const updateProject = await projects.findByIdAndUpdate({ _id:id },{
            title, languages, overview, github, website, projectImg:reUploadProjectImg, userId
        },{new:true})
        await updateProject.save()
        res.status(200).json(updateProject)
    } catch (error) {
        res.status(401),json(error)
    }

}

// delete project - authorisation needed
exports.removeProjectController = async (req,res) => {
    console.log("inside removeProjectController");
    const {id}=req.params
    try {
        const deletePtoject = await projects.findByIdAndDelete({_id:id})
        res.status(200).json(deletePtoject)
    } catch (error) {
        res.status(401).json(error)
    }
    
}