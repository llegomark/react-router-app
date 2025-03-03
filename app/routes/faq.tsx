import { faq } from "@forge42/seo-tools/structured-data/faq"
import { useState } from 'react';
import { Link, href } from 'react-router';
import type { Route } from './+types/faq';

export const meta: Route.MetaFunction = ({ location }) => {
  const url = location.pathname
  const domain = "https://nqesh.com" // Use your actual domain in production
  const fullUrl = `${domain}${url}`

  return [
    { title: "Frequently Asked Questions (FAQ) - NQESH Reviewer" },
    { name: "description", content: "Find answers to common questions about the NQESH Reviewer platform and the National Qualifying Examination for School Heads" },
    { property: "og:title", content: "Frequently Asked Questions (FAQ) - NQESH Reviewer" },
    { property: "og:description", content: "Find answers to common questions about the NQESH Reviewer platform and the National Qualifying Examination for School Heads" },
    { property: "og:url", content: fullUrl },
    { property: "og:type", content: "website" },
    { property: "og:image", content: `${domain}/og-image.jpg` },
    { property: "og:image:width", content: "1200" },
    { property: "og:image:height", content: "630" },
    { property: "og:image:alt", content: "NQESH Reviewer FAQ" },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:site", content: "@nqeshreviewer" },
    { name: "twitter:title", content: "Frequently Asked Questions (FAQ) - NQESH Reviewer" },
    { name: "twitter:description", content: "Find answers to common questions about the NQESH Reviewer platform and the National Qualifying Examination for School Heads" },
    { name: "twitter:image", content: `${domain}/twitter-image.jpg` },
    { rel: "canonical", href: fullUrl },
    {
      "script:ld+json": faq({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "What is the NQESH?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "The National Qualifying Examination for School Heads (NQESH) is an examination administered by the Department of Education (DepEd) in the Philippines. It is designed to assess the competencies of aspiring school leaders who want to become principals or school heads."
            }
          },
          {
            "@type": "Question",
            "name": "Who is eligible to take the NQESH?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "To be eligible to take the NQESH, candidates must be a Filipino citizen, must be a teacher, head teacher, or master teacher with at least 5 years of teaching experience, must have at least a bachelor's degree in elementary or secondary education, must have at least 18 units in management and administration courses, must have a performance rating of at least 'Very Satisfactory' in the last two rating periods, and must have no pending administrative case."
            }
          },
          {
            "@type": "Question",
            "name": "What is NQESH Reviewer?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "NQESH Reviewer is a comprehensive online platform designed specifically to help educators prepare for the National Qualifying Examination for School Heads. Our platform offers practice questions covering all NQESH domains, detailed explanations with references, timed practice simulations, performance tracking and analytics, and a mobile-friendly interface for studying anywhere."
            }
          },
          {
            "@type": "Question",
            "name": "What's included in the Pro plan?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "The Pro plan provides access to ALL categories (1,000+ practice questions), advanced performance analytics, detailed explanations with references for every question, specialized NQESH categories covering all exam domains, full-length simulation exams with time limits, AI-powered study recommendations, and priority email support."
            }
          },
          {
            "@type": "Question",
            "name": "How much does the Pro plan cost?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "The Pro plan costs ₱1,499 as a one-time payment, which gives you access to all Pro features for 12 months from the date of purchase."
            }
          }
        ]
      })
    }
  ]
};  

interface FaqItem {
  question: string;
  answer: React.ReactNode;
  category: string;
}

export default function FAQ() {
  const [openItem, setOpenItem] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const toggleItem = (index: number) => {
    setOpenItem(openItem === index ? null : index);
  };

  const faqItems: FaqItem[] = [
    // About NQESH
    {
      question: "What is the NQESH?",
      answer: (
        <div>
          <p>The National Qualifying Examination for School Heads (NQESH) is an examination administered by the Department of Education (DepEd) in the Philippines. It is designed to assess the competencies of aspiring school leaders who want to become principals or school heads.</p>
          <p className="mt-2">The exam evaluates candidates on various domains including school leadership, instructional leadership, creating a student-centered learning environment, human resource management and professional development, parent involvement and community partnership, school management and daily operations, and personal and professional attributes and interpersonal effectiveness.</p>
        </div>
      ),
      category: "nqesh"
    },
    {
      question: "Who is eligible to take the NQESH?",
      answer: (
        <div>
          <p>To be eligible to take the NQESH, candidates must meet the following criteria:</p>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>Must be a Filipino citizen</li>
            <li>Must be a teacher, head teacher, or master teacher with at least 5 years of teaching experience</li>
            <li>Must have at least a bachelor's degree in elementary or secondary education, or its equivalent</li>
            <li>Must have at least 18 units in management and administration courses</li>
            <li>Must have a performance rating of at least "Very Satisfactory" in the last two rating periods</li>
            <li>Must have no pending administrative case</li>
          </ul>
          <p className="mt-2">For the most current and detailed eligibility requirements, please refer to the latest DepEd memorandum on NQESH.</p>
        </div>
      ),
      category: "nqesh"
    },
    {
      question: "When is the NQESH conducted?",
      answer: (
        <div>
          <p>The NQESH is typically conducted once a year, usually around September to November. However, the exact date may vary based on DepEd's schedule and announcements.</p>
          <p className="mt-2">To stay updated on the exact examination date, application deadlines, and other important details, regularly check the official DepEd website, follow announcements from your Division Office, or visit the DepEd NEAP website.</p>
        </div>
      ),
      category: "nqesh"
    },
    {
      question: "What is the passing score for the NQESH?",
      answer: (
        <div>
          <p>The passing score for the NQESH is typically 70%. However, this can vary based on DepEd's standards for a particular testing cycle.</p>
          <p className="mt-2">It's important to note that passing the NQESH doesn't automatically make you a school head. It qualifies you to be included in the pool of candidates for school head positions. Appointment still depends on vacancies and other DepEd selection procedures.</p>
        </div>
      ),
      category: "nqesh"
    },

    // About the Platform
    {
      question: "What is NQESH Reviewer?",
      answer: (
        <div>
          <p>NQESH Reviewer is a comprehensive online platform designed specifically to help educators prepare for the National Qualifying Examination for School Heads. Our platform offers:</p>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>Practice questions covering all NQESH domains</li>
            <li>Detailed explanations with references</li>
            <li>Timed practice simulations</li>
            <li>Performance tracking and analytics</li>
            <li>Mobile-friendly interface for studying anywhere</li>
          </ul>
          <p className="mt-2">Our content is developed by experienced educators and school administrators who understand the NQESH requirements and the Philippine educational context.</p>
        </div>
      ),
      category: "platform"
    },
    {
      question: "How do I start using NQESH Reviewer?",
      answer: (
        <div>
          <p>Getting started with NQESH Reviewer is easy:</p>
          <ol className="list-decimal list-inside mt-2 space-y-1">
            <li>Visit our <Link to={href("/reviewer")} className="text-blue-600 dark:text-blue-400 hover:underline">Reviewer page</Link></li>
            <li>Browse the available categories</li>
            <li>Select a category to begin practicing questions</li>
            <li>Answer questions and review your results</li>
          </ol>
          <p className="mt-2">You can start using our free plan right away without any registration. If you'd like access to all categories and premium features, you can upgrade to our Pro plan by visiting our <Link to={href("/pricing")} className="text-blue-600 dark:text-blue-400 hover:underline">Pricing page</Link>.</p>
        </div>
      ),
      category: "platform"
    },
    {
      question: "Is NQESH Reviewer available offline?",
      answer: (
        <div>
          <p>Currently, NQESH Reviewer is an online web application that requires an internet connection to access. We do not offer an offline version or downloadable content at this time.</p>
          <p className="mt-2">However, our application is optimized to work well even on slower internet connections, and it's designed to be mobile-friendly so you can study on various devices.</p>
          <p className="mt-2">We're exploring options for offline functionality in future updates based on user feedback.</p>
        </div>
      ),
      category: "platform"
    },
    {
      question: "How often is the content updated?",
      answer: (
        <div>
          <p>We regularly update our content to ensure it aligns with the latest NQESH framework, DepEd orders, and educational policies in the Philippines.</p>
          <p className="mt-2">Major updates typically occur:</p>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>After the release of new DepEd guidelines related to school leadership</li>
            <li>When there are significant changes to the NQESH format or content</li>
            <li>Based on feedback from users who have recently taken the examination</li>
            <li>Quarterly for general content improvements and additions</li>
          </ul>
          <p className="mt-2">All updates are automatically available to users, with no need to download or install anything.</p>
        </div>
      ),
      category: "platform"
    },

    // Subscriptions and Payments
    {
      question: "What's included in the Pro plan?",
      answer: (
        <div>
          <p>The Pro plan provides comprehensive access to all NQESH Reviewer features, including:</p>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>Access to ALL categories (1,000+ practice questions)</li>
            <li>Advanced performance analytics to track your progress</li>
            <li>Detailed explanations with references for every question</li>
            <li>Specialized NQESH categories covering all exam domains</li>
            <li>Full-length simulation exams with time limits</li>
            <li>AI-powered study recommendations</li>
            <li>Priority email support</li>
          </ul>
          <p className="mt-2">Pro plan subscribers receive 12 months of access from the date of purchase. You can view full plan details on our <Link to={href("/pricing")} className="text-blue-600 dark:text-blue-400 hover:underline">Pricing page</Link>.</p>
        </div>
      ),
      category: "subscription"
    },
    {
      question: "How much does the Pro plan cost?",
      answer: (
        <div>
          <p>The Pro plan costs ₱1,499 as a one-time payment, which gives you access to all Pro features for 12 months from the date of purchase.</p>
          <p className="mt-2">This works out to approximately ₱125 per month, making it an affordable investment in your professional development and career advancement.</p>
          <p className="mt-2">We do not currently offer monthly subscription options or installment plans.</p>
        </div>
      ),
      category: "subscription"
    },
    {
      question: "What payment methods do you accept?",
      answer: (
        <div>
          <p>We accept the following payment methods:</p>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>GCash</li>
            <li>Maya</li>
            <li>Bank Transfer (BDO, BPI, UnionBank, Metrobank)</li>
          </ul>
          <p className="mt-2">For details on how to make a payment and account activation procedures, please visit our <Link to={href("/payment-methods")} className="text-blue-600 dark:text-blue-400 hover:underline">Payment Methods page</Link>.</p>
        </div>
      ),
      category: "subscription"
    },
    {
      question: "Do you offer refunds?",
      answer: (
        <div>
          <p>Yes, we offer a 7-day money-back guarantee for the Pro plan. If you're not satisfied with your subscription within the first 7 days after purchase, you can request a full refund.</p>
          <p className="mt-2">After the initial 7-day period, refunds are evaluated on a case-by-case basis and are typically only provided in exceptional circumstances.</p>
          <p className="mt-2">For detailed information about our refund policy, please visit our <Link to={href("/refund-policy")} className="text-blue-600 dark:text-blue-400 hover:underline">Refund Policy page</Link>.</p>
        </div>
      ),
      category: "subscription"
    },
    {
      question: "How long does my Pro access last?",
      answer: (
        <div>
          <p>Your Pro plan access lasts for 12 months (365 days) from the date of activation. After this period, you'll retain access to the free features, but Pro features will no longer be available unless you renew your subscription.</p>
          <p className="mt-2">You'll receive email notifications 30 days and 7 days before your subscription expires, giving you ample time to renew if you wish to maintain uninterrupted access to Pro features.</p>
        </div>
      ),
      category: "subscription"
    },

    // Technical Support
    {
      question: "What if I encounter technical issues?",
      answer: (
        <div>
          <p>If you encounter any technical issues while using NQESH Reviewer, please:</p>
          <ol className="list-decimal list-inside mt-2 space-y-1">
            <li>Try refreshing your browser or clearing your cache</li>
            <li>Ensure you're using a supported browser (Chrome, Firefox, Safari, or Edge)</li>
            <li>Check if your internet connection is stable</li>
            <li>If the issue persists, contact our support team via the <Link to={href("/contact")} className="text-blue-600 dark:text-blue-400 hover:underline">Contact page</Link></li>
          </ol>
          <p className="mt-2">When reporting an issue, please provide as much detail as possible, including the device type, browser version, and a screenshot or description of the error you're experiencing. This helps us resolve your issue more quickly.</p>
        </div>
      ),
      category: "support"
    },
    {
      question: "How can I contact support?",
      answer: (
        <div>
          <p>You can contact our support team by:</p>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>Filling out the form on our <Link to={href("/contact")} className="text-blue-600 dark:text-blue-400 hover:underline">Contact page</Link></li>
            <li>Emailing us directly at support@nqesh.com</li>
          </ul>
          <p className="mt-2">Pro plan subscribers receive priority support with faster response times, typically within 24 hours on business days. Free plan users can expect responses within 48-72 hours.</p>
        </div>
      ),
      category: "support"
    },
    {
      question: "What browsers are supported?",
      answer: (
        <div>
          <p>NQESH Reviewer is optimized to work on modern web browsers, including:</p>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>Google Chrome (recommended, version 90 or higher)</li>
            <li>Mozilla Firefox (version 88 or higher)</li>
            <li>Safari (version 14 or higher)</li>
            <li>Microsoft Edge (Chromium-based, version 90 or higher)</li>
          </ul>
          <p className="mt-2">We recommend keeping your browser updated to the latest version for the best experience. Internet Explorer is not supported.</p>
        </div>
      ),
      category: "support"
    },
  ];

  const filteredFaqs = activeCategory === "all"
    ? faqItems
    : faqItems.filter(item => item.category === activeCategory);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 py-8 md:py-12">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 p-8 mb-8">
          <div className="text-center mb-8">
            <span className="text-4xl mb-4 inline-block">❓</span>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Frequently Asked Questions</h1>
            <p className="text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
              Find answers to common questions about NQESH Reviewer and the examination process.
            </p>
          </div>

          {/* Category tabs */}
          <div className="flex flex-wrap justify-center mb-8 gap-2">
            <button
              onClick={() => setActiveCategory("all")}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors cursor-pointer
                ${activeCategory === "all"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 dark:hover:text-white" /* Added dark mode hover text color */
                }`}
            >
              All Questions
            </button>
            <button
              onClick={() => setActiveCategory("nqesh")}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors cursor-pointer
                ${activeCategory === "nqesh"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 dark:hover:text-white" /* Added dark mode hover text color */
                }`}
            >
              About NQESH
            </button>
            <button
              onClick={() => setActiveCategory("platform")}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors cursor-pointer
                ${activeCategory === "platform"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 dark:hover:text-white" /* Added dark mode hover text color */
                }`}
            >
              Our Platform
            </button>
            <button
              onClick={() => setActiveCategory("subscription")}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors cursor-pointer
                ${activeCategory === "subscription"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 dark:hover:text-white" /* Added dark mode hover text color */
                }`}
            >
              Subscriptions & Payments
            </button>
            <button
              onClick={() => setActiveCategory("support")}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors cursor-pointer
                ${activeCategory === "support"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 dark:hover:text-white" /* Added dark mode hover text color */
                }`}
            >
              Technical Support
            </button>
          </div>

          {/* FAQ accordions */}
          <div className="space-y-4">
            {filteredFaqs.map((faq, index) => (
              <div
                key={index}
                className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden"
              >
                <button
                  onClick={() => toggleItem(index)}
                  className="w-full text-left p-4 flex justify-between items-center bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors cursor-pointer"
                >
                  <span className="font-medium text-gray-900 dark:text-white">{faq.question}</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`h-5 w-5 text-gray-500 dark:text-gray-400 transition-transform ${openItem === index ? 'transform rotate-180' : ''}`}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </button>
                {openItem === index && (
                  <div className="p-4 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Contact us if you didn't find an answer */}
          <div className="mt-10 pt-6 border-t border-gray-200 dark:border-gray-800 text-center">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
              Didn't find what you're looking for?
            </h3>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              If you have additional questions or need further assistance, please don't hesitate to contact our support team.
            </p>
            <Link
              to="/contact"
              className="inline-block px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors cursor-pointer"
            >
              Contact Support
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
