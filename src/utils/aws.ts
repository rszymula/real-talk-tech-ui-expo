// Load the AWS SDK for Node.js
const AWS = require('aws-sdk');


export function testAwsS3(){
  // Set your region
  AWS.config.update({region: 'us-east-1'}); // Example: 'us-west-2'

  // Configure AWS with your access key and secret key
  AWS.config.update({
      accessKeyId: 'AKIAQ3EGPNN5D5XGUQI3',
      secretAccessKey: '6WhRSR8ReVyaR0V9ePImtBO'
  });

  // Create a new instance of S3
  var s3 = new AWS.S3();

  // Set the parameters for the S3 get object request
  var params = {
      Bucket: 'your-bucket-name', // replace with your bucket name
      Key: 'your-object-key' // replace with the key of your S3 object
  };

  // Make the call to get the object
  s3.getObject(params, function(err, data) {
      if (err) {
          console.log(err, err.stack); // an error occurred
      } else {
          console.log(data); // successful response
          // Note: The data.Body is a Buffer representing your file
          // You can convert this to a string or a stream, depending on your needs
      }
  });
}
