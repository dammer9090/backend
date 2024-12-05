const Club = require("../models/club");
const fs = require("fs");
const path = require("path");
const createClub = async (req, res) => {
  try {
    const { title, description, venue } = req.body;

    const { image } = req.files;

    if (!title || !description || !venue) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required fields",
      });
    }
    const supportedFile = ["jpg", "png", "gif", "jpeg"];

    const ext = image.name.split(".")[1];

    if (!ext || !supportedFile.includes(ext)) {
      return res.status(400).json({
        success: false,
        message:
          "Invalid file format. Please upload a jpg, png, gif or jpeg file",
      });
    }

    const filename = `${Date.now()}.${ext}`;

    try {
      fs.renameSync(
        image.tempFilePath,
        path.join(__dirname, "..", "public", "images", filename)
      );
    } catch (err) {
      return res.status(500).json({
        success: false,
        message: "Failed to upload image",
        err,
      });
    }

    const club = await Club.create({
      title,
      description,
      venue,
      image: `http://127.0.0.1:4000/images/${filename}`,
    });

    if (!club)
      return res.status(400).json({
        success: false,
        message: "Failed to create club, could not find club",
      });
      
  

    res.status(200).json({
      success: true,
      message: "Club created successfully",
      club,
    });


  } catch (err) {
    res.status(500).json({
      succes: false,
      message: "failed to create club",
      err,
    });
  }
};



const getClub = async (req, res) => {
  try {
    const club = await Club.find({});

    if (!club) {
      return res.status(404).json({
        success: false,
        message: "No club found",
      });
    }

 
    res.render("index", {
       club,
    
    });

  } catch (err) {
    console.log("Failed to get club data", err);
 
  }
};

const deleteClub = async (req, res) => {
  try {
    const { clubId } = req.params;

    const previousClub = await Club.findOne({ _id: clubId });

    const imagename = path.basename(previousClub.image);

    try {
      fs.unlinkSync(path.join(__dirname, "..", "public", "images", imagename));
    } catch (err) {
      console.log("failed to delete image");
    }

    const club = await Club.findByIdAndDelete({ _id: clubId });

    if (!club) {
      return res.status(404).json({
        success: false,
        message: "No club found to delete",
      });
    }

    res.status(200).json({
      success: true,
      message: "Club deleted successfully",
      club,
    });

    
  } catch (err) {
    console.log('Failed to delete club')

    res.status(500).json({
      success: false,
      message: "Failed to delete club",
      err,
    });
  }
};

const updateClub = async (req, res) => {
  try {
    const { title, description, venue } = req.body;

    const { clubId } = req.params;

    const previousClub = await Club.findOne({ _id: clubId });

    const imagename = path.basename(previousClub.image);

    try {
      fs.unlinkSync(path.join(__dirname, "..", "public", "images", imagename));
    } catch (err) {
      console.log("failed to delete image");
    }

    const { image } = req.files;

    const supportedFile = ["jpg", "png", "gif", "jpeg"];

    const ext = image.name.split(".")[1];

    if (!ext || !supportedFile.includes(ext)) {
      return res.status(400).json({
        success: false,
        message:
          "Invalid file format. Please upload a jpg, png, gif or jpeg file",
      });
    }

    const filename = `${Date.now()}.${ext}`;

    try {
      fs.renameSync(
        image.tempFilePath,
        path.join(__dirname, "..", "public", "images", filename)
      );
    } catch (err) {
      return res.status(500).json({
        success: false,
        message: "Failed to upload image",
        err,
      });
    }

    if (!title || !description || !venue) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required fields",
      });
    }

    const club = await Club.findByIdAndUpdate(
      { _id: clubId },
      {
        description,
        title,
        venue,
        image: `http://127.0.0.1:4000/images/${filename}`,
      }
    );

    if (!club) {
      return res.status(404).json({
        success: false,
        message: "No club found to update",
      });
    }

    res.status(200).json({
      success: true,
      message: "Club updated successfully",
      club,
    });
  } catch (err) {
    res.status(500).json({
      succes: false,
      message: "failed to update club",
      err,
    });
  }
};

module.exports = { createClub, getClub, deleteClub, updateClub };
