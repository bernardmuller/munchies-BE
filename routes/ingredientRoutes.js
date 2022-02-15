const express = require('express');
const router = express.Router();
const ingredientController = require('../controllers/ingredientController');

const catchAsync = require('../middleware/catchAsync')
const { auth } = require('../middleware/auth')

module.exports = router;

router.get('/:id', auth, catchAsync(ingredientController.get));

router.put('/:id', auth, catchAsync(ingredientController.update));

router.post('/', auth, catchAsync(ingredientController.create));

router.delete('/:id', auth, catchAsync(ingredientController.delete));

router.get('/', auth, catchAsync( ingredientController.getAll));

