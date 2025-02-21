const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
    topic: String,
    Fac: String,
    fileName: String, // ✅ Store filename
    filePath: String, // ✅ Store file path
    userId: mongoose.Schema.Types.ObjectId,
    createdAt: { type: Date, default: Date.now }})

module.exports = mongoose.model('File', fileSchema);
