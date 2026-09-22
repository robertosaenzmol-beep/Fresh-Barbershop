export default function handler(req, res) {
  const clientId = process.env.OAUTH_GITHUB_CLIENT_ID;
  const siteUrl = process.env.SITE_URL || 'https://freshbarbershop.es';

  res.redirect(
    `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(siteUrl + '/api/callback')}&scope=repo,user`
  );
}
