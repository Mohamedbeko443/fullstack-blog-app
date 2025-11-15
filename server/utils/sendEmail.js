const SibApiV3Sdk = require('@sendinblue/client');

const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

apiInstance.setApiKey(
    SibApiV3Sdk.TransactionalEmailsApiApiKeys.apiKey,
    process.env.BREVO_API_KEY
);

module.exports = async (userEmail, subject, template) => {
    try {
        const sendSmtpEmail = {
            sender: { email: process.env.APP_EMAIL_ADDRESS },
            to: [{ email: userEmail }],
            subject,
            htmlContent: template,
        };

        const response = await apiInstance.sendTransacEmail(sendSmtpEmail);
        console.log("Email sent:", response.messageId);
    } catch (error) {
        console.error("Brevo error:", error);
        throw new Error("Failed to send email");
    }
};
