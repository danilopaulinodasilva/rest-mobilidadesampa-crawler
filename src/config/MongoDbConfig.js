const mongoose = require('mongoose');

mongoose
    .connect(process.env.MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('💾  Database connected on port 27017'))
    .catch(err => {
        console.log(err);
        throw new Error(err);
    });

module.exports = mongoose;
