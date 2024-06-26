import { NextResponse } from "next/server";
import { v4 as uuid } from "uuid";
import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { config } from "next/config";
import sharp from "sharp";
const { serverRuntimeConfig } = config();
const s3Client = new S3Client({
  region: serverRuntimeConfig.AWS_REGION,
  credentials: {
    accessKeyId: serverRuntimeConfig.AWS_ACCESSKEY_ID,
    secretAccessKey: serverRuntimeConfig.AWS_ACCESSKEY_SECRET,
  },
});

async function uploadImageToS3(file, fileName, type) {
  //   const resizedImageBuffer = await sharp(file)
  //     .resize(400, 500) // Specify your desired width or height for resizing
  //     .toBuffer();

  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: `${Date.now()}-${fileName}`,
    Body: file,
    ContentType: type, // Change the content type accordingly
  };

  const command = new PutObjectCommand(params);
  const res = await s3Client.send(command);

  const getCommand = new GetObjectCommand(params);
  const url = await getSignedUrl(s3Client, getCommand, { expiresIn: 3600 });

  return url;
}

export default async function handler(request, response) {
  const { method } = request;

  switch (method) {
    case "POST":
      try {
        const formData = await request.formData();
        console.log(formData, "Form data");
        const file = formData.get("file");
        if (!file) {
          return NextResponse.json(
            { error: "File blob is required." },
            { status: 400 },
          );
        }

        const mimeType = file.type;
        const fileExtension = mimeType.split("/")[1];

        const buffer = Buffer.from(await file.arrayBuffer());
        const url = await uploadImageToS3(
          buffer,
          uuid() + "." + fileExtension,
          mimeType,
        );

        return NextResponse.json({ success: true, url });
      } catch (error) {
        console.error("Error uploading image:", error);
        NextResponse.json({ message: "Error uploading image" });
      }
  }
}
