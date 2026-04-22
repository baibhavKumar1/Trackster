import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { MongoClient } from "mongodb";
import { createTransport } from "nodemailer";
import { emailOTP } from "better-auth/plugins";

const client = new MongoClient("mongodb+srv://Vaibhav:Vaibhav1@cluster0.mybcsrv.mongodb.net/trackster");
const db = client.db("trackster");

export const auth = betterAuth({
    database: mongodbAdapter(db),
    emailAndPassword: {
        enabled: true,
    },
    plugins: [
        emailOTP({
            async sendVerificationOTP({ email, otp, type }) {
                const transporter = createTransport({
                    host: "smtp.gmail.com",
                    port: 465,
                    secure: true,
                    auth: {
                        user: process.env.EMAIL_SERVER_USER,
                        pass: process.env.EMAIL_SERVER_PASSWORD,
                    },
                });

                await transporter.sendMail({
                    from: process.env.EMAIL_FROM || "Trackster <noreply@trackster.com>",
                    to: email,
                    subject: `Verify your email - ${otp}`,
                    text: `Your verification code is: ${otp}. It will expire in 10 minutes.`,
                });
            },
        }),
    ],
    secret: process.env.BETTER_AUTH_SECRET || "some-very-secret-value-that-is-at-least-32-chars-long",
    baseURL: process.env.BETTER_AUTH_URL || "http://localhost:3000",
    basePath: "/api/auth",
    trustedOrigins: ["http://localhost:3000"],
});
