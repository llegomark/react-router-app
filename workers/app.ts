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

function generateRobotsTxt(baseUrl: string): string {
  return `User-agent: *
Disallow: /

Sitemap: ${baseUrl}/sitemap.xml`;
}

// Define types for Cloudflare Turnstile API responses
interface TurnstileVerificationResponse {
  success: boolean;
  challenge_ts?: string;
  hostname?: string;
  "error-codes"?: string[];
  action?: string;
  cdata?: string;
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

    // Handle robots.txt requests
    if (url.pathname === "/robots.txt") {
      const robotsTxt = generateRobotsTxt(url.origin);
      return new Response(robotsTxt, {
        headers: {
          "Content-Type": "text/plain",
          "Cache-Control": "max-age=86400", // Cache for 24 hours
        },
      });
    }

    // Handle CORS preflight requests for the verification endpoint
    if (request.method === 'OPTIONS' && url.pathname === '/api/verify-turnstile') {
      return new Response(null, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
          'Access-Control-Max-Age': '86400'
        }
      });
    }

    // Handle Turnstile verification API endpoint
    if (url.pathname === "/api/verify-turnstile") {
      // Only allow POST requests for verification
      if (request.method !== 'POST') {
        return new Response(JSON.stringify({ 
          success: false, 
          "error-codes": ["bad-request"]
        }), {
          status: 405,
          headers: {
            'Content-Type': 'application/json',
            'Allow': 'POST',
            'Access-Control-Allow-Origin': '*'
          }
        });
      }

      try {
        console.log("Processing Turnstile verification request");
        
        // Get the Cloudflare Turnstile secret key
        // This is the demo secret key that will always pass verification for testing
        const SECRET_KEY = env.TURNSTILE_SECRET_KEY || "1x0000000000000000000000000000000AA";
        
        if (!SECRET_KEY) {
          console.error('Missing TURNSTILE_SECRET_KEY environment variable');
          return new Response(JSON.stringify({ 
            success: false, 
            "error-codes": ["missing-input-secret"]
          }), {
            status: 400,
            headers: { 
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': '*' 
            }
          });
        }

        // Parse request body based on content type
        let token = '';
        const contentType = request.headers.get('content-type') || '';
        
        if (contentType.includes('application/json')) {
          const body = await request.json() as { token?: string };
          token = body.token || '';
          console.log("Received JSON request with token:", token.substring(0, 10) + "...");
        } else if (contentType.includes('application/x-www-form-urlencoded') || 
                  contentType.includes('multipart/form-data')) {
          const formData = await request.formData();
          token = formData.get('token') as string || formData.get('response') as string || '';
          console.log("Received form data with token:", token.substring(0, 10) + "...");
        } else {
          // Fallback to query parameters
          token = url.searchParams.get('token') || '';
          console.log("Using URL parameter for token:", token.substring(0, 10) + "...");
        }

        if (!token) {
          console.error("No token provided in request");
          return new Response(JSON.stringify({ 
            success: false, 
            "error-codes": ["missing-input-response"]
          }), {
            status: 400,
            headers: { 
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': '*' 
            }
          });
        }

        // Get the visitor's IP address
        const ip = request.headers.get('CF-Connecting-IP') || '';
        console.log("Visitor IP:", ip);

        // Create form data for validation exactly as shown in Cloudflare docs
        let formData = new FormData();
        formData.append('secret', SECRET_KEY);
        formData.append('response', token);
        if (ip) {
          formData.append('remoteip', ip);
        }
        
        console.log("Sending verification request to Cloudflare Turnstile");
        
        // Make the verification request to Cloudflare
        const result = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
          body: formData,
          method: 'POST',
        });
        
        // Parse the response
        const outcome = await result.json() as TurnstileVerificationResponse;
        console.log("Verification response:", JSON.stringify(outcome));
        
        // Return the verification result with CORS headers
        return new Response(JSON.stringify(outcome), {
          status: outcome.success ? 200 : 400,
          headers: { 
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type'
          }
        });
        
      } catch (error) {
        console.error('Error processing verification request:', error);
        
        return new Response(JSON.stringify({ 
          success: false, 
          "error-codes": ["internal-error"]
        }), {
          status: 500,
          headers: { 
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type'
          }
        });
      }
    }

    // Handle all other requests with the React Router handler
    const loadContext = getLoadContext({
      request,
      context: { cloudflare: { env, ctx } },
    });
    return requestHandler(request, loadContext);
  },
} satisfies ExportedHandler<CloudflareEnvironment>;