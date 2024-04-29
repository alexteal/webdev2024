import mongoose from "mongoose";

/* PetSchema will correspond to a collection in your MongoDB database. */
const DrawingSchema = new mongoose.Schema({
  url: {
        type: String,
      required: [true, "The reference URL must be provided"]
  },
  userName: {
    type: String,
    required: [true, "Please provide userName for this drawing"],
  }
});

export default mongoose.models.Drawing || mongoose.model("Drawing", DrawingSchema);