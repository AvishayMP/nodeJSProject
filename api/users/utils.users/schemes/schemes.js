import Joi from 'joi';

const newUserSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    isAdmin: Joi.boolean().required()
});

const updateUserSchema = Joi.object({
    id: Joi.string().optional(),
    email: Joi.string().email().optional(),
    password: Joi.string().optional(),
    isAdmin: Joi.boolean().optional()
});
export default { newUserSchema, updateUserSchema };