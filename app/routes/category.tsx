import { Outlet } from 'react-router';
import type { Route } from './+types/category';

export const meta: Route.MetaFunction = ({ location }) => {
  const url = location.pathname
  const domain = "https://nqesh.com" // Use your actual domain in production
  const fullUrl = `${domain}${url}`

  return [
    { title: "NQESH Reviewer - Category" },
    { name: "description", content: "Explore different categories for the NQESH Reviewer exam preparation. Practice questions by category to focus your study." },
    { property: "og:title", content: "NQESH Reviewer - Category" },
    { property: "og:description", content: "Explore different categories for the NQESH Reviewer exam preparation. Practice questions by category to focus your study." },
    { property: "og:url", content: fullUrl },
    { property: "og:type", content: "website" },
    { property: "og:image", content: `${domain}/og-image.jpg` }, // Added OG Image
    { property: "og:image:width", content: "1200" },         // Added OG Image width
    { property: "og:image:height", content: "630" },        // Added OG Image height
    { property: "og:image:alt", content: "NQESH Reviewer Category Page" }, // Added OG Image alt
    { name: "twitter:card", content: "summary_large_image" },   // Added Twitter Card type
    { name: "twitter:site", content: "@nqeshreviewer" },      // Added Twitter site
    { name: "twitter:title", content: "NQESH Reviewer - Category" },
    { name: "twitter:description", content: "Explore different categories for the NQESH Reviewer exam preparation. Practice questions by category to focus your study." },
    { name: "twitter:image", content: `${domain}/twitter-image.jpg` }, // Added Twitter Image
    { rel: "canonical", href: fullUrl },
  ];
};

export default function CategoryLayout() {
  return <Outlet />;
}
