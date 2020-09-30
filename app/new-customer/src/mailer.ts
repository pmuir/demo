import { createTransport } from 'nodemailer';
import {SmtpOptions} from "nodemailer-smtp-transport";

// create reusable transporter object using the default SMTP transport
export const smtp = createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT || 465,
    secure: process.env.SMTP_SECURE || true, // true for 465, false for other ports
    auth: {
        user: process.env.SMTP_USERNAME, // generated ethereal user
        pass: process.env.SMTP_PASSWORD, // generated ethereal password
    },
} as SmtpOptions);
