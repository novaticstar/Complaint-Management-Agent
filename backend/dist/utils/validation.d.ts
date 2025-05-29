import { z } from 'zod';
export declare const createComplaintSchema: z.ZodObject<{
    name: z.ZodString;
    email: z.ZodString;
    complaint: z.ZodString;
}, "strip", z.ZodTypeAny, {
    name: string;
    email: string;
    complaint: string;
}, {
    name: string;
    email: string;
    complaint: string;
}>;
export declare const updateComplaintSchema: z.ZodObject<{
    status: z.ZodEnum<["Pending", "Resolved"]>;
}, "strip", z.ZodTypeAny, {
    status: "Pending" | "Resolved";
}, {
    status: "Pending" | "Resolved";
}>;
export declare const complaintIdSchema: z.ZodString;
//# sourceMappingURL=validation.d.ts.map