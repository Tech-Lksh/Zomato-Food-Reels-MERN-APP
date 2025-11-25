const  UserModle = require('../models/user.model');
const foodpartnerModel = require('../models/foodpartner.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

async function registerUser(req, res) {
    const { fullName, email, password } = req.body;

    const isUserExist = await UserModle.findOne({ email });
    if (isUserExist) {
        return res.status(400).json({ 
            message: 'User already exists'
        });
    } 


    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await UserModle.create({
        fullName,
        email,
        password: hashedPassword
    });

    const token = jwt.sign({
        id: user._id,
    }, process.env.JWT_SECRET) 

    res.cookie('token', token);

    res.status(201).json({ message: 'User registered successfully', 
        user: {
            id: user._id,
            fullName: user.fullName,
            email: user.email
        }
    });
}

async function loginUser(req, res) {
    const { email, password } = req.body;

    const user = await UserModle.findOne({ 
        email 
    });
    if (!user) {
        return res.status(400).json({
             message: 'Invalid email or password' 
        });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        return res.status(400).json({ 
            message: 'Invalid email or password' 
        });
    }

    const token = jwt.sign({
        id: user._id,
    }, process.env.JWT_SECRET)
    res.cookie('token', token);
    res.status(200).json({ 
        message: 'User logged in successfully', 
        user: {
            id: user._id,
            fullName: user.fullName,
            email: user.email
        }
    });
}

function logoutUser(req, res) {
    res.clearCookie('token');
    res.status(200).json({ 
        message: 'User logged out successfully' 
    });
}

async function registerFoodPartner(req, res) {
    const { name, contactName, phone, address, email, password } = req.body;

    const isAccountAlreadyExist = await foodpartnerModel.findOne({ 
        email 
    });
    if (isAccountAlreadyExist) {
        return res.status(400).json({ 
            message: 'Food Partner already exists'
        });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const foodpartner = await foodpartnerModel.create({
        name,
        email,
        password: hashedPassword,
        contactName,
        phone,
        address
    });

    const token = jwt.sign({
        id: foodpartner._id,
    }, process.env.JWT_SECRET)
    res.cookie('token', token);
    res.status(201).json({ message: 'Food Partner registered successfully', 
        foodpartner: {
            id: foodpartner._id,
            name: foodpartner.name,
            email: foodpartner.email,
            contactName: foodpartner.contactName,
            phone: foodpartner.phone,
            address: foodpartner.address
        }
    });
}

async function loginFoodPartner(req, res) {
    const { email, password } = req.body;   
    const foodpartner = await foodpartnerModel.findOne({ 
        email 
    });
    if (!foodpartner) {
        return res.status(400).json({
                message: 'Invalid email or password'    
        });
    }

    const isPasswordValid = await bcrypt.compare(password, foodpartner.password);
    if (!isPasswordValid) {
        return res.status(400).json({ 
            message: 'Invalid email or password' 
        });
    }
    const token = jwt.sign({
        id: foodpartner._id,
    }, process.env.JWT_SECRET)
    res.cookie('token', token);
    res.status(200).json({
        message: 'Food Partner logged in successfully',
        foodpartner: {
            id: foodpartner._id,
            name: foodpartner.name,
            email: foodpartner.email
        }
    });
}

function logoutFoodPartner(req, res) {
    res.clearCookie('token');
    res.status(200).json({ 
        message: 'Food Partner logged out successfully' 
    });
}   

module.exports = {
    registerUser,
    loginUser,
    logoutUser,
    registerFoodPartner,
    loginFoodPartner,
    logoutFoodPartner
};