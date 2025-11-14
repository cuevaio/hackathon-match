import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const response = await resend.emails.send({
  from: "Anthony from IA Hackathon Perú <hi@cueva.io>",
  to: "hi@cueva.io",
  template: {
    id: "credentials",
    variables: {
      EMAIL_ADD: "email@mail.com",
      PASSWORD: "password121",
    },
  },
});

console.log(response);
