import AWS from "aws-sdk";
import { dataUriToBuffer } from "@/app/lib/aws";
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});
const bucketName = process.env.AWS_BUCKET_NAME;
const s3 = new AWS.S3();
export default async function s3Handler(req, res) {
  const { method, query } = req;
  const objectKey = query.objectKey; // Assuming objectKey is passed as a query parameter
  switch (method) {
    case "GET":
      // Handle GET request
      if (!objectKey || !bucketName) {
        return res
          .status(400)
          .json({ success: false, message: "Missing objectKey or bucketName" });
      }
      const getParams = {
        Bucket: bucketName,
        Key: objectKey,
      };
      try {
        const data = await s3.getObject(getParams).promise();
        res.setHeader("Content-Type", data.ContentType);
        res.send(data.Body);
      } catch (error) {
        res.status(500).json({
          success: false,
          message: "Error retrieving object: ",
          error: error.message,
        });
      }
      break;
    case "POST":
      // Handle POST request
      const bufferData = dataUriToBuffer(dataUri);
      const params = {
        Bucket: bucketName,
        Key: objectKey,
        Body: bufferData,
        ContentType: "image/png",
      };
      try {
        await s3.putObject(params).promise();
        res.status(200).json({
          success: true,
          message:
            "Successfully uploaded data to " + bucketName + "/" + objectKey,
        });
      } catch (error) {
        res.status(500).json({
          success: false,
          message: "Error uploading data: ",
          error: error.message,
        });
      }
      break;
    case "PUT":
      // Handle PUT request
      if (!dataUri || !bucketName || !objectKey) {
        return res.status(400).json({
          success: false,
          message: "Missing dataUri, bucketName or objectKey",
        });
      }
      const putParams = {
        Bucket: bucketName,
        Key: objectKey,
        Body: bufferData,
        ContentType: "image/png",
      };
      try {
        await s3.putObject(putParams).promise();
        res.status(200).json({
          success: true,
          message:
            "Successfully uploaded data to " + bucketName + "/" + objectKey,
        });
      } catch (error) {
        res.status(500).json({
          success: false,
          message: "Error uploading data: ",
          error: error.message,
        });
      }
      break;
    case "DELETE":
      // Handle DELETE request
      if (!objectKey || !bucketName) {
        return res
          .status(400)
          .json({ success: false, message: "Missing objectKey or bucketName" });
      }
      const deleteParams = {
        Bucket: bucketName,
        Key: objectKey,
      };
      try {
        await s3.deleteObject(deleteParams).promise();
        res.status(200).json({
          success: true,
          message: "Successfully deleted " + bucketName + "/" + objectKey,
        });
      } catch (error) {
        res.status(500).json({
          success: false,
          message: "Error deleting object: ",
          error: error.message,
        });
      }
      break;
    default:
      res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
