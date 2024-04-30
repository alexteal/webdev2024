import bcrypt from "bcrypt";
import User from "@/models/User"; // Assuming you have a User model defined
import { dbConnect } from "@/app/lib/db";
import { serialize } from "cookie";
export default async function login(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
    return;
  }
  await dbConnect();
  const { username, password } = req.body;
  try {
    // Find the user by username
    const user = await User.findOne({ username });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    // Verify the password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials" });
    }
    // Set cookie with the user's MongoDB Object ID
    res.setHeader(
      "Set-Cookie",
      serialize("userId", user._id.toString(), {
        httpOnly: true,
        secure: process.env.NODE_ENV !== "development",
        sameSite: "strict",
        path: "/",
        maxAge: 60 * 60 * 24, // 24 hours
      }),
    );
    res
      .status(200)
      .json({
        success: true,
        message: "Login successful",
        userId: user._id.toString(),
      });
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
