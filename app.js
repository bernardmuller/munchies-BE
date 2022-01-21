const express = require('express');
const session = require('express-session');
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const path = require('path');

const authRoutes = require('./routes/authRoutes');
const mealsRouter = require('./routes/mealsRoutes');
const menuRouter = require('./routes/menuRoutes');

const Database = require('./services/database')

// app settings
const sessionConfig = {
    secret: 'MYSECRET',
    name: 'appName',
    resave: false,
    saveUninitialized: false,
    // store: store,
    cookie : {
        sameSite: 'strict', // THIS is the config you are looing for.
    }
};

if (process.env.NODE_ENV === 'production') {
app.set('trust proxy', 1); // trust first proxy
sessionConfig.cookie.secure = true; // serve secure cookies
}

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
pp.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session(sessionConfig));

// Routes
app.get('/' , (req, res) => {
    res.sendFile(path.join(__dirname+'/views/home.html'))
})
app.use('/auth', authRoutes);
app.use('/meals', mealsRouter);
app.use('/menus', menuRouter);


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
