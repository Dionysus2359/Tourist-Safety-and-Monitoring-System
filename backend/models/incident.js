const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ImageSchema = new Schema({
    url: String,
    filename: String
})
ImageSchema.virtual('thumbnail').get(function () {
    return this.url.replace('/upload', '/upload/w_200');
});
const opts = { toJSON: { virtuals: true } };

const incidentSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true }, // who reported
    description: { type: String, required: true },
    tripId: { type: mongoose.Schema.Types.ObjectId, ref: 'User.tripInfo' },
    location: {
        type: { type: String, enum: ['Point'], required: true },
        coordinates: { type: [Number], required: true } // [lng, lat]
    },
    address: String,
    severity: {
        type: String,
        enum: ['low', 'medium', 'high'],
        default: 'low'
    },
    images: [ImageSchema],
    status: { type: String, enum: ['reported', 'inProgress', 'resolved'], default: 'reported' },
    createdAt: { type: Date, default: Date.now }
}, { timestamps: true }, opts);

module.exports = mongoose.model('Incident', incidentSchema);    