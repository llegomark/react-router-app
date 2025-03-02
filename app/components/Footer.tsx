import { Link, href } from 'react-router';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 mt-auto">
      <div className="container mx-auto px-4 py-4 max-w-2xl">
        <div className="flex flex-col items-center">
          <nav className="mb-3">
            <ul className="flex flex-wrap justify-center gap-3">
              <li>
                <Link prefetch="render" to={href("/contact")} className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors px-2 py-1">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link prefetch="render" to={href("/payment-methods")} className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors px-2 py-1">
                  Payment Methods
                </Link>
              </li>
              <li>
                <Link prefetch="render" to={href("/refund-policy")} className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors px-2 py-1">
                  Refund Policy
                </Link>
              </li>
              <li>
                <Link prefetch="render" to={href("/privacy")} className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors px-2 py-1">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link prefetch="render" to={href("/terms")} className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors px-2 py-1">
                  Terms of Use
                </Link>
              </li>
            </ul>
          </nav>
          <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
            © {currentYear} Eduventure Web Development Services. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
