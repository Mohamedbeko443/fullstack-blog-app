const { Resend } = require('resend');

module.exports = async (userEmail, subject, template) => {
    try {
        const resend = new Resend(process.env.RESEND_API_KEY);

        const data = await resend.emails.send({
            from: 'Verify <onboarding@resend.dev>',
            to: userEmail,
            subject: subject,
            html: template,
        });

        console.log("Email sent:", data);

    } catch (err) {
        console.log("Resend Error:", err);
        throw new Error("Internal server error (email)");
    }
}