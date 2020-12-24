
export default ({redis}) => {
  return async (req, res, next) => {
    try {
      const fooValue = await redis.getAsync('foo');
      res.send({
        status: "Success",
        message: "Value of 'foo': " + fooValue
      })
    } catch (error) {
      next(new Error(error));
    }
  };
};
