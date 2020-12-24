export default ({redis}) => {
  return async (req, res, next) => {
    const body = req.body;
    try {
      await redis.setAsync('foo', body.value);
      res.send({
        status: "Success",
        message: "Successfully set foo variable to value " + body.value
      })
    } catch (error) {
      next(new Error(error));
    }
  };
};
