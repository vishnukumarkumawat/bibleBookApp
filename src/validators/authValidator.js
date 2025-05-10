const Joi = require('joi');

const registerValidationSchema = Joi.object({

  name: Joi.string().min(3).max(30).required().messages({

    'string.empty': 'Name is required',

    'string.min': 'Name must be at least 3 characters',

    'any.required': 'Name is required'

  }),

  email: Joi.string().email().required().messages({

    'string.empty': 'Email is required',

    'string.email': 'Invalid email format',

    'any.required': 'Email is required'

  }),

  password: Joi.string().min(6).required().messages({

    'string.empty': 'Password is required',

    'string.min': 'Password must be at least 6 characters',

    'any.required': 'Password is required'

  })

});

//to validate the login request
const loginValidationSchema = Joi.object({

  email: Joi.string().email().required().messages({

    'string.email': 'Email must be a valid email address',

    'any.required': 'Email is required'
  }),
  password: Joi.string().min(6).required().messages({

    'string.min': 'Password must be at least 6 characters long',

    'any.required': 'Password is required'
  })
});


module.exports = { registerValidationSchema, loginValidationSchema };

