const express = require('express');
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const path = require('path');

const authRoutes = require('./routes/authRoutes');
const mealsRouter = require('./routes/mealsRoutes');

const Database = require('./services/database')

//Database Connection
const dbUrl = 'mongodb+srv://bernard:Muller1996@cluster0.94slm.mongodb.net/menuApp';
Database.connect(dbUrl)

//Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors({
    credentials: true, 
    origin: true
}));

// Routes
app.get('/' , (req, res) => {
    res.sendFile(path.join(__dirname+'/views/home.html'))
})
app.use('/meals', mealsRouter);
app.use('/auth', authRoutes);

// Listener
app.listen(process.env.PORT || 4001, () => {
    console.log('MUNCHIE SERVER')
    console.log("Listening on port 4001")
})
