import { Resend } from "resend";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_FIELD_LENGTH = 200;
const MAX_MESSAGE_LENGTH = 5000;

// Best-effort per-IP throttle. Resets whenever the serverless instance recycles,
// so it won't stop a determined attacker, but it does blunt casual form spam.
const submissionsByIp = new Map<string, number[]>();
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX = 5;

function isRateLimited(ip: string) {
  const now = Date.now();
  const timestamps = (submissionsByIp.get(ip) || []).filter(
    (t) => now - t < RATE_LIMIT_WINDOW_MS,
  );
  timestamps.push(now);
  submissionsByIp.set(ip, timestamps);
  return timestamps.length > RATE_LIMIT_MAX;
}

export async function POST(request: Request) {
  try {
    const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
    if (isRateLimited(ip)) {
      return Response.json(
        { error: "Too many submissions. Please try again later." },
        { status: 429 },
      );
    }

    const formData = await request.formData();

    // Honeypot: real visitors never fill this hidden field in.
    if (formData.get("website")?.toString()) {
      return Response.json({ success: true });
    }

    const fullName = formData.get("fullName")?.toString().trim() || "";
    const email = formData.get("email")?.toString().trim() || "";
    const companyName = formData.get("companyName")?.toString().trim() || "";
    const companyRole = formData.get("companyRole")?.toString().trim() || "";
    const message = formData.get("message")?.toString().trim() || "";

    if (!fullName || !email || !message) {
      return Response.json(
        { error: "Full name, email, and message are required." },
        { status: 400 },
      );
    }
    if (!EMAIL_RE.test(email)) {
      return Response.json({ error: "Please provide a valid email address." }, { status: 400 });
    }
    if (
      fullName.length > MAX_FIELD_LENGTH ||
      companyName.length > MAX_FIELD_LENGTH ||
      companyRole.length > MAX_FIELD_LENGTH
    ) {
      return Response.json({ error: "One or more fields is too long." }, { status: 400 });
    }
    if (message.length > MAX_MESSAGE_LENGTH) {
      return Response.json({ error: "Message is too long." }, { status: 400 });
    }

    const emailContent = `
      New contact form submission:

      Name: ${fullName}
      Email: ${email}
      Company Name: ${companyName}
      Company Role: ${companyRole}
      Message: ${message}
    `;

    const resend = new Resend(process.env.RESEND_API_KEY!);

    // Resend requires sending from a domain you've verified with them, so we
    // can't use the visitor's own address as `from` — it goes in `replyTo` instead.
    const data = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || "Loads of Traffic <onboarding@resend.dev>",
      to: "likelyhunaid@gmail.com",
      replyTo: email,
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
