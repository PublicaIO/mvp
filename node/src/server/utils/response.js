const response = (req, res, next) => {
    res.error = (code, message = 'Server error', status = 500) => {
        return res.status(status).json({
            error: true,
            code,
            message
        })
    };

    res.success = (data = {}, status = 200) => {
        return res.status(status).json(Object.assign(data, { error: false }));
    };

    next();
}


module.exports = response;