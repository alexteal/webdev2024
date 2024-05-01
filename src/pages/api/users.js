import { dbConnect } from "@/app/lib/db";
import User from "@/models/User";
export default async function users(req, res) {
  await dbConnect();
  if (req.method === "GET") {
    try {
      const users = await User.find({}, "username"); // This will return only the usernames of all users
      res.status(200).json({ success: true, users });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error.message,
      });
    }
  } else if (req.method === "DELETE") {
    const { username } = req.body;
    try {
      const user = await User.findOneAndDelete({ username });
      if (!user) {
        return res
          .status(404)
          .json({ success: false, message: "User not found" });
      }
      res
        .status(200)
        .json({ success: true, message: "User deleted successfully" });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error.message,
      });
    }
  } else {
    res.setHeader("Allow", ["GET", "DELETE"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
