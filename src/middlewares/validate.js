// to validate the body request
const validate = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({ status : false, message: error.details[0].message });
    }
    next();
  };
};
module.exports = validate;
