const AdminSchema = require('../models/AdminSchema')
const UsersSchema = require('../models/UserSchema')
const fileSchema = require('../models/FileSchema')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const path = require('path');
const fs = require('fs');


const multer = require('multer')
const FileSchema = require('../models/FileSchema')
const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, path.join(__dirname, "../uploads")); 
        },
        filename: function (req, file, cb) {
            cb(null, Date.now() + "-" + file.originalname); 
        }
    });
    
    const upload = multer({ storage });
    
        

exports.signInRoute = (req, res) => {
        const { name, email, password } = req.body;

        bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(password, salt, async (err, hash) => {
                        try {
                                const userdata = await UsersSchema.create({
                                        name,
                                        email,
                                        password: hash
                                })
                                res.status(200).json({ msg: "Success" })

                        } catch (error) {
                                console.log(error)
                                res.status(500).json({ message: "User already exists" })
                        }
                })
        })



}

exports.loginRoute = async (req, res) => {
        try {
                const { email, password } = req.body;

                const user = await UsersSchema.findOne({ email });

                if (!user) {
                        return res.status(400).json({ message: "Wrong Email" });
                }

                const isPasswordCorrect = await bcrypt.compare(password, user.password);
                if (!isPasswordCorrect) {
                        return res.status(400).json({ message: "Wrong Password" });
                }

                console.log("User Name:", user.name);
                console.log("User ID:", user._id); 
                res.status(200).json({
                        message: "Login successful",
                        userId: user._id,  
                        name: user.name
                });

        } catch (error) {
                console.error("Error in login:", error);
                res.status(500).json({ message: "Server error" });
        }
};

exports.fetchingAllUsername = async (req, res) => {
        try {
                const items = await UsersSchema.find();
                res.json(items);
        } catch (err) {
                res.status(500).json({ message: err.message });
        }
}

exports.upload = async (req, res) => {
        const { topic, file } = req.body;

        try {
                const uploadData = await UsersSchema.create({
                        topic,
                        file
                })

                res.status(200).json({ msg: "Success" })

        } catch (error) {
                console.log(error)
        }
}



exports.admin = async (req, res) => {
        try {
                const result = await AdminSchema.create({
                        email: "admin@gmail.com",
                        password: "admin"
                })

                res.status(201).json({ msg: "Created Successfuly" })

        } catch (error) {
                console.log(error)
        }
}

exports.adminCheck = async (req, res) => {
        try {
                const { email, password } = req.body;
                const admin = await AdminSchema.findOne({ email })
                if (!admin) {
                        return res.status(400).json({ message: "Wrong Email" });
                }
                if (admin.password !== password) {
                        return res.status(401).json({ message: "Incorrect Password" })
                }
                res.status(201).json({ message: "Login successful" })

        } catch (error) {
                console.log(error)
        }
}


exports.fileUpload = async (req, res) => {
        upload.single('file')(req, res, async function (err) {
            if (err) {
                console.error("❌ Multer error:", err);
                return res.status(500).json({ msg: "Multer error", error: err.message });
            }
    
            try {
                const { topic, userId, Fac } = req.body;
                if (!topic || !userId || !Fac) {
                    return res.status(400).json({ msg: "All fields are required." });
                }
    
                if (!req.file) {
                    return res.status(400).json({ msg: "File is required." });
                }
    
                console.log("File uploaded:", req.file.filename);
    
                const uploadFile = await fileSchema.create({
                    topic,
                    Fac,
                    fileName: req.file.filename,  
                    filePath: `uploads/${req.file.filename}`,  
                    userId
                });
    
                res.status(201).json({ msg: "File Uploaded Successfully", data: uploadFile });
    
            } catch (error) {
                console.error("❌ Error uploading file:", error);
                res.status(500).json({ msg: "Internal Server Error", error: error.message });
            }
        });
    };
    
exports.fetchUserData = async (req, res) => {
        try {
                const { userId } = req.params;

                if (!mongoose.Types.ObjectId.isValid(userId)) {
                        console.log(" Invalid userId format");
                        return res.status(400).json({ message: 'Invalid userId format' });
                }

                const userData = await fileSchema.find({ userId: new mongoose.Types.ObjectId(userId) });

                if (userData.length === 0) {
                        console.log("No data found for this userId.");
                        return res.status(404).json({ message: 'No data found for this userId' });
                }

                console.log("✅ Successfully fetched data:", userData);
                res.status(200).json(userData); 

        } catch (error) {
                console.error("❌ Server Error:", error);
                res.status(500).json({ error: 'Internal Server Error' });
        }
};




exports.downloadFile = async (req, res) => {
        try {
            const { userId } = req.params;
    
            if (!mongoose.Types.ObjectId.isValid(userId)) {
                return res.status(400).json({ message: "Invalid userId format" });
            }
    
            const fileData = await fileSchema.findOne({ _id: userId });
    
            if (!fileData) {
                return res.status(404).json({ message: "File not found in database" });
            }
    
            if (!fileData.filePath) {
                return res.status(500).json({ message: "File path missing in database" });
            }
    
            const filePath = path.join(__dirname, "../", fileData.filePath);
    
            if (!fs.existsSync(filePath)) {
                return res.status(404).json({ message: "File not found on server" });
            }
    
            res.download(filePath, fileData.fileName, (err) => {
                if (err) {
                    console.error(" File download error:", err);
                    return res.status(500).json({ message: "Error in file download" });
                }
            });
    
        } catch (error) {
            console.error(" Server Error:", error);
            res.status(500).json({ error: "Internal Server Error", details: error.message });
        }
    };
    
    

    exports.deleteUser = async (req, res) => {
        try {
            const { id } = req.params;  
    
            if (!mongoose.Types.ObjectId.isValid(id)) {
                console.log("Invalid User ID format");
                return res.status(400).json({ message: "Invalid User ID format" });
            }
    
            const user = await UsersSchema.findById(id);
            if (!user) {
                console.log(" User not found in database");
                return res.status(404).json({ message: "User not found" });
            }
    
            await UsersSchema.findByIdAndDelete(id);
            const deleteFiles = await FileSchema.deleteMany({ userId: id });
            console.log(`✅ Deleted ${deleteFiles.deletedCount} files.`);
    
            return res.json({ message: "User and files deleted successfully" });
    
        } catch (error) {
            console.error(" Error deleting user:", error.message);
            return res.status(500).json({ message: "Internal server error", error: error.message });
        }
    };
    
    exports.deleteFile = async (req, res) => {
        try {
            const { id } = req.params;
            const file = await fileSchema.findById(id);
            if (!file) {
                return res.status(404).json({ message: "File not found" });
            }
            await fileSchema.findByIdAndDelete(id);
            res.json({ message: "File deleted successfully" });
        } catch (error) {
            console.error("Error deleting file:", error);
            res.status(500).json({ message: "Error deleting file" });
        }
    };    