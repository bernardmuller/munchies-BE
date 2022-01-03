const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
// const dbUrl = 'mongodb://localhost:27017/menuApp';
const dbUrl = 'mongodb+srv://bernard:Muller1996@cluster0.94slm.mongodb.net/menuApp';

const authRoutes = require('./routes/authRoutes');
const mealsRouter = require('./routes/mealsRoutes');

// Databse connection
mongoose.connect(dbUrl, {
    useNewUrlParser: true, 
    useUnifiedTopology: true 
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Connection Error:'));

db.once('open', () => {
    console.log('Database Connected')
});

//Middleware
app.use(express.json());
app.use(cors({
    credentials: true, 
    origin: true
}));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Routes
app.use('/meals', mealsRouter);
app.use(authRoutes);


// Listener
app.listen(process.env.PORT || 4001, () => {
    console.log('--------------------------------')
    console.log('   MUNCHIE MANAGER SERVER V1')
    console.log('--------------------------------')
    console.log("Listening on port 4001")
})
