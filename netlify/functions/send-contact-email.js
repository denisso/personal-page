const {
    MAILGUN_API_KEY,
    MAILGUN_DOMAIN,
    MAILGUN_URL,
    MAILGUN_FROM_EMAIL_ADDRESS,
    MAILGUN_CONTACT_TO_EMAIL_ADDRESS,
} = process.env;
const mailgun = require("mailgun-js")({
    apiKey: MAILGUN_API_KEY,
    domain: MAILGUN_DOMAIN,
    url: MAILGUN_URL,
});

exports.handler = async (event) => {

    if (event.httpMethod !== "POST") {
        return {
            statusCode: 405,
            body: "Method Not Allowed",
            headers: { Allow: "POST" },
        };
    }

    const data = JSON.parse(event.body);
    if (!data.message || !data.contactName || !data.contactEmail) {
        return {
            statusCode: 422,
            body: "Name, email, and message are required.",
        };
    }

    const mailgunData = {
        from: MAILGUN_FROM_EMAIL_ADDRESS,
        to: MAILGUN_CONTACT_TO_EMAIL_ADDRESS,
        "h:Reply-To": data.contactEmail,
        subject: `Message from site ${data.contactName}`,
        text: `Name: ${data.contactName}\nEmail: ${data.contactEmail}\nMessage: ${data.message}`,
    };

    return mailgun
        .messages()
        .send(mailgunData)
        .then(() => ({
            statusCode: 200,
            body: "Your message was sent successfully! We'll be in touch.",
        }))
        .catch((error) => ({
            statusCode: 422,
            body: `Error: ${error}`,
        }));
};
