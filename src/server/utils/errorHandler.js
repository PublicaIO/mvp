const errorHandler = (error) => {
    return {
        error: true,
        code: error.code,
        message: error.message
    }
}

module.exports = errorHandler;
