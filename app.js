const express = require('express');
// const cookieParser = require('cookie-parser');
const app = express();
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv');
dotenv.config();

//Database Connection
const Database = require('./services/database');
Database.connect(process.env.DB_URL);

//Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
app.use(cors({
    credentials: true, 
    origin: ['http://localhost:3000']
}));
const { auth } = require('./middleware/auth')

// Routes
const ROUTES = require('./routes')
console.log(ROUTES)
app.get('/' , (req, res) => {
    res.sendFile(path.join(__dirname+'/views/home.html'));
});

for(const route of Object.values(ROUTES)) {
    if(!route || !route.method || !route.path || !route.handler) {
        continue;
    };

    switch (route.method.toUpperCase()) {
        case 'GET':
            if(!route.auth) {
                app.get(route.path, route.handler);
                break;
            };
            app.get(route.path, auth, route.handler);
            break
        case 'POST':
            if(!route.auth) {
                app.post(route.path, route.handler);
                break;
            };
            app.post(route.path, auth, route.handler);
            break;
        case 'PUT':
            if(!route.auth) {
                app.put(route.path, route.handler);
                break;
            };
            app.put(route.path, auth, route.handler);
            break;
        case 'DELETE':
            if(!route.auth) {
                app.delete(route.path, route.handler);
                break;
            };
            app.delete(route.path, auth, route.handler);
            break;
        default:
            break;
    };
};

//Error handling
app.use((err, req, res, next) => {
    const { statusCode = 500 } = err;
    if(!err.message) err.message = 'Something went wrong';
    res.status(statusCode).send(err);
});

// Listener
port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log('MUNCHIE SERVER');
    console.log(`Listening on port ${port}`);
});
