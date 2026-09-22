export const prerender = false;

import type { APIRoute } from 'astro';

export const GET: APIRoute = ({ redirect }) => {
  const clientId = import.meta.env.OAUTH_GITHUB_CLIENT_ID;
  const siteUrl = import.meta.env.SITE_URL || 'https://freshbarbershop.es';

  return redirect(
    `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(siteUrl + '/api/callback')}&scope=repo,user`,
    302
  );
};
