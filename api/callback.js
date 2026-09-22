export default async function handler(req, res) {
  const { code } = req.query;

  if (!code) {
    res.status(400).send('Missing code parameter');
    return;
  }

  const tokenRes = await fetch('https://github.com/login/oauth/access_token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      client_id: process.env.OAUTH_GITHUB_CLIENT_ID,
      client_secret: process.env.OAUTH_GITHUB_CLIENT_SECRET,
      code,
    }),
  });

  const data = await tokenRes.json();

  const content = data.access_token
    ? JSON.stringify({ token: data.access_token, provider: 'github' })
    : JSON.stringify({ error: data.error_description || 'Authorization failed' });

  const status = data.access_token ? 'success' : 'error';

  res.setHeader('Content-Type', 'text/html');
  res.send(`<!DOCTYPE html><html><body><script>
    (function() {
      function sendMsg(e) {
        window.opener.postMessage(
          "authorization:github:${status}:" + ${JSON.stringify(content)},
          e.origin
        );
      }
      window.addEventListener("message", sendMsg, false);
      window.opener.postMessage("authorizing:github", "*");
    })();
  </script></body></html>`);
}
