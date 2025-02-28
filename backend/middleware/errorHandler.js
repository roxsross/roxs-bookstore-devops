
const errorHandler = ((err, req, res, next) => {
   console.log(err.message);
   res.status(404).send('Sorry something when wrong');
});

module.exports = errorHandler;

