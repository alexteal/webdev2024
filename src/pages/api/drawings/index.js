import Drawing from "@/models/Drawing";
import { dbConnect } from "@/app/lib/db";

export default async function handler(
  request,
  response
) {
  const { method } = request;

  await dbConnect();

  switch (method) {
    case "GET":
      try {
        const drawings = await Drawing.find({}); /* find all the data in our database */
        response.status(200).json({ success: true, data: drawings });
      } catch (error) {
        response.status(400).json({ success: false });
      }
      break;
    case "POST":
      try {
        const drawing = await Drawing.create(
          request.body,
        ); /* create a new model in the database */
        response.status(201).json({ success: true, data: drawing });
      } catch (error) {
        response.status(400).json({ success: false });
      }
      break;
    default:
      response.status(400).json({ success: false });
      break;
  }
}