const SGmail = require("@sendgrid/mail");
class EmailService {
  /**
   *
   */
  constructor() {
    SGmail.setApiKey(
      "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"
    );
  }
  // Input Api key or add to environment config
  async SendVerificationEmail(mailObject) {
    const message = {
      to: mailObject.to,
      //email variable
      from: {
        email: "verify@smartcodehub.com",
        name: "Neeraj Dana",
      },

      content: [{ type: "text/plain", value: mailObject.messageStr }],
      subject: `${mailObject.subject}`,
    };
    try {
      const resp = await SGmail.send(message);
      return resp;
    } catch (error) {
      return error;
    }
  }
}
module.exports = EmailService;
