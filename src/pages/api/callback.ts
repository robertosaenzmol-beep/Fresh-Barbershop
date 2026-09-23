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

    // Build the response matching Sveltia CMS Authenticator protocol:
    // The CMS (opener) sends "authorizing:{provider}" to this popup,
    // and this popup responds with "authorization:{provider}:success:{json}"
    const content = JSON.stringify({
      provider: 'github',
      token: data.access_token,
    });

    // Mirror the exact script from sveltia-cms-auth (official authenticator)
    const msg = `authorization:github:success:${content}`;

    return new Response(
      `<!DOCTYPE html><html><head><meta charset="utf-8"></head><body><script>
        (() => {
          window.addEventListener('message', ({ data, origin }) => {
            if (data !== 'authorizing:github') return;
            window.opener?.postMessage('${msg}', origin);
          });
          window.opener?.postMessage('authorizing:github', '*');
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
