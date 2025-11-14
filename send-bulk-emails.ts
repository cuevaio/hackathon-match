import { Resend } from "resend";
import * as fs from "fs";
import * as path from "path";

const resend = new Resend(process.env.RESEND_API_KEY);

const csvPath = path.join(process.cwd(), "credentials.csv");
const csvContent = fs.readFileSync(csvPath, "utf-8");

const lines = csvContent.trim().split("\n").slice(1);

const credentials = lines.map((line) => {
  const [email, password] = line.split(",");
  return { email, password };
});

for (const credential of credentials) {
  try {
    const response = await resend.emails.send({
      from: "Anthony from IA Hackathon Perú <hi@cueva.io>",
      to: credential.email,
      template: {
        id: "credentials",
        variables: {
          EMAIL_ADD: credential.email,
          PASSWORD: credential.password,
        },
      },
    });

    console.log(`✓ Email sent to ${credential.email}:`, response);
  } catch (error) {
    console.error(`✗ Failed to send email to ${credential.email}:`, error);
  }

  await new Promise((resolve) => setTimeout(resolve, 3000));
}
