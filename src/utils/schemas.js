import Joi from 'joi'

const baseMsgs = {
  'any.required': 'El campo {#label} es obligatorio',
  'string.base': 'El campo {#label} debe ser texto',
  'string.min': 'El campo {#label} debe tener al menos {#limit} caracteres',
  'string.max': 'El campo {#label} debe tener como máximo {#limit} caracteres',
  'number.base': 'El campo {#label} debe ser numérico',
  'number.min': 'El campo {#label} debe ser ≥ {#limit}',
  'number.integer': 'El campo {#label} debe ser un entero'
}

export const createProductSchema = Joi.object({
  name: Joi.string().min(2).max(60).required().label('nombre').messages(baseMsgs),
  price: Joi.number().min(0).required().label('precio').messages(baseMsgs),
  stock: Joi.number().integer().min(0).default(0).label('stock').messages(baseMsgs),
  description: Joi.string().max(200).allow('').label('descripción').messages(baseMsgs)
})

export const updateProductSchema = Joi.object({
  name: Joi.string().min(2).max(60).label('nombre').messages(baseMsgs),
  price: Joi.number().min(0).label('precio').messages(baseMsgs),
  stock: Joi.number().integer().min(0).label('stock').messages(baseMsgs),
  description: Joi.string().max(200).allow('').label('descripción').messages(baseMsgs)
}).min(1)
