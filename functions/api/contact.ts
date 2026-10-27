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

  // Email delivery is optional until RESEND_API_KEY is set in the Cloudflare
  // Pages project settings (Settings > Environment variables). Until then
  // submissions are accepted but not forwarded anywhere.
  if (env.RESEND_API_KEY && env.CONTACT_TO_EMAIL && env.CONTACT_FROM_EMAIL) {
    const emailResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: env.CONTACT_FROM_EMAIL,
        to: env.CONTACT_TO_EMAIL,
        reply_to: email,
        subject: `Mesaj nou de pe Nodexa.ro — ${name}`,
        text: `Nume: ${name}\nEmail: ${email}\n\n${message}`,
      }),
    });

    if (!emailResponse.ok) {
      return new Response('Failed to send email', { status: 502 });
    }
  }

  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
};
