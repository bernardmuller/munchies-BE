const mongoose = require('mongoose');
const dbUrl = process.env.DBURL || 'mongodb://localhost:27017/menuApp';

module.exports.connectDB = () => {

    mongoose.connect(dbUrl, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    });
    
    const db = mongoose.connection;

    db.on('error', console.error.bind(console, 'Connection Error:'));

    db.once('open', () => {
        console.log('Database Connected...')
    });

}