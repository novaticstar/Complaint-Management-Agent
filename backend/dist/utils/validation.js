"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.complaintIdSchema = exports.updateComplaintSchema = exports.createComplaintSchema = void 0;
const zod_1 = require("zod");
exports.createComplaintSchema = zod_1.z.object({
    name: zod_1.z.string().min(1, 'Name is required').max(100, 'Name must be less than 100 characters'),
    email: zod_1.z.string().email('Invalid email address'),
    complaint: zod_1.z.string().min(10, 'Complaint must be at least 10 characters long').max(1000, 'Complaint must be less than 1000 characters'),
});
exports.updateComplaintSchema = zod_1.z.object({
    status: zod_1.z.enum(['Pending', 'Resolved'], {
        required_error: 'Status is required',
        invalid_type_error: 'Status must be either Pending or Resolved',
    }),
});
exports.complaintIdSchema = zod_1.z.string().uuid('Invalid complaint ID format');
//# sourceMappingURL=validation.js.map