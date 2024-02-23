// Load the AWS SDK for Node.js
const AWS = require('aws-sdk');

const uri = "https://vendor-logos-bucket.s3.amazonaws.com/vendor_logos_prod/sales-tools/outreach.png"

export function testAwsS3V2(){
    const AmazonS3URI = require('amazon-s3-uri')
    const { region, bucket, key } = AmazonS3URI(uri)
    console.log("URIW", {region, bucket, key})

    AWS.config.update({region});
    AWS.config.update({
        accessKeyId: 'AKIAQ3EGPNN5IMTAMOE3',
        secretAccessKey: '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'
    });
    const s3 = new AWS.S3(
        // {signatureVersion: 's3v4'}
    );

    const params = {
      Bucket: bucket, // replace with your bucket name
      Key: key // replace with the key of your S3 object
    };

    s3.getObject(params, function(err, data) {
        if (err) {
            console.log("STEP5")
            console.log(err, err.stack); // an error occurred
            console.log("STEP6")
        } else {
            console.log(data); // successful response
            // Note: The data.Body is a Buffer representing your file
            // You can convert this to a string or a stream, depending on your needs
        }
    });
}

export function testAwsS3(){
  // Set your region
  AWS.config.update({region: 'us-east-1'}); // Example: 'us-west-2'

  console.log("STEP1")

  // Configure AWS with your access key and secret key
  AWS.config.update({
      accessKeyId: 'AKIAQ3EGPNN5D5XGUQI3',
      secretAccessKey: 'AKIAQ3EGPNN5IMTAMOE3,05aUkto/xunr4CmVFYrpa0t32gNdEnShdd20/eT9'
  });

  console.log("STEP2")

  // Create a new instance of S3
  var s3 = new AWS.S3();

  console.log("STEP3")

  // Set the parameters for the S3 get object request
  var params = {
      Bucket: 'vendor-logos-prod', // replace with your bucket name
      Key: 'aws:cloudformation:logical-id' // replace with the key of your S3 object
  };

  console.log("STEP4")

  // Make the call to get the object
  s3.getObject(params, function(err, data) {
      if (err) {
            console.log("STEP5")
          console.log(err, err.stack); // an error occurred
          console.log("STEP6")
      } else {
          console.log(data); // successful response
          // Note: The data.Body is a Buffer representing your file
          // You can convert this to a string or a stream, depending on your needs
      }
  });
}
