const mongoose = require('mongoose');
const Ingredient = require('../models/ingredient');
const ingredientslist = require('./ingredientsList.json')

const Database = require('../services/database')

//Database Connection
const dbUrl = 'mongodb+srv://bernard:Muller1996@cluster0.94slm.mongodb.net/menuApp';
Database.connect(dbUrl)

const seedDB = async() => {
    await Ingredient.deleteMany({});
    for(item of ingredientslist) {
        const ingredient = new Ingredient({
            name: item.name
        })
        await ingredient.save();
        console.log(item.name + "added.")
    };
};

seedDB().then(() => {
    console.log('Database seeded with ingredients.')
    mongoose.connection.close()
})