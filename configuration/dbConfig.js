const mongoose = require('mongoose');

const connectDB = async() => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log("MONGODB CONNECTED AT: mongodb://"+ conn.connection.host +":"+conn.connection.port);
        console.log("COLLECTION NAME: "+conn.connection.name);
        console.log("=======================================");
    } catch(error) {
        console.log("ERROR: "+ error.message);
        console.log("=======================================");
        process.exit();
    }
};

module.exports = connectDB;