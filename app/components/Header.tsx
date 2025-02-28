// app/components/Header.tsx
import { Link } from 'react-router';
import { useState } from 'react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-white dark:bg-gray-900 shadow-sm border-b border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-4 py-5 max-w-2xl">
        {/* Desktop layout - centered logo and bottom menu */}
        <div className="hidden md:flex md:flex-col md:items-center">
          <div className="flex flex-col items-center mb-4">
            <span className="text-4xl mb-2" aria-hidden="true">🏫</span>
            <div className="text-center">
              <Link to="/" className="text-3xl font-bold text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
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
                <Link to="/" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors px-2 py-1">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/admin" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors px-2 py-1">
                  Admin
                </Link>
              </li>
              <li>
                <Link to="/seed" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors px-2 py-1">
                  Seed Database
                </Link>
              </li>
              <li>
                <a href="https://deped.gov.ph" target="_blank" rel="noopener noreferrer" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors px-2 py-1">
                  DepEd
                </a>
              </li>
            </ul>
          </nav>
        </div>

        {/* Mobile layout - left-aligned logo with hamburger */}
        <div className="md:hidden flex items-center justify-between">
          <div className="flex items-center">
            <span className="text-4xl mr-3" aria-hidden="true">🏫</span>
            <div>
              <Link to="/" className="text-3xl font-bold text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
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
                  to="/" 
                  className="block text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link 
                  to="/admin" 
                  className="block text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Admin
                </Link>
              </li>
              <li>
                <Link 
                  to="/seed" 
                  className="block text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Seed Database
                </Link>
              </li>
              <li>
                <a 
                  href="https://deped.gov.ph" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="block text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  DepEd
                </a>
              </li>
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
}