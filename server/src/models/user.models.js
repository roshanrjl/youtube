import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

// Define schema
const userSchema = new Schema(
  {
    // OAuth IDs (optional, depending on provider)
    googleId: {
      type: String,
      unique: true,
      sparse: true, // allows null
    },
    githubId: {
      type: String,
      unique: true,
      sparse: true,
    },

    // Common fields
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    fullName: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    avatar: {
      type: String, // cloudinary url
      required: true,
    },
    coverImage: {
      type: String,
    },
    watchHistory: [
      {
        type: Schema.Types.ObjectId,
        ref: "Video",
      },
    ],

    // Local auth
    password: {
      type: String,
      required: function () {
        // password is required ONLY if no OAuth provider is linked
        return !this.googleId && !this.githubId;
      },
    },

    refreshToken: {
      type: String,
    },
  },
  { timestamps: true }
);

// 🔑 Pre-save hook to hash password if modified
userSchema.pre("save", async function (next) {
  if (!this.isModified("password") || !this.password) {
    return next();
  }
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// 🔑 Method: Check password
userSchema.methods.isPasswordCorrect = async function (password) {
  if (!this.password) return false; // no password for OAuth users
  return await bcrypt.compare(password, this.password);
};

// 🔑 Method: Generate Access Token
userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      username: this.username,
      fullName: this.fullName,
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: process.env.ACCESS_TOKEN_EXPIRES }
  );
};

// 🔑 Method: Generate Refresh Token
userSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    { _id: this._id },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: process.env.REFRESH_TOKEN_EXPIRES }
  );
};

// Export model
export const User = mongoose.model("User", userSchema);
