import { Link, href } from 'react-router';
import type { Route } from './+types/index';

export const meta: Route.MetaFunction = () => {
  return [
    { title: "NQESH Reviewer - Prepare for the National Qualifying Examination for School Heads" },
    { name: "description", content: "Comprehensive preparation platform for the National Qualifying Examination for School Heads in the Philippines" },
  ];
};

export default function Landing() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 py-8 md:py-12">
      <div className="container mx-auto px-4 max-w-5xl">
        {/* Hero Section */}
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 overflow-hidden mb-8">
          <div className="flex flex-col md:flex-row">
            <div className="md:w-3/5 p-8 md:p-12">
              <div className="flex items-center mb-6">
                <span className="text-4xl mr-3">🏫</span>
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">NQESH Reviewer</h1>
              </div>
              <p className="text-lg md:text-xl font-medium mb-4 text-blue-600 dark:text-blue-400">
                Empowering Aspiring School Leaders for Excellence
              </p>
              <p className="text-gray-700 dark:text-gray-300 mb-6">
                Prepare effectively for the National Qualifying Examination for School Heads with our comprehensive review platform designed specifically for Filipino educators seeking leadership positions.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  to={href("/reviewer")}
                  className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors text-center"
                >
                  Start Reviewing
                </Link>
                <Link 
                  to={href("/about")}
                  className="px-6 py-3 bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg font-medium transition-colors text-center"
                >
                  Learn More
                </Link>
              </div>
            </div>
            <div className="md:w-2/5 bg-blue-50 dark:bg-blue-950 p-6 md:p-10 flex items-center justify-center">
              <div className="text-center">
                <span className="text-8xl mb-6 inline-block">📚</span>
                <div className="bg-white dark:bg-gray-900 rounded-lg p-4 shadow-sm">
                  <p className="font-medium text-gray-900 dark:text-white mb-1">Covering All NQESH Domains</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">With detailed explanations and reliable references</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="mb-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 p-6">
            <div className="flex items-center mb-4">
              <span className="text-3xl mr-3">📋</span>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Comprehensive Content</h2>
            </div>
            <p className="text-gray-700 dark:text-gray-300">
              Access questions and materials covering all domains required for the NQESH examination, meticulously researched and updated.
            </p>
          </div>
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 p-6">
            <div className="flex items-center mb-4">
              <span className="text-3xl mr-3">⏱️</span>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Timed Practice</h2>
            </div>
            <p className="text-gray-700 dark:text-gray-300">
              Practice under exam-like conditions with our timed quizzes, helping you build the speed and confidence needed for the actual examination.
            </p>
          </div>
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 p-6">
            <div className="flex items-center mb-4">
              <span className="text-3xl mr-3">📱</span>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Mobile-Friendly</h2>
            </div>
            <p className="text-gray-700 dark:text-gray-300">
              Study anytime, anywhere with our responsive design that works perfectly on desktops, tablets, and mobile phones.
            </p>
          </div>
        </div>

        {/* Testimonial/Info Section */}
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 p-8 mb-8">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Why Choose NQESH Reviewer?</h2>
            <p className="text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
              Our platform is developed by educational experts with a deep understanding of the NQESH requirements and the Philippine educational system.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex">
              <div className="mr-4 text-green-600 dark:text-green-400">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                  <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Research-Based Content</h3>
                <p className="text-gray-700 dark:text-gray-300">Questions aligned with the latest NQESH framework, DepEd orders, and educational policies.</p>
              </div>
            </div>
            <div className="flex">
              <div className="mr-4 text-green-600 dark:text-green-400">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                  <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Detailed Explanations</h3>
                <p className="text-gray-700 dark:text-gray-300">Every question comes with comprehensive explanations and reliable references for deeper understanding.</p>
              </div>
            </div>
            <div className="flex">
              <div className="mr-4 text-green-600 dark:text-green-400">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                  <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Categories for Focused Learning</h3>
                <p className="text-gray-700 dark:text-gray-300">Study specific areas of the exam with our organized category system for targeted preparation.</p>
              </div>
            </div>
            <div className="flex">
              <div className="mr-4 text-green-600 dark:text-green-400">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                  <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Performance Tracking</h3>
                <p className="text-gray-700 dark:text-gray-300">Monitor your progress and identify areas for improvement with our results analysis.</p>
              </div>
            </div>
          </div>
          <div className="mt-8 text-center">
            <Link 
              to="/reviewer" 
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors inline-block"
            >
              Start Your NQESH Preparation
            </Link>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-blue-600 dark:bg-blue-800 rounded-xl shadow-sm p-8 text-center text-white">
          <h2 className="text-2xl font-bold mb-4">Ready to Excel in Your NQESH Journey?</h2>
          <p className="mb-6 max-w-2xl mx-auto">
            Join thousands of aspiring school leaders who have successfully prepared for the NQESH examination with our comprehensive reviewer.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link 
              to="/reviewer" 
              className="px-6 py-3 bg-white text-blue-600 hover:bg-gray-100 rounded-lg font-medium transition-colors"
            >
              Start Reviewing Now
            </Link>
            <Link 
              to="/contact" 
              className="px-6 py-3 bg-blue-700 hover:bg-blue-800 text-white border border-blue-500 rounded-lg font-medium transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}