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
        body('classification_id')
        .trim()
        .escape()
        .not().isEmpty()
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
        .isLength({min: 3})
        .withMessage("Enter a description"),

        body('imgPath')
        .trim()
        .isLength({min: 3})
        .withMessage('Please enter a valid image path'),

        body('thumb')
        .trim()
        .isLength({min: 3})
        .withMessage('Please enter a vaild thumbnail path'),

        body('price')
        .trim()
        .escape()
        .isDecimal({decimal_digits: 2})
        .withMessage('Please enter a USD amount with two numbers after the decimal eg. 19.05'),

        body('year')
        .trim()
        .escape()
        .matches('(?:(?:19|20)[0-9]{2})')
        .isLength({min: 4, max: 4})
        .withMessage('Please enter a valid year'),

        body('miles')
        .trim()
        .escape()
        .isLength({min: 1})
        .withMessage('Please enter the milage of the vehicle'),

        body('color')
        .trim()
        .escape()
        .isLength({min: 3})
        .withMessage('Please enter a color')
    ];
};

validate.checkRegDataVehicle = async (req, res, next) => {
//    console.log(req.body)
    const { classification_id, make, model, description, imgPath, thumbPath, price, year, miles, color } = req.body
    let errors = []
    errors = validationResult(req)
    if (!errors.isEmpty()) {
        let nav = await utilities.getNav()
        let dropdown = await utilities.buildClassDropdown()
        res.render("../views/inventory/new-vehicle.ejs", {
            errors,
            message: null,
            title: "Add Vehicle",
            nav,
            dropdown,
            classification_id, make, model, description, imgPath, thumbPath, price, year, miles, color
        })
        return
    }
    next();
}

validate.checkRegDataClass = async (req, res, next) => {
    const { newClass } = req.body
    let errors = []
    errors = validationResult(req)
    if (!errors.isEmpty()) {
        let nav = await utilities.getNav()
        res.render("../views/inventory/new-classification.ejs", {
            errors,
            message: null,
            title: "Add Classification",
            nav,
            newClass,
        })
        return
    }
    next()
}

module.exports = validate;