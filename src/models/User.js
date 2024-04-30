import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please provide a username for this user"],
  },
  password: {
    type: String,
    required: [true, "Please provide password for this user"],
  },
});

export default mongoose.models.Users || mongoose.model("Users", UserSchema);
