const User = require('../models/User');
const Item = require('../models/item');
const ItemService = require('../services/itemService');
const AppError = require('../utils/AppError');

const itemService = new ItemService;

module.exports = class itemController {
    constructor() {};

    create = async function(req, res) {
        try {

            let item = {
                ingredient_id: req.body.ingredient_id,
            };

            if(item.ingredient_id == undefined) return res.status(400).send({ message: `ingredient_id required`});

            const user = await User.findById(res.locals.user);
            item.createdBy = user._id;

            const newItem = await itemService.create(item);
            
            return res.status(200).send(newItem)
        } catch (error) {
            throw new AppError(error, 500);
        };
    };

    get = async function(req, res) {
        try {

            const item = await itemService.get(req.params.id)

            res.status(200).send(item);
        } catch (error) {
            console.log(error)
            throw new AppError(error, 500);
        };
    };

    check = async function(req, res) {
        try {
            console.log("check")

            const item = await Item.findById(req.params.id);
            if(!item || item == undefined) { 
                return res.status(400)
                .send({ 
                    message: "item not found"
                })
            };

            if(item.checked) return res.status(400).send({
                message: "item is already checked"
            })

            const checkedItem = await itemService.check(item);

            return res.status(200).send(checkedItem);
        } catch (error) {
            throw new AppError(error, 500);
        };
    };

    unCheck = async function(req, res) {
        try {

            const item = await Item.findById(req.params.id);
            if(!item || item == undefined) { 
                return res.status(400)
                .send({ 
                    message: "item not found"
                })
            };

            if(item.checked) return res.status(400).send({
                message: "item is already un-checked"
            })

            const checkedItem = await itemService.unCheck(item);

            return res.status(200).send(checkedItem);
            
        } catch (error) {
            throw new AppError(error, 500);
        };
    };

    delete = async function(req, res) {
        try {

            const item = Item.findById(req.params.id);
            if(!item || item == undefined) { 
                return res.status(400)
                .send({ 
                    message: "item not found"
                })
            };

            const deletedItem = await itemService.delete(item);

            return res.status(200).send(deletedItem);
        } catch (error) {
            throw new AppError(error, 500);
        };
    };

    
};