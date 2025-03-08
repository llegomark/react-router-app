import { useState } from 'react';
import { Link, href } from 'react-router';
import { organization } from "@forge42/seo-tools/structured-data/organization";
import type { Route } from './+types/index';

// Define question interface for type safety
interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

// Sample question for the showcase
const sampleQuestions: QuizQuestion[] = [
  {
    question: "You are a newly appointed school head in a school with a history of low academic performance. Initial data suggests poor teacher morale and a lack of clear direction. Which leadership approach would be MOST effective in initiating positive change?",
    options: [
      "Autocratic leadership, to quickly establish control and order.",
      "Laissez-faire leadership, to empower teachers to find their own solutions.",
      "Transformational leadership, to inspire and motivate teachers towards a shared vision.",
      "Transactional leadership, to focus on immediate rewards and punishments for performance.",
    ],
    correctAnswer: 2,
    explanation: "Transformational leadership focuses on inspiring and motivating followers to achieve significant outcomes and organizational change, which is crucial in a school needing improvement in morale and direction."
  },
  {
    question: "During a faculty meeting, teachers express frustration about unclear communication channels and inconsistent implementation of school policies. As the school head, what initial step should you take to address this issue?",
    options: [
      "Immediately revise all school policies and communication protocols.",
      "Form a committee to investigate the source of communication breakdown.",
      "Facilitate an open forum to discuss communication challenges and collaboratively develop solutions.",
      "Issue a memo reminding everyone to adhere to existing policies and communication channels.",
    ],
    correctAnswer: 2,
    explanation: "Facilitating an open forum promotes collaboration and shared ownership in identifying and resolving communication issues. It encourages teachers to voice their concerns and contribute to solutions."
  }
];

export const meta: Route.MetaFunction = ({ location }) => {
  const url = location.pathname;
  const domain = "https://nqesh.com";
  const fullUrl = `${domain}${url}`;
  
  return [
    { title: "Prepare for the National Qualifying Examination for School Heads (NQESH) - NQESH Reviewer" },
    { name: "description", content: "Comprehensive preparation platform for the National Qualifying Examination for School Heads in the Philippines" },
    { property: "og:title", content: "Prepare for the National Qualifying Examination for School Heads (NQESH) - NQESH Reviewer" },
    { property: "og:description", content: "Comprehensive preparation platform for the National Qualifying Examination for School Heads in the Philippines" },
    { property: "og:url", content: fullUrl },
    { property: "og:type", content: "website" },
    { property: "og:image", content: `${domain}/og-image.jpg` },
    { property: "og:image:width", content: "1200" },
    { property: "og:image:height", content: "630" },
    { property: "og:image:alt", content: "NQESH Reviewer" },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:site", content: "@nqeshreviewer" },
    { name: "twitter:title", content: "Prepare for the National Qualifying Examination for School Heads (NQESH) - NQESH Reviewer" },
    { name: "twitter:description", content: "Comprehensive preparation platform for the National Qualifying Examination for School Heads" },
    { name: "twitter:image", content: `${domain}/twitter-image.jpg` },
    { rel: "canonical", href: fullUrl },
    { 
      "script:ld+json": organization({
        "@context": "https://schema.org",
        "@type": "Organization",
        "url": "https://nqesh.com",
        "sameAs": [
          "https://facebook.com/nqeshreviewer", 
          "https://twitter.com/nqeshreviewer"
        ],
        "logo": "https://nqesh.com/logo.png",
        "name": "NQESH Reviewer",
        "description": "Comprehensive preparation platform for the National Qualifying Examination for School Heads in the Philippines",
        "email": "support@nqesh.com",
        "telephone": "+63-926-021-1602"
      })
    }
  ];
};

function QuestionShowcase({ question }: { question: QuizQuestion }) {
  // Wrap useState in a try-catch to handle potential React initialization errors
  let selectedAnswerState;
  try {
    selectedAnswerState = useState<number | null>(null);
  } catch (error) {
    console.error("Error initializing React hook:", error);
    return (
      <div className="bg-red-50 dark:bg-red-900 p-6 rounded-xl text-red-800 dark:text-red-200">
        There was an error loading this component. Please refresh the page.
      </div>
    );
  }
  
  const [selectedAnswer, setSelectedAnswer] = selectedAnswerState;
  const hasAnswered = selectedAnswer !== null;
  
  const handleAnswerSelect = (optionIndex: number) => {
    if (!hasAnswered) {
      setSelectedAnswer(optionIndex);
    }
  };
  
  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 p-6">
      <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">{question.question}</h3>
      
      <div className="space-y-3 mb-6">
        {question.options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleAnswerSelect(index)}
            disabled={hasAnswered}
            className={`w-full text-left p-4 rounded-lg border transition-colors ${
              hasAnswered
                ? index === question.correctAnswer
                  ? 'bg-green-50 dark:bg-green-950 border-green-500 text-green-900 dark:text-green-300'
                  : index === selectedAnswer
                    ? 'bg-red-50 dark:bg-red-950 border-red-500 text-red-900 dark:text-red-300'
                    : 'bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300'
                : 'bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
            }`}
          >
            {option}
          </button>
        ))}
      </div>
      
      {hasAnswered && (
        <div className="p-4 bg-blue-50 dark:bg-blue-950 rounded-lg border border-blue-200 dark:border-blue-900">
          <h4 className="font-semibold mb-2 text-blue-900 dark:text-blue-300">Explanation:</h4>
          <p className="text-gray-700 dark:text-gray-300">{question.explanation}</p>
        </div>
      )}
    </div>
  );
}

export default function Landing() {
  // Wrap useState in a try-catch to handle potential React initialization errors
  let currentQuestionIndexState;
  try {
    currentQuestionIndexState = useState(0);
  } catch (error) {
    console.error("Error initializing React hook:", error);
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 py-8 md:py-12">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="bg-red-50 dark:bg-red-900 p-6 rounded-xl text-red-800 dark:text-red-200 text-center">
            <h1 className="text-2xl font-bold mb-4">Application Error</h1>
            <p>There was an error loading this page. Please refresh the browser.</p>
            <button 
              onClick={() => window.location.reload()}
              className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 cursor-pointer"
            >
              Refresh Page
            </button>
          </div>
        </div>
      </div>
    );
  }
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = currentQuestionIndexState;

  const nextQuestion = () => {
    setCurrentQuestionIndex((prevIndex) => 
      (prevIndex + 1) % sampleQuestions.length
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 py-8 md:py-12">
      <div className="container mx-auto px-4 max-w-5xl">
        {/* Enhanced Hero Section with gradient background */}
        <div className="bg-gradient-to-br from-blue-600 to-blue-800 dark:from-blue-800 dark:to-blue-950 rounded-xl shadow-lg overflow-hidden mb-12">
          <div className="p-8 md:p-12">
            <div className="flex flex-col items-center text-center mb-8">
              <span className="text-6xl mb-6">🏫</span>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">NQESH Reviewer</h1>
              <p className="text-xl font-medium mb-4 text-blue-100">
                Empower Your Journey to Educational Leadership
              </p>
              <p className="text-blue-100 mb-8 max-w-2xl">
                Prepare effectively for the National Qualifying Examination for School Heads 
                with our comprehensive review platform designed specifically for Filipino 
                educators seeking leadership positions.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  to={href("/reviewer")}
                  className="px-8 py-4 bg-white hover:bg-gray-100 text-blue-600 font-bold rounded-lg transition-colors text-center shadow-md"
                >
                  Start Reviewing Now
                </Link>
                <Link 
                  to={href("/about")}
                  className="px-8 py-4 bg-blue-700 hover:bg-blue-600 text-white rounded-lg font-bold transition-colors text-center border border-blue-500"
                >
                  Learn More
                </Link>
              </div>
            </div>
            
            {/* Stats Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-12">
              <div className="bg-white/10 rounded-lg p-4 text-center">
                <div className="text-3xl font-bold text-white mb-1">7,000+</div>
                <div className="text-blue-100">Educators Prepared</div>
              </div>
              <div className="bg-white/10 rounded-lg p-4 text-center">
                <div className="text-3xl font-bold text-white mb-1">1,000+</div>
                <div className="text-blue-100">Practice Questions</div>
              </div>
              <div className="bg-white/10 rounded-lg p-4 text-center">
                <div className="text-3xl font-bold text-white mb-1">85%</div>
                <div className="text-blue-100">Pass Rate</div>
              </div>
            </div>
          </div>
        </div>

                  {/* Interactive Question Showcase */}
        <div className="mb-12">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">Try a Sample Question</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-8">
              Experience the NQESH reviewer firsthand. Select an answer to see the explanation!
            </p>
          </div>
          
          <div className="mb-6">
            {/* Adding a key prop that changes with currentQuestionIndex to reset component state */}
            <QuestionShowcase 
              key={currentQuestionIndex} 
              question={sampleQuestions[currentQuestionIndex]} 
            />
          </div>
          
          <div className="text-center">
            <button 
              onClick={nextQuestion}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors inline-flex items-center cursor-pointer"
            >
              <span>Try Another Question</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14"></path>
                <path d="m12 5 7 7-7 7"></path>
              </svg>
            </button>
          </div>
        </div>

        {/* Enhanced Features Section */}
        <div className="mb-12">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">Why Choose NQESH Reviewer</h2>
            <p className="text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
              Our platform is developed by educational experts with a deep understanding 
              of the NQESH requirements and the Philippine educational system.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 p-6 hover:shadow-md transition-shadow">
              <div className="bg-blue-50 dark:bg-blue-950 w-14 h-14 rounded-xl flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-blue-600 dark:text-blue-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Comprehensive Content</h3>
              <p className="text-gray-700 dark:text-gray-300">
                Access questions and materials covering all domains required for the NQESH examination, meticulously researched and updated.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 p-6 hover:shadow-md transition-shadow">
              <div className="bg-blue-50 dark:bg-blue-950 w-14 h-14 rounded-xl flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-blue-600 dark:text-blue-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <polyline points="12 6 12 12 16 14"></polyline>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Timed Practice</h3>
              <p className="text-gray-700 dark:text-gray-300">
                Practice under exam-like conditions with our timed quizzes, helping you build the speed and confidence needed for the actual examination.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 p-6 hover:shadow-md transition-shadow">
              <div className="bg-blue-50 dark:bg-blue-950 w-14 h-14 rounded-xl flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-blue-600 dark:text-blue-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                  <line x1="8" y1="21" x2="16" y2="21"></line>
                  <line x1="12" y1="17" x2="12" y2="21"></line>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Mobile-Friendly</h3>
              <p className="text-gray-700 dark:text-gray-300">
                Study anytime, anywhere with our responsive design that works perfectly on desktops, tablets, and mobile phones.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 p-6 hover:shadow-md transition-shadow">
              <div className="bg-blue-50 dark:bg-blue-950 w-14 h-14 rounded-xl flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-blue-600 dark:text-blue-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="12" y1="2" x2="12" y2="6"></line>
                  <line x1="12" y1="18" x2="12" y2="22"></line>
                  <line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line>
                  <line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line>
                  <line x1="2" y1="12" x2="6" y2="12"></line>
                  <line x1="18" y1="12" x2="22" y2="12"></line>
                  <line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line>
                  <line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Detailed Explanations</h3>
              <p className="text-gray-700 dark:text-gray-300">
                Every question comes with comprehensive explanations and reliable references for deeper understanding of concepts.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 p-6 hover:shadow-md transition-shadow">
              <div className="bg-blue-50 dark:bg-blue-950 w-14 h-14 rounded-xl flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-blue-600 dark:text-blue-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="22 12 16 12 14 15 10 15 8 12 2 12"></polyline>
                  <path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Organized Categories</h3>
              <p className="text-gray-700 dark:text-gray-300">
                Study specific areas of the exam with our organized category system for targeted preparation and improved learning.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 p-6 hover:shadow-md transition-shadow">
              <div className="bg-blue-50 dark:bg-blue-950 w-14 h-14 rounded-xl flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-blue-600 dark:text-blue-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 20h9"></path>
                  <path d="M12 4h9"></path>
                  <path d="M12 12h9"></path>
                  <path d="M3 20l2-2 2 2"></path>
                  <path d="M3 4l2 2 2-2"></path>
                  <path d="M3 12l2-2 2 2"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Performance Tracking</h3>
              <p className="text-gray-700 dark:text-gray-300">
                Monitor your progress and identify areas for improvement with our results analysis and performance metrics.
              </p>
            </div>
          </div>
        </div>

        {/* Testimonials Section */}
        <div className="mb-12 bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 overflow-hidden">
          <div className="p-8">
            <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-8">
              What Our Users Say
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
                <div className="flex items-center mb-4">
                  <div className="h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-xl font-bold text-blue-600 dark:text-blue-400 mr-4">
                    MR
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white">Maria Reyes</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Passed NQESH 2023</p>
                  </div>
                </div>
                <p className="text-gray-700 dark:text-gray-300 italic">
                  "NQESH Reviewer was instrumental in my success. The comprehensive question bank and detailed explanations helped me understand complex concepts. I recommend it to all aspiring school heads!"
                </p>
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
                <div className="flex items-center mb-4">
                  <div className="h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-xl font-bold text-blue-600 dark:text-blue-400 mr-4">
                    JD
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white">Juan Dela Cruz</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">School Principal</p>
                  </div>
                </div>
                <p className="text-gray-700 dark:text-gray-300 italic">
                  "The timed practice tests were exactly what I needed to build my confidence. The platform's user-friendly interface made studying efficient and effective. Now I'm leading my own school!"
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced CTA Section with gradient background */}
        <div className="bg-gradient-to-br from-blue-600 to-blue-800 dark:from-blue-800 dark:to-blue-950 rounded-xl shadow-sm p-10 text-center">
          <h2 className="text-3xl font-bold mb-4 text-white">Ready to Excel in Your NQESH Journey?</h2>
          <p className="mb-8 max-w-2xl mx-auto text-blue-100">
            Join thousands of aspiring school leaders who have successfully prepared for the NQESH examination with our comprehensive reviewer.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link 
              to="/reviewer" 
              className="px-8 py-4 bg-white text-blue-600 hover:bg-gray-100 rounded-lg font-bold transition-colors shadow-lg"
            >
              Start Reviewing Now
            </Link>
            <Link 
              to="/pricing" 
              className="px-8 py-4 bg-blue-700 hover:bg-blue-600 text-white border border-blue-500 rounded-lg font-bold transition-colors"
            >
              View Pricing Plans
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}