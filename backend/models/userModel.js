import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true, // Every users should have unique email
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false, // The default user is not an admin
    },
  },
  {
    timestamps: true,
  }
);

// This method will run BEFORE a user is saved to the database
userSchema.pre('save', async function (next) {
  
  if (!this.isModified('password')) {
    next();
  }
 
  const salt = await bcrypt.genSalt(10);  // This Generates a "salt" to make the hash more secure
  
  this.password = await bcrypt.hash(this.password, salt); // Hash the plain text password with the salt
});

// Adding a custom method to our schema to compare passwords
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);

export default User;