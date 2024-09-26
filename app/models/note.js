import mongoose from 'mongoose';

const noteSchema = new mongoose.Schema({
    tripName: {
        type: String,
        required: true,
    },
    tripCountry: {
        type: String,
        required: true,
    },
    startDate: {
        type: Date,
        required: true,
    },
    endDate: {
        type: Date,
        required: true,
    },
    description: {
        type: String,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,  
        ref: 'User',
        required: true,
    },
}, {
    timestamps: true  // Automatically manage createdAt and updatedAt fields
});

export const Notes = mongoose.models.Note || mongoose.model('Note', noteSchema);
