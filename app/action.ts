"use server";

import nodemailer from "nodemailer";
import { db } from "@/lib/db";
import { FormState, SignupFormSchema } from "@/lib/definitions";
import { redirect } from "next/navigation";

//these are server actions replacement ll api routes bssh t9dr tkhdm bapi and i left an expample

export async function signup(state: FormState, formData: FormData) {
  const validatedFields = SignupFormSchema.safeParse({
    username: formData.get("username"),
    email: formData.get("email"),
  });
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }
  const { username, email } = validatedFields.data;

  const existingUser = await db.user.findUnique({
    where: {
      username,
    },
  });
  if (existingUser) {
    return {
      errors: {
        username: ["Username already exists"],
      },
    };
  }

  await db.user.create({
    data: {
      username,
      email,
    },
  });
  /*

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Confirmation email",
    html: generateHTML(),
  });*/

  redirect("/success");
}
/*
function generateHTML() {
  return `
      <div>
        <h2>Hello from the real backend 👋</h2>
        <p>Registration confirmed ✅</p>
      </div>
    `;
}*/
