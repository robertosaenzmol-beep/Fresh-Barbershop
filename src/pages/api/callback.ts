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

    const token = data.access_token;
    const provider = 'github';

    return new Response(
      `<!DOCTYPE html><html><body><script>
        (function() {
          var token = ${JSON.stringify(token)};
          var provider = ${JSON.stringify(provider)};
          function sendMsg(e) {
            window.opener.postMessage(
              "authorization:" + provider + ":success:" + JSON.stringify({ token: token, provider: provider }),
              e.origin
            );
          }
          window.addEventListener("message", sendMsg, false);
          window.opener.postMessage("authorizing:" + provider, "*");
        })();
      </script></body></html>`,
      { headers: { 'Content-Type': 'text/html' } }
    );
  } catch (err) {
    return new Response(
      `<html><body><h3>Fetch error</h3><pre>${err}</pre></body></html>`,
      { headers: { 'Content-Type': 'text/html' } }
    );
  }
};
