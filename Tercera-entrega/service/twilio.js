const twilio = require("twilio");

const numero = "14155238886";

const twilioAccount = {
  accountSID: "ACffcae7c7eb7261fea34e7ef699d25fd1",
  authToken: "ed0f29fa5306285acc09c0c762536f06",
};

const client = twilio(twilioAccount.accountSID, twilioAccount.authToken);

const sendMessage = (text, numeroTo = "541125414388") => {
  return new Promise(async (resolve, reject) => {
    client.messages
      .create({
        from: "whatsapp:+" + numero,
        body: text,
        to: "whatsapp:+5491125414388",
      })
      .then((message) => {
        resolve(true);
      })
      .catch((e) => {
        console.log(e);
        reject(false);
      });
  });
};

module.exports = sendMessage;
