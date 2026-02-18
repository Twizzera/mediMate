import sosModel from "../models/sosModel.js";

// Create new SOS alert
const createSOS = async (req, res) => {
    try {
        const { userId, userName, userEmail, latitude, longitude, severity, symptoms, triggerType } = req.body;

        const sosData = {
            userId,
            userName,
            userEmail,
            latitude,
            longitude,
            severity,
            symptoms,
            triggerType,
            status: 'active',
            timestamp: new Date()
        };

        const newSOS = new sosModel(sosData);
        await newSOS.save();

        console.log('🚨 NEW SOS ALERT:', {
            userName,
            severity,
            triggerType,
            location: latitude && longitude ? `${latitude}, ${longitude}` : 'Unknown'
        });

        res.json({
            success: true,
            message: 'SOS alert created successfully',
            sosId: newSOS._id
        });
    } catch (error) {
        console.error('Error creating SOS:', error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// Get all SOS alerts
const getAllSOS = async (req, res) => {
    try {
        const { status } = req.query;
        const query = status ? { status } : {};
        
        const sosAlerts = await sosModel.find(query).sort({ timestamp: -1 });
        
        res.json({
            success: true,
            data: sosAlerts
        });
    } catch (error) {
        console.error('Error fetching SOS alerts:', error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// Update SOS status
const updateSOSStatus = async (req, res) => {
    try {
        const { sosId } = req.params;
        const { status, notes } = req.body;

        const updateData = { status };
        if (status === 'resolved') {
            updateData.resolvedAt = new Date();
        }
        if (notes) {
            updateData.notes = notes;
        }

        const updatedSOS = await sosModel.findByIdAndUpdate(
            sosId,
            updateData,
            { new: true }
        );

        if (!updatedSOS) {
            return res.status(404).json({ success: false, message: 'SOS alert not found' });
        }

        res.json({
            success: true,
            message: 'SOS status updated successfully',
            data: updatedSOS
        });
    } catch (error) {
        console.error('Error updating SOS status:', error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// Get SOS by user ID
const getSOSByUser = async (req, res) => {
    try {
        const { userId } = req.params;
        
        const sosAlerts = await sosModel.find({ userId }).sort({ timestamp: -1 });
        
        res.json({
            success: true,
            data: sosAlerts
        });
    } catch (error) {
        console.error('Error fetching user SOS alerts:', error);
        res.status(500).json({ success: false, message: error.message });
    }
};

export { createSOS, getAllSOS, updateSOSStatus, getSOSByUser };
