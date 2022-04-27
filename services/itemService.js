const Item = require('../models/item');

module.exports = class itemService {
    constructor() {};

    create = async function(params) {
        return new Promise(async(resolve, reject) => {
            try {

                const newItem = await Item.create({...params });
                
                return resolve(newItem)
            } catch (error) {
                return reject(error);
            };
        });
    };

    get = async function(params) {
        return new Promise(async(resolve, reject) => {
            try {

                const item = Item.findById(params)
                .select('_id ingredient check')
                .populate({
                    path: 'ingredient',
                    model: 'Ingredient',
                    select: '_id name',
                })
                
                return resolve(item)
            } catch (error) {
                return reject(error);
            };
        });
    };

    check = async function(params) {
        return new Promise(async(resolve, reject) => {
            try {

                let item = params;
                item.check = true;
                await item.save();
                
                return resolve(item)
            } catch (error) {
                return reject(error);
            };
        });
    };

    unCheck = async function(params) {
        return new Promise(async(resolve, reject) => {
            try {

                let item = params;
                item.check = false;
                await item.save();
                
                return resolve(item)
            } catch (error) {
                return reject(error);
            };
        });
    };

    delete = async function(params) {
        return new Promise(async(resolve, reject) => {
            try {
                Item.deleteOne({ _id: params._id }, function(err) {
                    if (!err) {
                        return resolve({message: "item deleted"})
                    }
                    else {
                        throw new Error({ message : "error deleting item" });
                    }
                });
            } catch (error) {
                return reject(error);
            };
        });
    };
};