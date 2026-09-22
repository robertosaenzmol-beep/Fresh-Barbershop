export const prerender = false;

import type { APIRoute } from 'astro';

export const GET: APIRoute = () => {
  const clientId = process.env.OAUTH_GITHUB_CLIENT_ID;
  const siteUrl = 'https://freshbarbershop.es';

  if (!clientId) {
    return new Response('OAUTH_GITHUB_CLIENT_ID not configured', { status: 500 });
  }

  const url = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(siteUrl + '/api/callback')}&scope=repo,user`;

  return Response.redirect(url, 302);
};
