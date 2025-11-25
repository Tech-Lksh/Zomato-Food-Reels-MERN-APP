const foodModel = require('../models/food.model');
const like = require('../models/like.model');
const storageService = require('../services/storage.services');
const likeModel = require('../models/like.model');
const saveModel = require('../models/save.model');
const commentModel = require('../models/comment.modle')
const { v4: uuid} = require("uuid");

async function createFood(req, res) {

    const fileUploadResult = await storageService.uploadFile(req.file.buffer, uuid());

    const foodItem = await foodModel.create({
        name: req.body.name,
        description: req.body.description,
        video: fileUploadResult.url,
        foodPartner: req.foodPartner._id
    });

    res.status(201).json({
        message: 'Food item created successfully',
        food: foodItem
    });
}

async function getAllFoodItems(req, res) {
    const foodItems = await foodModel.find({});
    res.status(200).json({
        message: 'Food items retrieved successfully',
        foodItems: foodItems
    });
}

async function likeFood(req, res) {
    const { foodId } = req.body;
    const user = req.user;

    const isAlreadyLiked = await likeModel.findOne({ food: foodId, user: user._id 
    });

    if (isAlreadyLiked) {
        await likeModel.deleteOne({
            user: user._id,
            food: foodId
        })

        await foodModel.findByIdAndUpdate(foodId, { $inc: { likeCount: -1 } });

        return res.status(200).json({ message: 'Food item unliked successfully' });
    }

    const like = await likeModel.create({
        user: user._id,
        food: foodId
    });

    await foodModel.findByIdAndUpdate(foodId, { $inc: { likeCount: 1 } });

    res.status(200).json({
        message: 'Food item liked successfully',
        like: like
    });
}

async function saveFood(req, res) {
    const { foodId } = req.body;
    const user = req.user;

    const isAlreadySaved = await saveModel.findOne({ food: foodId, user: user._id 
    });

    if (isAlreadySaved) {
        await saveModel.deleteOne({
            user: user._id,
            food: foodId
        })

        await foodModel.findByIdAndUpdate(foodId, { $inc: { savesCount: -1 } });

        return res.status(200).json({ message: 'Food item unsaved successfully' });
    }


    const save = await saveModel.create({
        user: user._id,
        food: foodId
    });

    await foodModel.findByIdAndUpdate(foodId, { $inc: { savesCount: 1 } });

    res.status(200).json({
        message: 'Food item saved successfully',
        save: save
    });
}


async function getSaveFood(req, res) {
    const user = req.user;
    const savedFood = await saveModel.find({ user: user._id }).populate('food');

    if (!savedFood || savedFood.length === 0) {
        return res.status(404).json({ message: 'No saved food items found' });
    }

    res.status(200).json({
        message: 'Saved food items retrieved successfully',
        savedFood
    });
}

async function commentFood(req, res) {
    const { foodId, text } = req.body;
    const user = req.user;

    const comment = await commentModel.create({
        user: user._id,
        food: foodId,
        text: text
    });

    res.status(201).json({
        message: 'Comment added successfully',
        comment: comment
    });
}   

module.exports = {
    createFood,
    getAllFoodItems,
    likeFood,
    saveFood,
    getSaveFood,
    commentFood
};
