import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const otpSchema = Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User' },
  email: { type: String, required: true },
  code: { type: Number, required: true },
  countVerify : { type: Number, default: 0},
  isVerifyOver : { type: Boolean, default: false }
},
  {
    timestamps: true
  });

const Otp = model('Otp', otpSchema);

export default Otp;