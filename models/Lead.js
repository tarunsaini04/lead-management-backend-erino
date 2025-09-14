import mongoose from 'mongoose';

const leadSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    company: { type: String },
    city: { type: String },
    state: { type: String },
    source: {
      type: String,
      required: true,
      enum: ['website', 'facebook_ads', 'google_ads', 'referral', 'events', 'other'],
    },
    status: {
      type: String,
      required: true,
      enum: ['new', 'contacted', 'qualified', 'lost', 'won'],
      default: 'new',
    },
    score: { type: Number, min: 0, max: 100 },
    lead_value: { type: Number },
    last_activity_at: { type: Date, default: null },
    is_qualified: { type: Boolean, default: false },
  },
  {
    timestamps: true, 
  }
);

const Lead = mongoose.model('Lead', leadSchema);

export default Lead;