const nodemailer = require("nodemailer");

let transporter = nodemailer.createTransport({
  service: "gmail",
  port: 587,
  secure: false,
  auth: {
    user: "estebangonz98@gmail.com",
    pass: "jpfnlapbzmhalycq",
  },
});

const setMailOptions = (
  email,
  text = "desed nodemailer",
  subject = "Mensaje desde Nodemailer"
) => {
  return {
    from: "Remitente",
    to: email,
    subject: subject,
    text: text,
  };
};

const sendEmail = async (email, text, subject) => {
  let resultado = false;
  const mailOptions = setMailOptions(email, text, subject);
  try {
    let response = await transporter.sendMail(mailOptions);
    resultado = true;
  } catch (error) {
    resultado = false;
    console.log(error);
  }

  return resultado;
};

module.exports = sendEmail;
