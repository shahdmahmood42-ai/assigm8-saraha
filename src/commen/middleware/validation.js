export const validation = (schema) => {
  return (req, res, next) => {
    const errors = [];
 
    for (const key of Object.keys(schema)) {
      const { error } = schema[key].validate(req[key], { abortEarly: false });
      if (error) {
        errors.push(error.details);
      }
    }

    if (errors.length) {
      return res.status(400).json({ message: "validation error", errors });
    }

    return next();
  };
};