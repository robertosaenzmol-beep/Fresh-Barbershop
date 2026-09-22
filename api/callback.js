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

  const status = data.access_token ? 'success' : 'error';
  const content = data.access_token
    ? { token: data.access_token, provider: 'github' }
    : { error: data.error_description || 'Authorization failed' };

  const script = `
    <script>
      (function() {
        var status = ${JSON.stringify(status)};
        var content = ${JSON.stringify(content)};
        var msg = "authorization:github:" + status + ":" + JSON.stringify(content);

        function sendMsg(e) {
          window.opener.postMessage(msg, e.origin);
        }

        window.addEventListener("message", sendMsg, false);
        window.opener.postMessage("authorizing:github", "*");
      })();
    </script>
  `;

  res.setHeader('Content-Type', 'text/html');
  res.send('<!DOCTYPE html><html><body>' + script + '</body></html>');
}
