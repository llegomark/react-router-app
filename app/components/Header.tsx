import { Link, href } from 'react-router';
import { useState, useCallback } from 'react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = useCallback(() => {
    setIsMenuOpen(!isMenuOpen);
  }, [setIsMenuOpen]);

  return (
    <header className="bg-white dark:bg-gray-900 shadow-sm border-b border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-4 py-5 max-w-2xl">
        {/* Desktop layout - centered logo and bottom menu */}
        <div className="hidden md:flex md:flex-col md:items-center">
          <div className="flex flex-col items-center mb-4">
            <span className="text-4xl mb-2" aria-hidden="true">🏫</span>
            <div className="text-center">
              <Link to={href("/")} className="text-3xl font-bold text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                NQESH Reviewer
              </Link>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Empowering aspiring school leaders for excellence
              </p>
            </div>
          </div>
          <nav className="w-full">
            <ul className="flex flex-wrap justify-center gap-6">
              <li>
                <Link to={href("/")} className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors px-2 py-1">
                  Home
                </Link>
              </li>
              <li>
                <Link to={href("/reviewer")} className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors px-2 py-1">
                  Reviewer
                </Link>
              </li>
              <li>
                <Link to={href("/pricing")} className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors px-2 py-1">
                  Pricing
                </Link>
              </li>
              <li>
                <Link to={href("/faq")} className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors px-2 py-1">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to={href("/about")} className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors px-2 py-1">
                  About
                </Link>
              </li>
              <li>
                <Link to={href("/contact")} className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors px-2 py-1">
                  Contact
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        {/* Mobile layout - left-aligned logo with hamburger */}
        <div className="md:hidden flex items-center justify-between">
          <div className="flex items-center">
            <span className="text-4xl mr-3" aria-hidden="true">🏫</span>
            <div>
              <Link to={href("/")} className="text-3xl font-bold text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                NQESH Reviewer
              </Link>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Empowering aspiring school leaders for excellence
              </p>
            </div>
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
            onClick={toggleMenu}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
          >
            <span className="sr-only">Open main menu</span>
            {!isMenuOpen ? (
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            ) : (
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile menu - toggleable */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 border-t border-gray-200 dark:border-gray-800 pt-4" id="mobile-menu">
            <ul className="flex flex-col space-y-3">
              <li>
                <Link
                  to={href("/")}
                  className="block text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to={href("/reviewer")}
                  className="block text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Reviewer
                </Link>
              </li>
              <li>
                <Link
                  to={href("/pricing")}
                  className="block text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Pricing
                </Link>
              </li>
              <li>
                <Link
                  to={href("/faq")}
                  className="block text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  to={href("/about")}
                  className="block text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  to={href("/contact")}
                  className="block text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Contact
                </Link>
              </li>
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
}
