interface Env {
  RESEND_API_KEY?: string;
  CONTACT_TO_EMAIL?: string;
  CONTACT_FROM_EMAIL?: string;
}

interface ContactPayload {
  name: string;
  email: string;
  message: string;
}

const DEFAULT_TO_EMAIL = 'dangandila@yahoo.com';
const DEFAULT_FROM_EMAIL = 'onboarding@resend.dev';

export const onRequestPost: PagesFunction<Env> = async (context) => {
  const { request, env } = context;

  let payload: ContactPayload;
  try {
    payload = await request.json();
  } catch {
    return new Response('Invalid JSON body', { status: 400 });
  }

  const { name, email, message } = payload;
  if (!name || !email || !message) {
    return new Response('Missing required fields', { status: 400 });
  }

  const toEmail = env.CONTACT_TO_EMAIL || DEFAULT_TO_EMAIL;
  const fromEmail = env.CONTACT_FROM_EMAIL || DEFAULT_FROM_EMAIL;

  if (!env.RESEND_API_KEY) {
    console.error(
      'RESEND_API_KEY is not visible to this deployment — email not sent',
    );
    return new Response('Email delivery is not configured', { status: 500 });
  }

  const emailResponse = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${env.RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: fromEmail,
      to: toEmail,
      reply_to: email,
      subject: `Mesaj nou de pe Nodexa.ro — ${name}`,
      text: `Nume: ${name}\nEmail: ${email}\n\n${message}`,
    }),
  });

  if (!emailResponse.ok) {
    // Resend returns a JSON body explaining the rejection (unverified
    // sender, invalid key, sandbox recipient restrictions). Log it —
    // otherwise a failed send is indistinguishable from a network error.
    console.error(
      `Resend rejected the email (${emailResponse.status}): ${await emailResponse.text()}`,
    );
    return new Response('Failed to send email', { status: 502 });
  }

  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
};
