const AWS = require('aws-sdk');

// Assuming environment variables are set for AWS credentials and region
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION
});

const s3 = new AWS.S3();

function dataUriToBuffer(dataUri) {
  const base64 = dataUri.split(',')[1]; // Split to get rid of the data:image/png;base64 part
  const buffer = Buffer.from(base64, 'base64');
  return buffer;
}

function uploadFileToS3(dataUri, bucketName, objectKey) {
  const bufferData = dataUriToBuffer(dataUri);

  const params = {
    Bucket: bucketName,
    Key: objectKey,
    Body: bufferData,
    ContentType: 'image/png'
  };

  s3.putObject(params, function(err, data) {
    if (err) {
      console.log('Error uploading data: ', err);
    } else {
      console.log('Successfully uploaded data to ' + bucketName + '/' + objectKey);
    }
  });
}

module.exports = { uploadFileToS3 };