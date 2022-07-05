module.exports = errorHandler = (error, req, res, next) => {
    const status = error.statusCode || 500;
    const message = error.message || 'There is some server side error';
    res.status(status).json({ message });

}