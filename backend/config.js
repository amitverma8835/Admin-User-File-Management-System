const dotenv = require('dotenv');

dotenv.config()

const config = {
        dbConnectionUrl:process.env.URL || "mongodb+srv://amitkv93047:test1234@cluster1.cg7fa.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1",
        port:process.env.PORT || 4000

}

module.exports = config;