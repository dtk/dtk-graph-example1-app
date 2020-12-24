export default () => {
  return async (req, res, next) => {
    try {
      res.send({
        status: "Success"
      })
    } catch (error) {
      next(new Error(error));
    }
  };
};
