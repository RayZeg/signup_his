import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: NextRequest) {
  try {
    const { username, email } = await request.json();

    await db.user.create({
      data: {
        username,
        email,
      },
    });

    /*
    you could fetch the data back like this
    
    const user: User = await db.user.create({
      data: {
        username,
        email,
      },
    });
    */
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
    });

    redirect("/success");
    //or it could be a response nrml like this
    // return NextResponse.json(user);
  } catch (error) {
    console.log(error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

function generateHTML() {
  return `
      <div>
        <h2>Hello from the real backend 👋</h2>
        <p>Registration confirmed ✅</p>
      </div>
    `;
}
