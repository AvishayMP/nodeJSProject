import Joi from 'joi';

const productSchema = Joi.object({
    id: Joi.string().optional(),
    title: Joi.string().required(),
    price: Joi.number().positive().required(),
    quantity: Joi.number().positive().optional(),
    description: Joi.string().required(),
    category: Joi.string().required(),
    image: Joi.string().uri().required(),
    rating: Joi.object({
        rate: Joi.number().positive().required(),
        count: Joi.number().positive().required()
    }).required()
});

const productUpdateSchema = Joi.object({
    id: Joi.string().optional(),
    title: Joi.string().optional(),
    price: Joi.number().positive().optional(),
    quantity: Joi.number().positive().optional(),
    description: Joi.string().optional(),
    category: Joi.string().optional(),
    image: Joi.string().uri().optional(),
    rating: Joi.object({
        rate: Joi.number().positive().optional(),
        count: Joi.number().positive().optional()
    }).optional()
});

export default {
    productSchema,productUpdateSchema
}