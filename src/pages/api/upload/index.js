import { dbConnect } from "@/app/lib/db";
import { GridFSBucket, ObjectID } from "mongodb";
import { Readable } from "stream";
export default async function upload(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
    return;
  }
  await dbConnect();
  const bucket = new GridFSBucket(dbConnect, {
    bucketName: "images",
  });
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send("No files were uploaded.");
  }
  let image = req.files.image;
  let imageName = req.body.imageName;
  let readableImageStream = new Readable();
  readableImageStream.push(image.data);
  readableImageStream.push(null);
  let uploadStream = bucket.openUploadStream(imageName);
  let id = uploadStream.id;
  readableImageStream.pipe(uploadStream);
  uploadStream.on("error", () => {
    return res.status(500).send("Could not upload the file");
  });
  uploadStream.on("finish", () => {
    return res.status(201).send({ success: true, id: id });
  });
}
