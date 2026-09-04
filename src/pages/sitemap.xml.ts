import { getCollection } from 'astro:content';

const SITE = 'https://fresh-barbershop.vercel.app';

export async function GET() {
  const posts = await getCollection('blog');

  const staticPages = [
    { loc: '/', changefreq: 'monthly', priority: '1.0' },
    { loc: '/blog/', changefreq: 'weekly', priority: '0.8' },
    { loc: '/aviso-legal/', changefreq: 'yearly', priority: '0.2' },
    { loc: '/politica-de-privacidad/', changefreq: 'yearly', priority: '0.2' },
    { loc: '/politica-de-cookies/', changefreq: 'yearly', priority: '0.2' },
  ];

  const blogPages = posts.map((post) => ({
    loc: `/blog/${post.slug}/`,
    changefreq: 'monthly',
    priority: '0.7',
    lastmod: post.data.date.toISOString().split('T')[0],
  }));

  const allPages = [...staticPages, ...blogPages];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages
  .map(
    (p) => `  <url>
    <loc>${SITE}${p.loc}</loc>
    <changefreq>${p.changefreq}</changefreq>
    <priority>${p.priority}</priority>${p.lastmod ? `\n    <lastmod>${p.lastmod}</lastmod>` : ''}
  </url>`
  )
  .join('\n')}
</urlset>`;

  return new Response(xml, {
    headers: { 'Content-Type': 'application/xml' },
  });
}
