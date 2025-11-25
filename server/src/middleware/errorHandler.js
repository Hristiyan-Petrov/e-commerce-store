module.exports = (err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';

    console.error(`[Error] ${req.method} ${req.url}:`. err.message);

    if (statusCode === 500) console.error(err.stack);

    res.status(statusCode).json({
        success: false,
        error: message
    });
};