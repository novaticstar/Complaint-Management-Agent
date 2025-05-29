"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notFoundHandler = exports.errorHandler = void 0;
const zod_1 = require("zod");
const errorHandler = (error, req, res, next) => {
    console.error('Error:', error);
    if (error instanceof zod_1.ZodError) {
        return res.status(400).json({
            error: 'Validation error',
            details: error.errors.map(err => ({
                field: err.path.join('.'),
                message: err.message,
            })),
        });
    }
    if (error.code === '23505') { // PostgreSQL unique violation
        return res.status(409).json({
            error: 'Resource already exists',
        });
    }
    if (error.code === '23503') { // PostgreSQL foreign key violation
        return res.status(400).json({
            error: 'Invalid reference',
        });
    }
    res.status(500).json({
        error: 'Internal server error',
        message: process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong',
    });
};
exports.errorHandler = errorHandler;
const notFoundHandler = (req, res) => {
    res.status(404).json({
        error: 'Route not found',
        path: req.originalUrl,
    });
};
exports.notFoundHandler = notFoundHandler;
//# sourceMappingURL=errorHandler.js.map