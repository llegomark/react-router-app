import { getLoadContext } from "load-context";
import { createRequestHandler } from "react-router";

const requestHandler = createRequestHandler(
  // @ts-expect-error - virtual module provided by React Router at build time
  () => import("virtual:react-router/server-build"),
  import.meta.env.MODE
);

export default {
  fetch(request, env, ctx) {
    // Handle trailing slash redirects
    const url = new URL(request.url);

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

    const loadContext = getLoadContext({
      request,
      context: { cloudflare: { env, ctx } },
    });
    return requestHandler(request, loadContext);
  },
} satisfies ExportedHandler<CloudflareEnvironment>;