const twilio = require("twilio");

const numero = "14155238886";

const twilioAccount = {
  accountSID: "ACffcae7c7eb7261fea34e7ef699d25fd1",
  authToken: "71d57842487686657733216da1fcf141",
};

const client = twilio(twilioAccount.accountSID, twilioAccount.authToken);

const sendMessage = (text, numeroTo = 5491125414388) => {
  return new Promise((resolve, reject) => {
    client.messages
      .create({
        from: "whatsapp:+" + numero,
        body: text,
        to: "whatsapp:+" + numeroTo,
      })
      .then((message) => {
        console.log(message.sid);
        resolve(message.sid);
      })
      .catch((e) => {
        reject(false);
        console.log(e);
      });
  });
};

module.exports = sendMessage;
