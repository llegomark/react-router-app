import { Link } from 'react-router';
import * as schema from '~/database/schema';

export function meta() {
  return [
    { title: "Quiz App - Categories" },
    { name: "description", content: "Select a quiz category to start" },
  ];
}

export async function loader({ context }: any) {
  try {
    // Check if the table exists first by trying a simpler query
    try {
      const categories = await context.db.query.categories.findMany();
      return { categories, needsMigration: false };
    } catch (error: unknown) {
      // If there's an error about the table not existing, we need migration
      if (typeof error === 'object' && error !== null && 'toString' in error && 
          error.toString().includes("no such table")) {
        return { categories: [], needsMigration: true };
      }
      throw error; // Re-throw any other errors
    }
  } catch (error) {
    console.error("Failed to load categories:", error);
    return { categories: [], needsMigration: true };
  }
}

export default function Home({ loaderData }: any) {
  const { categories, needsMigration } = loaderData;
  
  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <h1 className="text-3xl font-bold mb-8 text-center">Quiz Categories</h1>
      
      {needsMigration ? (
        <div className="text-center p-6 bg-yellow-100 dark:bg-yellow-900 rounded-lg shadow-lg mb-6">
          <h2 className="text-xl font-bold mb-4">Database Setup Required</h2>
          <p className="mb-4">Your database needs to be migrated before using the application.</p>
          <p className="mb-6">Please run the following command in your terminal:</p>
          <div className="bg-gray-800 text-white p-3 rounded-md text-left font-mono mb-6 overflow-x-auto">
            npm run db:migrate
          </div>
          <p className="mb-4">After migration, you can seed the database with sample data:</p>
          <Link 
            to="/seed" 
            className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg inline-block cursor-pointer"
          >
            Go to Seed Page
          </Link>
        </div>
      ) : categories.length === 0 ? (
        <div className="text-center">
          <p className="mb-4">No quiz categories found. Please seed the database first.</p>
          <Link 
            to="/seed" 
            className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg inline-block cursor-pointer"
          >
            Go to Seed Page
          </Link>
        </div>
      ) : (
        <div className="grid gap-4">
          {categories.map((category: {id: number; name: string; description: string; icon: string}) => (
            <Link 
              key={category.id} 
              to={`/category/${category.id}/1`}
              className="block p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer"
            >
              <div className="flex items-center">
                <span className="text-4xl mr-4">{category.icon}</span>
                <div>
                  <h2 className="text-xl font-semibold">{category.name}</h2>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">{category.description}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}