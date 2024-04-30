import User from "@/models/User"; // Assuming you have a User model defined
import { dbConnect } from "@/app/lib/db";
import { ObjectId } from "mongodb"; // Import ObjectId to validate and convert string ID to MongoDB ObjectId
export default async function userInfo(req, res) {
  if (req.method !== "GET") {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
    return;
  }
  await dbConnect();
  const { id } = req.query; // Assuming the Object ID is sent as a query parameter
  try {
    // Validate and convert id to MongoDB ObjectId
    if (!ObjectId.isValid(id)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid Object ID" });
    }
    const objectId = new ObjectId(id);
    // Find the user by Object ID
    const user = await User.findById(objectId);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    // Return the username associated with the Object ID
    res.status(200).json({ success: true, username: user.username });
  } catch (error) {
    res
      .status(500)
      .json({
        success: false,
        message: "Internal server error",
        error: error.message,
      });
  }
}
