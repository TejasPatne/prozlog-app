export const errorMiddleware = (err, req, res, next) => {

    const errorStatus = err.status || 500;
    const errorMessage = err.message || "Internal Server Error";
    return res.status(errorStatus).json({
        success: false,
        message: errorMessage
    });
}