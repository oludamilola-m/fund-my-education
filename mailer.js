const aws = require("aws-sdk");

const ses = new aws.SES({
  accessKeyId: process.env.AWS_KEY,
  secretAccessKey: process.env.AWS_SECRET,
});

exports.sendEmail = (to, subject, body) => {
  return ses
    .sendEmail({
      Source: "Fund my Education <elastic.lime@spicedling.email>",
      Destination: {
        ToAddresses: [to],
      },
      Message: {
        Body: {
          Text: {
            Data: body,
          },
        },
        Subject: {
          Data: subject,
        },
      },
    })
    .promise();
};
