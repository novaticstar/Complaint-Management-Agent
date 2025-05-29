"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const supabase_1 = require("../config/supabase");
const validation_1 = require("../middleware/validation");
const router = (0, express_1.Router)();
// GET /complaints - Get all complaints
router.get('/', async (req, res) => {
    try {
        const { data: complaints, error } = await supabase_1.supabase
            .from('complaints')
            .select('*')
            .order('created_at', { ascending: false });
        if (error) {
            console.error('Error fetching complaints:', error);
            res.status(500).json({
                error: 'Failed to fetch complaints',
                details: error.message
            });
            return;
        }
        res.json({
            success: true,
            data: complaints || [],
            count: complaints?.length || 0
        });
    }
    catch (error) {
        console.error('Unexpected error:', error);
        res.status(500).json({
            error: 'Internal server error'
        });
    }
});
// POST /complaints - Create a new complaint
router.post('/', validation_1.validateComplaint, async (req, res) => {
    try {
        const { name, email, complaint } = req.body;
        const { data, error } = await supabase_1.supabase
            .from('complaints')
            .insert([
            {
                name: name.trim(),
                email: email.trim().toLowerCase(),
                complaint: complaint.trim(),
                status: 'Pending',
                created_at: new Date().toISOString()
            }
        ])
            .select()
            .single();
        if (error) {
            console.error('Error creating complaint:', error);
            res.status(400).json({
                error: 'Failed to create complaint',
                details: error.message
            });
            return;
        }
        res.status(201).json({
            success: true,
            message: 'Complaint submitted successfully',
            data: data
        });
    }
    catch (error) {
        console.error('Unexpected error:', error);
        res.status(500).json({
            error: 'Internal server error'
        });
    }
});
// PATCH /complaints/:id - Update complaint status
router.patch('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        // Validate status
        if (!status || !['Pending', 'Resolved'].includes(status)) {
            res.status(400).json({
                error: 'Invalid status. Must be "Pending" or "Resolved"'
            });
            return;
        }
        const { data, error } = await supabase_1.supabase
            .from('complaints')
            .update({ status })
            .eq('id', id)
            .select()
            .single();
        if (error) {
            console.error('Error updating complaint:', error);
            res.status(400).json({
                error: 'Failed to update complaint',
                details: error.message
            });
            return;
        }
        if (!data) {
            res.status(404).json({
                error: 'Complaint not found'
            });
            return;
        }
        res.json({
            success: true,
            message: 'Complaint status updated successfully',
            data: data
        });
    }
    catch (error) {
        console.error('Unexpected error:', error);
        res.status(500).json({
            error: 'Internal server error'
        });
    }
});
// DELETE /complaints/:id - Delete a complaint
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { error } = await supabase_1.supabase
            .from('complaints')
            .delete()
            .eq('id', id);
        if (error) {
            console.error('Error deleting complaint:', error);
            res.status(400).json({
                error: 'Failed to delete complaint',
                details: error.message
            });
            return;
        }
        res.json({
            success: true,
            message: 'Complaint deleted successfully'
        });
    }
    catch (error) {
        console.error('Unexpected error:', error);
        res.status(500).json({
            error: 'Internal server error'
        });
    }
});
exports.default = router;
//# sourceMappingURL=complaints.js.map