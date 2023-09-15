const Joi = require("joi");

exports.signupDataValidate = (data) => {
  const schema = Joi.object({
    username: Joi.string().min(2).max(20).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).max(20).required(),
  }).options({ abortEarly: false });

  return schema.validate(data);
};

exports.loginDataValidate = (data) => {
  const schema = Joi.object({
    email: Joi.string().required().email(),
    password: Joi.string().min(8).max(20).required(),
  });

  return schema.validate(data);
};

exports.updateUserDataValidate = (data) => {
  const schema = Joi.object({
    username: Joi.string().min(2).max(20).required(),
    email: Joi.string().email().required(),
  }).options({ abortEarly: false });

  return schema.validate(data);
};

exports.recordDataValidate = (data) => {
  const schema = Joi.object({
    user: Joi.string().required(),
    continent: Joi.string().required(),
    country: Joi.string().required(),
    countryCode: Joi.string().required(),
    cityName: Joi.string().required(),
    date: Joi.date().required(),
    status: Joi.string().required().valid("planning", "visited"),
    rating: Joi.when("status", {
      is: "visited",
      then: Joi.number().min(1).max(5).required(),
      otherwise: Joi.forbidden(),
    }),
    position: {
      coordinates: Joi.array().items(Joi.number().required()),
    },
    description: Joi.string().min(1).max(100).required(),
  }).options({ abortEarly: false });

  return schema.validate(data);
};

exports.updateRecordDataValidate = (data) => {
  const schema = Joi.object({
    user: Joi.string().required(),
    date: Joi.date().required(),
    status: Joi.string().required().valid("planning", "visited"),
    rating: Joi.when("status", {
      is: "visited",
      then: Joi.number().min(1).max(5).required(),
      otherwise: Joi.forbidden(),
    }),
    description: Joi.string().min(1).max(100).required(),
  }).options({ abortEarly: false });

  return schema.validate(data);
};
