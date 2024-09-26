import mongoose from 'mongoose';

const favoriteSchema = new mongoose.Schema({
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
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Assuming you have a User model
    required: true,
  },
  noteId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Note', // Assuming you have a Note model
    required: true,  // Make this required if every favorite needs to be associated with a note
  },
}, {
  timestamps: true,
});

export const Favorites = mongoose.models.Favorite || mongoose.model('Favorite', favoriteSchema);