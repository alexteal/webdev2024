import { dbConnect } from "@/app/lib/db";
import { GridFSBucket, ObjectID } from "mongodb";
import { Readable } from "stream";
export default async function upload(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
    return;
  }
  const { svgString, imageName } = req.body;
  if (!svgString || !imageName) {
    return res.status(400).send("SVG string or image name is missing.");
  }
  try {
    const client = await dbConnect();
    const db = client.db("mydb");
    const bucket = new GridFSBucket(db, {
      bucketName: "svgs",
    });
    let readableSVGStream = new Readable();
    readableSVGStream.push(svgString);
    readableSVGStream.push(null);
    let uploadStream = bucket.openUploadStream(imageName);
    let id = uploadStream.id;
    readableSVGStream.pipe(uploadStream);
    uploadStream.on("error", () => {
      return res.status(500).send("Could not upload the SVG");
    });
    uploadStream.on("finish", () => {
      client.close();
      return res.status(201).send({ success: true, id: id });
    });
  } catch (error) {
    return res.status(500).send("Could not connect to the database");
  }
}
