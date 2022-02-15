const mongoose = require('mongoose');

module.exports.connect = (dbUrl) => {
    mongoose.connect(dbUrl, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    
    const db = mongoose.connection;

    db.on('error', console.error.bind(console, 'Connection Error:'));

    db.once('open', () => {
        console.log('Database Connected')
    });

}
