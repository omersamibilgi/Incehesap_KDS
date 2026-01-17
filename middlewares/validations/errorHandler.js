const APIError = require("../../utils/errors");

const errorHandler = (err, req, res, next) => {
    if (err instanceof APIError) {
        return res.status(err.statusCode || 400).json({
            success: false,
            message: err.message
        });
    }
    console.error("Beklenmeyen Hata:", err);
    return res.status(500).json({
        success: false,
        message: "Sunucu tarafında bir hata oluştu"
    });
};

module.exports = errorHandler;