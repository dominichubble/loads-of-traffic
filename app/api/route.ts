import { Resend } from "resend";

export async function POST(request: Request) {
  try {
    // Parse the form data from the request
    const formData = await request.formData();
    const fullName = formData.get("fullName")?.toString() || "";
    const email = formData.get("email")?.toString() || "";
    const companyName = formData.get("companyName")?.toString() || "";
    const companyRole = formData.get("companyRole")?.toString() || "";
    const message = formData.get("message")?.toString() || "";

    // Compose the email content
    const emailContent = `
      New contact form submission:
      
      Name: ${fullName}
      Email: ${email}
      Company Name: ${companyName}
      Company Role: ${companyRole}
      Message: ${message}
    `;

    // Initialize Resend with your API key
    const resend = new Resend(process.env.RESEND_API_KEY!);

    // Send the email
    const data = await resend.emails.send({
      from: email, // Must be a verified sender email
      to: "likelyhunaid@gmail.com",
      subject: "New Contact Form Submission",
      text: emailContent,
    });

    return Response.json({ success: true, data });
  } catch (error: unknown) {
    let errorMessage = "Unknown error";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    console.error("Error sending email:", error);
    return new Response(JSON.stringify({ error: errorMessage }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
