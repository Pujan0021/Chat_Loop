const createWelcomeEmailTemplate = require("./emailTemplate");
const { resendClient, sender } = require("../lib/resend.js");

const sendWelcomeEmail = async (email, name, clientURL) => {
  const { data, error } = await resendClient.emails.send({
    from: `${sender.name} <${sender.email}>`,
    to: email,
    subject: "Welcome to ChatLoop!",
    html: createWelcomeEmailTemplate(name, clientURL),
  });

  if (error) {
    console.error("Error sending welcome email:", error);
    throw new Error(`Failed to send welcome email: ${error.message}`);
  }

  console.log("Welcome email sent successfully");
  return data;
};

module.exports = sendWelcomeEmail;