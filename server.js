const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const app = require('./app');

const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);

mongoose.connect(DB)
    .then(() => {
        console.log("Connected to MongoDB..");
    })
    .catch(err => {
        console.error("Failed to connect to MongoDB:", err.message);
        process.exit(1);
    });

const port = process.env.port || 3000;
app.listen(port, () => {
    console.log(`App is running on ${port}..`);
});

