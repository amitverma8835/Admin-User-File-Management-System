const express = require('express');
const app = express();
const mongoose = require('mongoose');
const config = require('./config');
const router = require('./route/userRoute');
const cors = require('cors');
const path = require('path'); 
const _dirname = path.resolve()
const corsOption = {
    origin : "https://studentshub-2.onrender.com",
    credentials:true
}

app.use(cors(corsOption));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api', router);
app.use(express.static(path.join(_dirname,"/frontend/dist")))
app.get('*',(_,res)=>{
    res.sendFile(path.resolve(_dirname,"frontend","dist","index.html"));
})


app.listen(config.port, () => {
    console.log(`🚀 Server is running on port ${config.port}`);
});

mongoose.connect(config.dbConnectionUrl, {
   
})
.then(() => console.log("✅ Database Connected Successfully"))
.catch((err) => console.error("❌ Database Connection Failed:", err));
