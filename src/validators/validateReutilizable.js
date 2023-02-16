import { validationResult } from "express-validator";

export const validateReutilizable = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        console.log(errors);
        return res.status(500).json(errors);
    }

    next();
}