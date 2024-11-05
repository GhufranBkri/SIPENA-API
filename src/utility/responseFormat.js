const successResponse = (data, message = null) => ({
    status: "success",
    data,
    message
});

const errorResponse = (message, data = null) => ({
    status: "error",
    data,
    message
});

module.exports = {
    successResponse,
    errorResponse
};