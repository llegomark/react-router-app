import { getLoadContext } from "load-context";
import { createRequestHandler } from "react-router";
import { drizzle } from "drizzle-orm/d1";
import * as schema from "../database/schema";

const requestHandler = createRequestHandler(
  // @ts-expect-error - virtual module provided by React Router at build time
  () => import("virtual:react-router/server-build"),
  import.meta.env.MODE
);

async function generateSitemap(env: CloudflareEnvironment): Promise<string> {
  const db = drizzle(env.DB, { schema });

  // Fetch all categories and questions from the database
  const categories = await db.query.categories.findMany();
  const questions = await db.query.questions.findMany();

  const baseUrl = "https://nqesh.com";

  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

  // Add homepage
  sitemap += `
    <url>
      <loc>${baseUrl}</loc>
      <changefreq>daily</changefreq>
      <priority>1.0</priority>
    </url>`;

  // Add about page
  sitemap += `
    <url>
      <loc>${baseUrl}/about</loc>
      <changefreq>monthly</changefreq>
      <priority>0.8</priority>
    </url>`;

  // Add contact page
  sitemap += `
    <url>
      <loc>${baseUrl}/contact</loc>
      <changefreq>monthly</changefreq>
      <priority>0.5</priority>
    </url>`;

  // Add pricing page
  sitemap += `
    <url>
      <loc>${baseUrl}/pricing</loc>
      <changefreq>monthly</changefreq>
      <priority>0.7</priority>
    </url>`;

  // Add FAQ page
  sitemap += `
    <url>
      <loc>${baseUrl}/faq</loc>
      <changefreq>monthly</changefreq>
      <priority>0.6</priority>
    </url>`;

  // Add reviewer page
  sitemap += `
    <url>
      <loc>${baseUrl}/reviewer</loc>
      <changefreq>daily</changefreq>
      <priority>0.9</priority>
    </url>`;

  // Add deped-order page
  sitemap += `
    <url>
      <loc>${baseUrl}/deped-order</loc>
      <changefreq>weekly</changefreq>
      <priority>0.6</priority>
    </url>`;

  // Add payment-methods page
  sitemap += `
    <url>
      <loc>${baseUrl}/payment-methods</loc>
      <changefreq>monthly</changefreq>
      <priority>0.4</priority>
    </url>`;

  // Add refund-policy page
  sitemap += `
    <url>
      <loc>${baseUrl}/refund-policy</loc>
      <changefreq>monthly</changefreq>
      <priority>0.4</priority>
    </url>`;

  // Add privacy page
  sitemap += `
    <url>
      <loc>${baseUrl}/privacy</loc>
      <changefreq>monthly</changefreq>
      <priority>0.3</priority>
    </url>`;

  // Add terms page
  sitemap += `
    <url>
      <loc>${baseUrl}/terms</loc>
      <changefreq>monthly</changefreq>
      <priority>0.3</priority>
    </url>`;

  // Add categories
  for (const category of categories) {
    sitemap += `
      <url>
        <loc>${baseUrl}/category/${category.id}</loc>
        <changefreq>daily</changefreq>
        <priority>0.8</priority>
      </url>`;

    // Add questions for each category
    const categoryQuestions = questions.filter(
      (question) => question.categoryId === category.id
    );
    for (const question of categoryQuestions) {
      sitemap += `
        <url>
          <loc>${baseUrl}/category/${category.id}/${question.id}</loc>
          <changefreq>daily</changefreq>
          <priority>1.0</priority>
        </url>`;
    }

    // Add results page for each category
    sitemap += `
      <url>
        <loc>${baseUrl}/category/${category.id}/results</loc>
        <changefreq>never</changefreq>
        <priority>0.5</priority>
      </url>`;
  }

  sitemap += `
  </urlset>`;

  return sitemap;
}

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    // Handle trailing slash redirects
    if (url.pathname.length > 1 && url.pathname.endsWith('/')) {
      // Remove trailing slash (except for root path)
      url.pathname = url.pathname.slice(0, -1);

      // Create redirect response
      return new Response(null, {
        status: 301,
        headers: {
          'Location': url.toString(),
          'Cache-Control': 'max-age=3600'
        }
      });
    }

    // Handle sitemap.xml requests
    if (url.pathname === "/sitemap.xml") {
      try {
        const sitemap = await generateSitemap(env);
        return new Response(sitemap, {
          headers: {
            "Content-Type": "application/xml",
            "Cache-Control": "max-age=3600", // Cache for 1 hour (reduced due to daily update)
          },
        });
      } catch (error) {
        console.error("Failed to generate sitemap:", error);
        return new Response("Sitemap generation failed", { status: 500 });
      }
    }

    const loadContext = getLoadContext({
      request,
      context: { cloudflare: { env, ctx } },
    });
    return requestHandler(request, loadContext);
  },
} satisfies ExportedHandler<CloudflareEnvironment>;
