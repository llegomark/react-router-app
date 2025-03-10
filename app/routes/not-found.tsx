import { Link, href } from 'react-router';
import type { Route } from './+types/not-found';

export const meta: Route.MetaFunction = ({ location }) => {
  const url = location.pathname
  const domain = "https://nqesh.com"
  const fullUrl = `${domain}${url}`

  return [
    { title: "404 Page Not Found - NQESH Reviewer" },
    { name: "description", content: "Oops! The page you are looking for could not be found on NQESH Reviewer. Please check the URL or return to the homepage." },
    { property: "og:title", content: "404 Page Not Found - NQESH Reviewer" },
    { property: "og:description", content: "Oops! The page you are looking for could not be found on NQESH Reviewer. Please check the URL or return to the homepage." },
    { property: "og:url", content: fullUrl },
    { property: "og:type", content: "website" },
    { property: "og:image", content: `${domain}/og-image.jpg` },
    { property: "og:image:width", content: "1200" },
    { property: "og:image:height", content: "630" },
    { property: "og:image:alt", content: "NQESH Reviewer 404 Error Page" },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:site", content: "@nqeshreviewer" },
    { name: "twitter:title", content: "404 Page Not Found - NQESH Reviewer" },
    { name: "twitter:description", content: "Oops! The page you are looking for could not be found on NQESH Reviewer. Please check the URL or return to the homepage." },
    { name: "twitter:image", content: `${domain}/twitter-image.jpg` },
    { rel: "canonical", href: fullUrl },
  ];
};


export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex flex-col items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 p-10 max-w-md w-full text-center">
        <div className="text-9xl font-bold text-gray-200 dark:text-gray-800 mb-6">404</div>
        
        <h1 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Page Not Found</h1>
        
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        
        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <Link 
            to={href("/")}
            className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
          >
            Go to Home
          </Link>
          
          <button
            onClick={() => window.history.back()}
            className="px-6 py-2.5 bg-gray-500 hover:bg-gray-600 text-white rounded-lg font-medium transition-colors cursor-pointer"
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
}
