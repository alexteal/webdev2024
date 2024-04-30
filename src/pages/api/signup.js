import bcrypt from "bcrypt";
import User from "@/models/User"; // Assuming you have a User model defined
import { dbConnect } from "@/app/lib/db";
import { serialize } from "cookie";
export default async function signup(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
    return;
  }
  await dbConnect();
  const { username, password } = req.body;
  try {
    // Check if the username already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res
        .status(409)
        .json({ success: false, message: "Username already exists" });
    }
    // Hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    // Create a new user in the database
    const user = await User.create({
      username,
      password: hashedPassword,
    });
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
    res.status(201).json({ success: true, userId: user._id.toString() });
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
