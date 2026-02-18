import express from 'express';
import { createSOS, getAllSOS, updateSOSStatus, getSOSByUser } from '../controllers/sosController.js';

const sosRouter = express.Router();

// Create new SOS alert
sosRouter.post('/create', createSOS);

// Get all SOS alerts (with optional status filter)
sosRouter.get('/all', getAllSOS);

// Update SOS status
sosRouter.put('/update/:sosId', updateSOSStatus);

// Get SOS alerts by user
sosRouter.get('/user/:userId', getSOSByUser);

export default sosRouter;
