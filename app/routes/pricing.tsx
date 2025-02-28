import { Link } from 'react-router';
import type { Route } from './+types/pricing';

export const meta: Route.MetaFunction = () => {
  return [
    { title: "NQESH Reviewer - Pricing Plans" },
    { name: "description", content: "Choose the right NQESH Reviewer plan for your exam preparation needs" },
  ];
};

export default function Pricing() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 py-8 md:py-12">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 p-8 mb-8">
          <div className="text-center mb-10">
            <span className="text-4xl mb-4 inline-block">💰</span>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">Simple, Transparent Pricing</h1>
            <p className="text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
              Choose the plan that fits your needs and budget. Invest in your future as a school leader.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Free Plan */}
            <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-8 border border-gray-200 dark:border-gray-700 flex flex-col">
              <div className="mb-6">
                <span className="inline-block bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-300 font-medium py-1 px-3 rounded-full text-sm mb-3">FREE PLAN</span>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Basic Access</h2>
                <p className="text-gray-600 dark:text-gray-400 mb-4">Get started with essential review materials</p>
                <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">₱0</div>
                <p className="text-gray-600 dark:text-gray-400 text-sm">Free forever</p>
              </div>

              <ul className="space-y-3 mb-8 flex-grow">
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 dark:text-green-400 mr-2 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  <span className="text-gray-700 dark:text-gray-300">Access to 3 basic categories</span>
                </li>
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 dark:text-green-400 mr-2 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  <span className="text-gray-700 dark:text-gray-300">50 practice questions</span>
                </li>
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 dark:text-green-400 mr-2 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  <span className="text-gray-700 dark:text-gray-300">Basic performance tracking</span>
                </li>
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 dark:text-green-400 mr-2 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  <span className="text-gray-700 dark:text-gray-300">Explanations for each question</span>
                </li>
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500 dark:text-red-400 mr-2 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                  <span className="text-gray-500 dark:text-gray-400">Advanced NQESH categories</span>
                </li>
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500 dark:text-red-400 mr-2 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                  <span className="text-gray-500 dark:text-gray-400">Timed simulation exams</span>
                </li>
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500 dark:text-red-400 mr-2 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                  <span className="text-gray-500 dark:text-gray-400">AI-assisted learning tools</span>
                </li>
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500 dark:text-red-400 mr-2 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                  <span className="text-gray-500 dark:text-gray-400">Priority email support</span>
                </li>
              </ul>

              <Link
                to="/reviewer"
                className="w-full py-3 px-6 text-center bg-white dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 text-blue-600 dark:text-blue-400 font-medium border border-blue-200 dark:border-blue-800 rounded-lg transition-colors"
              >
                Get Started Free
              </Link>
            </div>

            {/* Pro Plan */}
            <div className="bg-blue-600 dark:bg-blue-800 rounded-xl p-8 border border-blue-500 dark:border-blue-700 flex flex-col relative overflow-hidden">
              <div className="absolute right-0 top-0 bg-yellow-400 text-yellow-800 text-xs font-bold px-3 py-1 transform translate-x-7 translate-y-4 rotate-45">
                BEST VALUE
              </div>
              <div className="mb-6">
                <span className="inline-block bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 font-medium py-1 px-3 rounded-full text-sm mb-3">PRO PLAN</span>
                <h2 className="text-2xl font-bold text-white mb-2">Comprehensive Access</h2>
                <p className="text-blue-100 mb-4">Complete NQESH preparation with all features</p>
                <div className="text-3xl font-bold text-white mb-1">₱1,499</div>
                <p className="text-blue-100 text-sm">One-time payment, 12 months access</p>
              </div>

              <ul className="space-y-3 mb-8 flex-grow">
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white mr-2 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  <span className="text-white">Access to ALL categories</span>
                </li>
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white mr-2 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  <span className="text-white">1,000+ practice questions</span>
                </li>
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white mr-2 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  <span className="text-white">Advanced performance analytics</span>
                </li>
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white mr-2 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  <span className="text-white">Detailed explanations with references</span>
                </li>
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white mr-2 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  <span className="text-white">All specialized NQESH categories</span>
                </li>
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white mr-2 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  <span className="text-white">Full-length simulation exams</span>
                </li>
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white mr-2 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  <span className="text-white">AI-powered study recommendations</span>
                </li>
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white mr-2 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  <span className="text-white">Priority email support</span>
                </li>
              </ul>

              <Link
                to="/payment-methods"
                className="w-full py-3 px-6 text-center bg-white dark:bg-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 text-blue-600 dark:text-blue-400 font-medium border border-white dark:border-gray-700 rounded-lg transition-colors"
              >
                Upgrade to Pro
              </Link>
            </div>
          </div>

          <div className="mt-10 pt-6 border-t border-gray-200 dark:border-gray-800 text-center">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
              Need help choosing the right plan?
            </h3>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Contact us for assistance or check our FAQ page for more information.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contact"
                className="px-5 py-2.5 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg font-medium transition-colors"
              >
                Contact Support
              </Link>
              <Link
                to="/faq"
                className="px-5 py-2.5 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg font-medium transition-colors"
              >
                View FAQ
              </Link>
              <Link
                to="/refund-policy"
                className="px-5 py-2.5 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg font-medium transition-colors"
              >
                Refund Policy
              </Link>
            </div>
          </div>
        </div>

        {/* Testimonials */}
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 p-8">
          <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-8">
            What Our Pro Users Say
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mr-4">
                  <span className="text-lg">MG</span>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white">Mary Grace Reyes</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Passed NQESH 2024</p>
                </div>
              </div>
              <p className="text-gray-700 dark:text-gray-300">
                "The Pro plan was worth every peso! The practice questions were very similar to the actual NQESH exam, and the explanations helped me understand the concepts deeply. I'm now a principal thanks to NQESH Reviewer!"
              </p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mr-4">
                  <span className="text-lg">JD</span>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white">Juan Dela Cruz</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Passed NQESH 2023</p>
                </div>
              </div>
              <p className="text-gray-700 dark:text-gray-300">
                "I tried using free materials at first but wasn't seeing progress. After upgrading to the Pro plan, the difference was night and day. The simulation exams prepared me so well for the real thing. Highly recommended!"
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}