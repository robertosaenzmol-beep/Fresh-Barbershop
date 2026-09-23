export const prerender = false;

import type { APIRoute } from 'astro';

export const GET: APIRoute = async ({ request }) => {
  const url = new URL(request.url);
  const code = url.searchParams.get('code');

  if (!code) {
    return new Response('Missing code parameter', { status: 400 });
  }

  const clientId = process.env.OAUTH_GITHUB_CLIENT_ID;
  const clientSecret = process.env.OAUTH_GITHUB_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    return new Response('OAuth env vars not configured', { status: 500 });
  }

  try {
    const tokenRes = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        client_id: clientId,
        client_secret: clientSecret,
        code,
      }),
    });

    const data = await tokenRes.json();

    if (!data.access_token) {
      return new Response(
        `<html><body><h3>Auth error</h3><pre>${JSON.stringify(data, null, 2)}</pre></body></html>`,
        { headers: { 'Content-Type': 'text/html' } }
      );
    }

    const messageContent = JSON.stringify({
      token: data.access_token,
      provider: 'github',
    });

    return new Response(
      `<!DOCTYPE html><html><body><script>
        (function() {
          var content = ${messageContent};
          var msg = "authorization:github:success:" + JSON.stringify(content);
          var sent = false;

          function sendToOpener() {
            if (sent) return;
            if (window.opener) {
              sent = true;
              window.opener.postMessage(msg, "*");
              setTimeout(function() { window.close(); }, 250);
            }
          }

          // Try sending immediately
          sendToOpener();

          // Also listen for handshake from opener as fallback
          window.addEventListener("message", function(e) {
            sendToOpener();
          }, false);

          // Notify opener we are ready
          if (window.opener) {
            window.opener.postMessage("authorizing:github", "*");
          }
        })();
      </script><p style="font-family:system-ui;color:#666;text-align:center;margin-top:40px;">Autenticando…</p></body></html>`,
      { headers: { 'Content-Type': 'text/html' } }
    );
  } catch (err) {
    return new Response(
      `<html><body><h3>Fetch error</h3><pre>${err}</pre></body></html>`,
      { headers: { 'Content-Type': 'text/html' } }
    );
  }
};
