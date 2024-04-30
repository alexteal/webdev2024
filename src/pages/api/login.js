import { databaseLogin } from "@/util/database";
import { serialize } from "cookie";
export default function login(req, res) {
  if (req.method === "POST") {
    // Set your cookie here
    const username = req.body.username;
    const password = req.body.password;
    if (databaseLogin(username, password) !== username) {
      res.status(401).json({ success: false });
      return;
    }
    console.log("Logging in with: " + username);
    res.setHeader(
      "Set-Cookie",
      serialize("username", username, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== "development",
        sameSite: "strict",
        path: "/",
        maxAge: 60 * 60 * 24, // 24 hours
      }),
    );
    res.status(200).json({ success: true });
  } else {
    // Handle any other HTTP method
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
