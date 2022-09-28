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

const sendEmail = async (email, text, subject, res) => {
  const resultado = false;
  const mailOptions = setMailOptions(email, text, subject);
  try {
    let response = await transporter.sendMail(mailOptions);
    let resultado = true;
    res.send("Enviado");
    console.log(response);
  } catch (error) {
    res.send("No Enviado");
    console.log(error);
  }

  return resultado;
};

module.exports = sendEmail;
