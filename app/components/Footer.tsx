import { Link } from 'react-router';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 mt-auto">
      <div className="container mx-auto px-4 py-4 max-w-2xl">
        <div className="flex flex-col items-center">
          <nav className="mb-3">
            <ul className="flex flex-wrap justify-center gap-3">
              <li>
                <Link to="/" className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors px-2 py-1">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/admin" className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors px-2 py-1">
                  Admin
                </Link>
              </li>
              <li>
                <Link to="/seed" className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors px-2 py-1">
                  Seed Database
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors px-2 py-1">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors px-2 py-1">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors px-2 py-1">
                  Privacy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors px-2 py-1">
                  Terms
                </Link>
              </li>
              <li>
                <a 
                  href="https://deped.gov.ph" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors px-2 py-1"
                >
                  DepEd
                </a>
              </li>
            </ul>
          </nav>
          <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
            © {currentYear} NQESH Reviewer. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}