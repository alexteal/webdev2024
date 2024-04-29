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
      case "PUT":
        try {
          const { id } = request.query; // Assuming the ID is sent as a query parameter
          const updatedDrawing = await Drawing.findByIdAndUpdate(id, request.body, { new: true, runValidators: true });
          if (!updatedDrawing) {
            return response.status(404).json({ success: false, message: 'Drawing not found' });
          }
          response.status(200).json({ success: true, data: updatedDrawing });
        } catch (error) {
          response.status(400).json({ success: false, error: error.message });
        }
        break;
    case "DELETE":
        try {
          const { id } = request.query; // Assuming the ID is sent as a query parameter
          const deleteResult = await Drawing.findByIdAndDelete(id);
          if (!deleteResult) {
            return response.status(404).json({ success: false, message: 'Drawing not found' });
          }
          response.status(200).json({ success: true, data: deleteResult });
        } catch (error) {
          response.status(400).json({ success: false, error: error.message });
        }
        break;
      default:
        response.status(405).json({ success: false, message: 'Method not allowed' });
        break;
    }
}