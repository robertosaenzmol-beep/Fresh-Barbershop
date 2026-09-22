export const prerender = false;

import type { APIRoute } from 'astro';

export const GET: APIRoute = async ({ request }) => {
  const url = new URL(request.url);
  const code = url.searchParams.get('code');

  if (!code) {
    return new Response('Missing code parameter', { status: 400 });
  }

  const tokenRes = await fetch('https://github.com/login/oauth/access_token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      client_id: import.meta.env.OAUTH_GITHUB_CLIENT_ID,
      client_secret: import.meta.env.OAUTH_GITHUB_CLIENT_SECRET,
      code,
    }),
  });

  const data = await tokenRes.json();

  const status = data.access_token ? 'success' : 'error';
  const content = data.access_token
    ? JSON.stringify({ token: data.access_token, provider: 'github' })
    : JSON.stringify({ error: data.error_description || 'Authorization failed' });

  const html = `<!DOCTYPE html><html><body><script>
    (function() {
      var status = ${JSON.stringify(status)};
      var content = ${content};
      var msg = "authorization:github:" + status + ":" + JSON.stringify(content);
      function sendMsg(e) {
        window.opener.postMessage(msg, e.origin);
      }
      window.addEventListener("message", sendMsg, false);
      window.opener.postMessage("authorizing:github", "*");
    })();
  </script></body></html>`;

  return new Response(html, {
    headers: { 'Content-Type': 'text/html' },
  });
};
