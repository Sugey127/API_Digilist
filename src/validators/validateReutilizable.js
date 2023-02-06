import { validationResult } from "express-validator";

export const validateReutilizable = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        console.log(errors);
        return res.status(500).json({ errors: errors.errors[0].msg});
    }

    next();
}

//probando si se sube a git 