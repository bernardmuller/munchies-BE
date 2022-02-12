const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const cors = require('cors');
const path = require('path');

const authRoutes = require('./routes/authRoutes');
const mealsRouter = require('./routes/mealsRoutes');
const menuRouter = require('./routes/menuRoutes');
const userRouter = require('./routes/userRoutes');

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
app.use('/auth', authRoutes);
app.use('/meals', mealsRouter);
app.use('/menus', menuRouter);
app.use('/users', userRouter);

//Error handling
app.use((err, req, res, next) => {
    const { statusCode = 500 } = err;
    if(!err.message) err.message = 'Something went wrong' 
    res.status(statusCode).send(err);
})

// Listener
app.listen(process.env.PORT || 4001, () => {
    console.log('MUNCHIE SERVER')
    console.log("Listening on port 4001")
})
