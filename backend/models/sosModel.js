import mongoose from "mongoose";

const sosSchema = new mongoose.Schema({
    userId: {type: String, required: false}, // Optional if user is not logged in
    userName: {type: String, default: "Anonymous"},
    userEmail: {type: String, default: ""},
    latitude: {type: Number, required: false},
    longitude: {type: Number, required: false},
    severity: {type: String, default: "High"},
    symptoms: {type: String, default: ""},
    triggerType: {type: String, enum: ['manual', 'chatbot'], default: 'manual'},
    status: {type: String, enum: ['active', 'resolved', 'canceled'], default: 'active'},
    timestamp: {type: Date, default: Date.now},
    resolvedAt: {type: Date},
    notes: {type: String, default: ""}
});

const sosModel = mongoose.models.sos || mongoose.model('sos', sosSchema);

export default sosModel;
