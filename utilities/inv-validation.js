const utilities = require("./");
const { body, validationResult } = require("express-validator");
const invModel = require("../models/inventory-model");
const validate = {}

validate.newClassRules = () => {
    return [
        body('newClass')
        .trim()
        .escape()
        .isLength({min: 3})
        .withMessage("Please provide new classification name")
    ]
};

validate.newVehicleRules = () => {
    return [
        body('classification')
        .trim()
        .escape()
        .withMessage("Choose a classification"),

        body('make')
        .trim()
        .escape()
        .isLength({min: 3})
        .withMessage("Please enter a make for the vehicle"),

        body('model')
        .trim()
        .escape()
        .isLength({min: 3})
        .withMessage("Please enter a model for the vehicle"),

        body('description')
        .trim()
        .escape()
        .withMessage("Enter a description"),

        body('imgPath')
        .trim()
        .withMessage('Please enter a valid image path'),

        body('thumb')
        .trim()
        .withMessage('Please enter a vaild thumbnail path'),

        body('price')
        .trim()
        .escape()
        .isDecimal({decimal_digits: '2'})
        .withMessage('Please enter a USD amount with two numbers after the decimal eg. 19.05'),

        body('year')
        .trim()
        .escape()
        .matches('(?:(?:19|20)[0-9]{2})')
        .withMessage('PLease enter a valid year'),

        body('miles')
        .trim()
        .escape()
        .withMessage('Please enter the milage of the vehicle'),

        body('color')
        .trim()
        .escape()
        .withMessage('Please enter a color')
    ]
}

validate.checkRegData = async (req, res, next) => {
    const { classificationId, make, model, description, imgPath, thumbPath, price, year, miles, color } = req.body
    let errors = []
    errors = validationResult(req)
    if (!errors.isEmpty()) {
    let nav = await utilities.getNav()
    res. render ("../views/inventory/new-vehicle.ejs", {
    errors, 
    message: null, 
    title: "Add Vehicle", 
    nav, 
    classificationId, make, model, description, imgPath, thumbPath, price, year, miles, color
    })
    return
    }
    next ()
    }

module.exports = validate;