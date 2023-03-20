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

        body('')
    ]
}