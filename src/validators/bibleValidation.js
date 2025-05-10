const Joi = require('joi');

const getVersionListValidation = Joi.object({

  book_id: Joi.string().required().length(24).hex().messages({

    'any.required': 'book_id is required',

    'string.length': 'book_id must be a valid 24-character ObjectId',
    
    'string.hex': 'book_id must be a valid hexadecimal ObjectId',
  }),
});

const getVersesListValidation = Joi.object({
  book_id: Joi.string()
    .required()
    .messages({
      'string.base': 'book_id should be a string.',

      'string.empty': 'book_id cannot be empty.',

      'any.required': 'book_id is required.'
    }),

  version_id: Joi.string()
    .required()
    .messages({
      'string.base': 'version_id should be a string.',

      'string.empty': 'version_id cannot be empty.',

      'any.required': 'version_id is required.'
    })
});

const progressTrackValidation = Joi.object({
  verse_id: Joi.string().required().messages({
    'string.base': 'Verse ID must be a valid string',
    'any.required': 'Verse ID is required'
  }),
  is_mark_read: Joi.number().valid(1).required().messages({
    'number.base': 'is_mark_read must be a number',
    'any.required': 'is_mark_read is required',
    'any.only': 'is_mark_read must be 1'
  })
});

module.exports = { getVersionListValidation, getVersesListValidation, progressTrackValidation };