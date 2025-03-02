import { Link, data, href } from 'react-router';
import type { Route } from './+types/reviewer';
import { softwareApp } from "@forge42/seo-tools/structured-data/software-app"

export const meta: Route.MetaFunction = ({ location }) => {
  const url = location.pathname
  const domain = "https://nqesh.com" // Use your actual domain in production
  const fullUrl = `${domain}${url}`
  
  return [
    { title: "NQESH Reviewer - Categories" },
    { name: "description", content: "Select a quiz category to start your NQESH review and improve your chances of passing the National Qualifying Examination for School Heads" },
    { property: "og:title", content: "NQESH Reviewer - Categories" },
    { property: "og:description", content: "Select a quiz category to start your NQESH review and improve your chances of passing the National Qualifying Examination for School Heads" },
    { property: "og:url", content: fullUrl },
    { property: "og:type", content: "website" },
    { name: "twitter:title", content: "NQESH Reviewer - Categories" },
    { name: "twitter:description", content: "Select a quiz category to start your NQESH review and improve your chances of passing the National Qualifying Examination for School Heads" },
    { name: "twitter:card", content: "summary_large_image" },
    { rel: "canonical", href: fullUrl },
    { 
      "script:ld+json": softwareApp({
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "NQESH Reviewer",
        "applicationCategory": "EducationalApplication",
        "operatingSystem": "Any",
        "offers": {
          "@type": "Offer",
          "price": "1499.00",
          "priceCurrency": "PHP"
        },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.8",
          "ratingCount": "256"
        }
      })
    }
  ]
};

// Define proper type interfaces
interface Category {
  id: number;
  name: string;
  description: string;
  icon: string;
}

interface LoaderData {
  categories: Category[];
  needsMigration: boolean;
}

export async function loader({ context }: Route.LoaderArgs) {
  try {
    // Check if the table exists first by trying a simpler query
    try {
      const categories = await context.db.query.categories.findMany();
      return { categories, needsMigration: false } as LoaderData;
    } catch (error: unknown) {
      // If there's an error about the table not existing, we need migration
      if (typeof error === 'object' && error !== null && 'toString' in error &&
        error.toString().includes("no such table")) {
        return { categories: [], needsMigration: true } as LoaderData;
      }
      
      // Re-throw any other errors to be handled by the catch block below
      throw error;
    }
  } catch (error) {
    console.error("Failed to load categories:", error);
    // Use consistent error handling pattern by throwing a response
    throw data({ message: "Failed to load categories" }, { status: 500 });
  }
}

export default function Reviewer({ loaderData }: Route.ComponentProps) {
  const { categories, needsMigration } = loaderData as LoaderData;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 py-8 md:py-12">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 p-6 mb-8">
          <div className="text-center mb-6">
            <span className="text-4xl mb-3 inline-block">📚</span>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">NQESH Review Categories</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Select a category below to begin your review session
            </p>
          </div>
        </div>
        
        {needsMigration ? (
          <div className="text-center p-8 bg-yellow-50 dark:bg-yellow-950 rounded-xl shadow-sm border border-yellow-200 dark:border-yellow-900 mb-8">
            <h2 className="text-xl font-bold mb-4 text-yellow-800 dark:text-yellow-300">Database Setup Required</h2>
            <p className="mb-4 text-gray-700 dark:text-gray-300">Your database needs to be migrated before using the application.</p>
            <p className="mb-6 text-gray-700 dark:text-gray-300">Please run the following command in your terminal:</p>
            <div className="bg-gray-900 text-gray-200 p-4 rounded-lg text-left font-mono mb-6 overflow-x-auto">
              npm run db:migrate
            </div>
            <p className="mb-4 text-gray-700 dark:text-gray-300">After migration, you can seed the database with sample data:</p>
            <Link 
              to={href("/seed")}
              className="px-5 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg inline-block font-medium transition-colors"
            >
              Go to Seed Page
            </Link>
          </div>
        ) : categories.length === 0 ? (
          <div className="text-center p-8 bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800">
            <p className="mb-6 text-gray-700 dark:text-gray-300">No quiz categories found. Please seed the database first.</p>
            <Link 
              to={href("/seed")} 
              className="px-5 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg inline-block font-medium transition-colors cursor-pointer"
            >
              Go to Seed Page
            </Link>
          </div>
        ) : (
          <div className="grid gap-4">
            {categories.map((category: Category) => (
              <Link
                key={category.id}
                to={href("/category/:categoryId/:questionId", { categoryId: String(category.id), questionId: "1" })}
                className="block p-6 bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 hover:shadow-md hover:border-blue-200 dark:hover:border-blue-800 transition-all duration-300 cursor-pointer"
              >
                <div className="flex items-center">
                  <span className="text-5xl mr-5">{category.icon}</span>
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">{category.name}</h2>
                    <p className="text-gray-600 dark:text-gray-400">{category.description}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}