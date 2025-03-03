import { useState, useRef, useEffect } from 'react';
import { Link, data, href, useLocation } from 'react-router';
import type { Route } from './+types/reviewer';
import { softwareApp } from "@forge42/seo-tools/structured-data/software-app";
import { Turnstile } from '@marsidev/react-turnstile';
import type { TurnstileInstance } from '@marsidev/react-turnstile';

export const meta: Route.MetaFunction = ({ location }) => {
  const url = location.pathname
  const domain = "https://nqesh.com"
  const fullUrl = `${domain}${url}`

  return [
    { title: "Categories - NQESH Reviewer" },
    { name: "description", content: "Select a quiz category to start your NQESH review and improve your chances of passing the National Qualifying Examination for School Heads" },
    { property: "og:title", content: "Categories - NQESH Reviewer" },
    { property: "og:description", content: "Select a quiz category to start your NQESH review and improve your chances of passing the National Qualifying Examination for School Heads" },
    { property: "og:url", content: fullUrl },
    { property: "og:type", content: "website" },
    { property: "og:image", content: `${domain}/og-image.jpg` },
    { property: "og:image:width", content: "1200" },
    { property: "og:image:height", content: "630" },
    { property: "og:image:alt", content: "NQESH Reviewer Categories" },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:site", content: "@nqeshreviewer" },
    { name: "twitter:title", content: "Categories - NQESH Reviewer" },
    { name: "twitter:description", content: "Select a quiz category to start your NQESH review and improve your chances of passing the National Qualifying Examination for School Heads" },
    { name: "twitter:image", content: `${domain}/twitter-image.jpg` },
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
}

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

// Define the expected response type from Cloudflare Turnstile verification API
interface TurnstileVerificationResponse {
  success: boolean;
  "error-codes"?: string[];
  challenge_ts?: string;
  hostname?: string;
  message?: string;
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
  const [isTurnstileVerified, setIsTurnstileVerified] = useState(false);
  const [turnstileError, setTurnstileError] = useState<string | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const [redirectMessage, setRedirectMessage] = useState<string | null>(null);
  const [returnPath, setReturnPath] = useState<string | null>(null);
  const turnstileRef = useRef<TurnstileInstance | null>(null);
  const location = useLocation();

  // Check if we were redirected here from a protected page
  useEffect(() => {
    if (location.state) {
      const { redirectReason, returnPath } = location.state as {
        redirectReason?: string;
        returnPath?: string;
      };

      if (redirectReason === 'verification_required') {
        setRedirectMessage("Please complete the verification below to access the NQESH review questions");
        if (returnPath) {
          setReturnPath(returnPath);
        }
      }
    }
  }, [location]);

  // For testing purposes, check if the token is already verified
  useEffect(() => {
    // Check if redirected from another page - don't auto-verify in that case
    if (redirectMessage) {
      return;
    }

    const token = localStorage.getItem('turnstile_verified');
    if (token) {
      // If there's a token in localStorage, consider the user verified
      // This is just for testing - in production you'd want a more secure approach
      setIsTurnstileVerified(true);
    }
  }, [redirectMessage]);

  const handleTurnstileSuccess = async (token: string) => {
    try {
      setIsVerifying(true);
      console.log("Turnstile widget provided token:", token.substring(0, 10) + "...");

      // Send the token to our Worker API endpoint for verification
      const response = await fetch('/api/verify-turnstile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ token })
      });

      const outcome = await response.json() as TurnstileVerificationResponse;
      console.log("Server verification response:", outcome);

      if (outcome.success) {
        console.log("Turnstile verification successful");
        setIsTurnstileVerified(true);
        setTurnstileError(null);

        // For testing only - store verification in localStorage
        // In production, use a more secure approach like cookies with HttpOnly flag
        localStorage.setItem('turnstile_verified', 'true');

        // If we were redirected here and have a return path, navigate back after verification
        if (returnPath) {
          window.location.href = returnPath;
        }
      } else {
        console.error("Verification failed:", outcome["error-codes"]);
        const errorMsg = outcome["error-codes"]?.join(", ") || "Unknown error";
        setTurnstileError(`Verification failed: ${errorMsg}`);
        turnstileRef.current?.reset();
      }
    } catch (error) {
      console.error("Error verifying Turnstile token:", error);
      setTurnstileError("Verification error. Please try again.");
      turnstileRef.current?.reset();
    } finally {
      setIsVerifying(false);
    }
  };

  const handleTurnstileError = () => {
    console.error("Turnstile widget error");
    setTurnstileError("Widget error. Please try again.");
    turnstileRef.current?.reset();
  };

  const handleTurnstileExpire = () => {
    console.warn("Turnstile verification expired");
    setIsTurnstileVerified(false);
    setTurnstileError("Verification expired. Please try again.");
    turnstileRef.current?.reset();
  };

  const renderCategories = () => {
    if (needsMigration) {
      return (
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
      );
    } else if (categories.length === 0) {
      return (
        <div className="text-center p-8 bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800">
          <p className="mb-6 text-gray-700 dark:text-gray-300">No quiz categories found. Please seed the database first.</p>
          <Link
            to={href("/seed")}
            className="px-5 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg inline-block font-medium transition-colors cursor-pointer"
          >
            Go to Seed Page
          </Link>
        </div>
      );
    } else {
      return (
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
      );
    }
  };

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

        {!isTurnstileVerified ? (
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 p-6 mb-8">
            <div className="text-center mb-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Verify You're Human</h2>

              {redirectMessage && (
                <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg border border-blue-200 dark:border-blue-800">
                  <p className="text-blue-800 dark:text-blue-300">{redirectMessage}</p>
                </div>
              )}

              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Please complete the verification below to access the NQESH reviewer.
              </p>

              {turnstileError && (
                <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/30 rounded-lg border border-red-200 dark:border-red-800">
                  <p className="text-red-700 dark:text-red-300">{turnstileError}</p>
                </div>
              )}

              <div className="flex justify-center">
                <Turnstile
                  ref={turnstileRef}
                  siteKey="0x4AAAAAAA9N-qK7MRnEFcE8"
                  onSuccess={handleTurnstileSuccess}
                  onError={handleTurnstileError}
                  onExpire={handleTurnstileExpire}
                  options={{
                    theme: 'auto',
                    size: 'normal',
                    appearance: 'always',
                    refreshExpired: 'auto'
                  }}
                />
              </div>

              {isVerifying && (
                <div className="mt-4 text-gray-600 dark:text-gray-400">
                  <svg className="animate-spin h-5 w-5 mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <p className="mt-2">Verifying...</p>
                </div>
              )}

              <p className="text-sm text-gray-500 dark:text-gray-500 mt-6">
                This helps us protect our content from automated bots and ensure a better experience for all users.
              </p>
            </div>
          </div>
        ) : (
          renderCategories()
        )}
      </div>
    </div>
  );
}