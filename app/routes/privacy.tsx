import { Link, href } from 'react-router';
import type { Route } from './+types/privacy';

export const meta: Route.MetaFunction = ({ location }) => {
  const url = location.pathname
  const domain = "https://nqesh.com"
  const fullUrl = `${domain}${url}`

  return [
    { title: "NQESH Reviewer - Privacy Policy" },
    { name: "description", content: "Read the Privacy Policy for NQESH Reviewer to understand how we protect your personal information and data." },
    { property: "og:title", content: "NQESH Reviewer - Privacy Policy" },
    { property: "og:description", content: "Read the Privacy Policy for NQESH Reviewer to understand how we protect your personal information and data." },
    { property: "og:url", content: fullUrl },
    { property: "og:type", content: "website" },
    { property: "og:image", content: `${domain}/og-image.jpg` },
    { property: "og:image:width", content: "1200" },
    { property: "og:image:height", content: "630" },
    { property: "og:image:alt", content: "NQESH Reviewer Privacy Policy" },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:site", content: "@nqeshreviewer" },
    { name: "twitter:title", content: "NQESH Reviewer - Privacy Policy" },
    { name: "twitter:description", content: "Read the Privacy Policy for NQESH Reviewer to understand how we protect your personal information and data." },
    { name: "twitter:image", content: `${domain}/twitter-image.jpg` },
    { rel: "canonical", href: fullUrl },
  ];
};

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 py-8 md:py-12">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 p-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-blue-600 dark:text-blue-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Privacy Policy</h1>
          </div>

          <div className="space-y-6 text-gray-700 dark:text-gray-300">
            <p>
              This Privacy Policy describes how we collect, use, and protect
              your information when you use the NQESH Reviewer web application.
              We are committed to protecting your privacy and ensuring the
              security of your personal information, in compliance with the Data
              Privacy Act of 2012 of the Philippines (Republic Act No. 10173).
            </p>

            <section className="space-y-3">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                1. Information We Collect
              </h2>
              <p>
                We collect information in the following ways when you use our
                website:
              </p>

              <ul className="list-disc list-inside space-y-2 pl-2">
                <li>
                  <span className="font-medium">Cloudflare:</span> As a web
                  infrastructure and security provider, Cloudflare may collect
                  information such as your IP address, browser type, operating
                  system, and browsing activity on our website. This data is
                  primarily used for security purposes, to improve website
                  performance, and to analyze website traffic. For more
                  information, please refer to the{" "}
                  <Link
                    to="https://www.cloudflare.com/privacy/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    Cloudflare Privacy Policy
                  </Link>
                  .
                </li>
                <li>
                  <span className="font-medium">Cloudflare Pages:</span> Our
                  website is hosted on Cloudflare Pages. Cloudflare Pages may
                  collect similar information as Cloudflare for hosting and
                  service operation purposes. Please also refer to the{" "}
                  <Link
                    to="https://www.cloudflare.com/privacy/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    Cloudflare Privacy Policy
                  </Link>
                  .
                </li>
                <li>
                  <span className="font-medium">Cloudflare Zaraz:</span> We use
                  Cloudflare Zaraz for tag management, which may involve the
                  collection of data related to your interactions with our
                  website, depending on the specific tags implemented. For
                  details on data collection by Zaraz, please refer to the{" "}
                  <Link
                    to="https://www.cloudflare.com/cookie-policy/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    Cloudflare Zaraz Privacy Policy
                  </Link>
                  .
                </li>
                <li>
                  <span className="font-medium">Google Analytics 4 (GA4):</span>{" "}
                  We use Google Analytics 4 to understand how visitors use our
                  website. GA4 may collect data such as your IP address, device
                  information, pages visited, time spent on pages, and
                  interactions with website content. This information helps us
                  analyze website traffic and improve user experience. For more
                  information, please refer to the{" "}
                  <Link
                    to="https://policies.google.com/privacy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    Google Privacy Policy
                  </Link>{" "}
                  and{" "}
                  <Link
                    to="https://policies.google.com/technologies/partner-sites"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    How Google uses data when you use our partners' sites or apps
                  </Link>
                  .
                </li>
                <li>
                  <span className="font-medium">Cloudflare Analytics:</span> We
                  utilize Cloudflare Analytics to gain insights into website
                  traffic and performance. Cloudflare Analytics may collect
                  anonymized data about your visits, such as page views, visitor
                  counts, and performance metrics. This data is used to improve
                  our website and services. For more information, please refer
                  to the{" "}
                  <Link
                    to="https://www.cloudflare.com/privacy/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    Cloudflare Privacy Policy
                  </Link>
                  .
                </li>
                <li>
                  <span className="font-medium">Contact Form Information:</span>{" "}
                  When you use our contact form to send us inquiries or support
                  requests, we collect the information you provide, which may
                  include your name, email address, mobile number, and message.
                </li>
                <li>
                  <span className="font-medium">
                    Subscription and Payment Information:
                  </span>{" "}
                  If you choose to subscribe to NQESH Reviewer Plus, we will
                  collect information necessary to process your subscription and
                  payment. This may include your chosen payment method (Bank
                  Transfer, GCash, or Maya) and relevant transaction details.
                  For Bank Transfer, this may include transaction reference
                  numbers or deposit slips. For GCash and Maya, this may include
                  transaction confirmation details. We do not directly collect
                  or store your sensitive payment credentials such as credit
                  card numbers or full account details.
                </li>
                <li>
                  <span className="font-medium">
                    NQESH Reviewer Usage Data (Not Collected):
                  </span>{" "}
                  We want to explicitly state that{" "}
                  <span className="font-semibold">
                    we do not collect or store any data related to your NQESH
                    Reviewer usage, such as your scores, answers to questions,
                    time spent on review materials, or any progress tracking
                    within the application.
                  </span>{" "}
                  Your review sessions and performance data are not recorded or
                  analyzed by us.
                </li>
                <li>
                  <span className="font-medium">AI Chat Data Processing:</span>
                  When you use our AI Chat feature, please be aware of the
                  following data processing activities:
                  <ul className="list-disc list-inside mt-2 ml-4 space-y-2">
                    <li>
                      <span className="font-semibold">
                        Rate Limiting (Upstash):
                      </span>{" "}
                      To ensure fair usage and prevent abuse of our AI Chat
                      feature, we use Upstash for rate limiting. This involves:
                      <ul className="list-disc list-inside ml-4 mt-1 space-y-1">
                        <li>
                          Collecting your IP address to uniquely identify you
                          for rate limiting purposes.
                        </li>
                        <li>
                          Tracking the number of requests you make to the AI
                          Chat within a specific time window.
                        </li>
                        <li>
                          Utilizing Redis and an in-memory cache to efficiently
                          manage and enforce these rate limits.
                        </li>
                        <li>
                          Upstash may collect anonymized analytics data related
                          to rate limiting. For more information, please refer
                          to the{" "}
                          <Link
                            to="https://upstash.com/trust/privacy.pdf"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 dark:text-blue-400 hover:underline"
                          >
                            Upstash Privacy Policy
                          </Link>
                          .
                        </li>
                      </ul>
                    </li>
                    <li>
                      <span className="font-semibold">
                        Google Gemini AI Model:
                      </span>{" "}
                      Our AI Chat feature is powered by the Google Gemini AI
                      model. When you send a message to the AI Chat:
                      <ul className="list-disc list-inside ml-4 mt-1 space-y-1">
                        <li>
                          Your messages are transmitted to the Google Gemini API
                          to generate responses.
                        </li>
                        <li>
                          Google may collect and process data as described in
                          their privacy policies. Please refer to the{" "}
                          <Link
                            to="https://policies.google.com/privacy"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 dark:text-blue-400 hover:underline"
                          >
                            Google Privacy Policy
                          </Link>{" "}
                          and the{" "}
                          <Link
                            to="https://ai.google.dev/gemini-api/terms"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 dark:text-blue-400 hover:underline"
                          >
                            Gemini API Additional Terms of Service
                          </Link>{" "}
                          for details on Google's data handling practices.
                        </li>
                      </ul>
                    </li>
                    <li>
                      <span className="font-semibold">
                        No Message Storage by Us:
                      </span>{" "}
                      We want to explicitly state that{" "}
                      <span className="font-semibold">
                        we do not store or retain your chat messages or
                        conversations within our application's databases or
                        systems.
                      </span>{" "}
                      Your chat interactions are transient and are not saved by
                      us.
                    </li>
                  </ul>
                </li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">2. Use of Information</h2>
              <p>
                The information collected is used for the following purposes:
              </p>
              <ul className="list-disc list-inside space-y-1 pl-2">
                <li>To ensure the security and integrity of our website.</li>
                <li>
                  To analyze website traffic and understand user behavior.
                </li>
                <li>To improve website performance and user experience.</li>
                <li>To monitor and prevent misuse of our website.</li>
                <li>
                  To generate aggregated and anonymized statistics about website
                  usage.
                </li>
                <li>
                  <span className="font-medium">
                    To Respond to Inquiries and Provide Support:
                  </span>{" "}
                  We use the information collected through the contact form to
                  respond to your questions, address your concerns, and provide
                  customer support.
                </li>
                <li>
                  <span className="font-medium">
                    To Process Subscriptions and Payments:
                  </span>{" "}
                  We use your subscription and payment information to process
                  your subscription to NQESH Reviewer Plus, manage your account,
                  and handle transactions through your chosen payment method
                  (Bank Transfer, GCash, or Maya). This includes verifying
                  payments and providing access to premium features.
                </li>
                <li>
                  <span className="font-medium">
                    To manage and enforce rate limits for the AI Chat feature to
                    ensure fair usage and prevent abuse.
                  </span>
                </li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">3. Data Sharing</h2>
              <p>
                We are committed to protecting your personal information. We do
                not directly share your personal information with third parties
                except in the following circumstances:
              </p>
              <ul className="list-disc list-inside space-y-2 pl-2">
                <li>
                  <span className="font-medium">Service Providers:</span> We
                  utilize the services of Cloudflare and Google Analytics, as
                  detailed in Section 1. These providers may process data as
                  described in their respective privacy policies. We ensure
                  these providers are reputable and committed to data
                  protection.
                </li>
                <li>
                  <span className="font-medium">Payment Processors:</span> To
                  process payments for NQESH Reviewer Plus subscriptions, we may
                  share necessary transaction details with our chosen payment
                  processors (GCash, Maya, and banks for Bank Transfers) to
                  facilitate payment processing. We do not store your sensitive
                  payment credentials directly. These payment processors have
                  their own security and privacy policies, which we encourage
                  you to review.
                </li>
                <li>
                  <span className="font-medium">Upstash:</span> We utilize
                  Upstash for rate limiting of the AI Chat feature. Upstash may
                  process your IP address and related request data for rate
                  limiting and analytics purposes as described in their{" "}
                  <Link
                    to="https://upstash.com/trust/privacy.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    Upstash Privacy Policy
                  </Link>
                  .
                </li>
                <li>
                  <span className="font-medium">Google:</span> Our AI Chat
                  feature uses the Google Gemini AI model. When you use the AI
                  Chat, your messages are sent to Google's API. Please
                  refer to the{" "}
                  <Link
                    to="https://policies.google.com/privacy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    Google Privacy Policy
                  </Link>{" "}
                  and the{" "}
                  <Link
                    to="https://ai.google.dev/gemini-api/terms"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    Gemini API Additional Terms of Service
                  </Link>{" "}
                  for information on how Google may process data.
                </li>
                <li>
                  <span className="font-medium">Legal Compliance:</span> We may
                  disclose your information if required to do so by law or in
                  response to valid requests by public authorities (e.g., court
                  orders, government regulations).
                </li>
                <li>
                  <span className="font-medium">With Your Consent:</span> In
                  situations not described above, we will only share your
                  personal information with third parties if we have obtained
                  your explicit consent.
                </li>
              </ul>
              <p>
                We ensure that any data sharing is conducted in compliance with
                applicable data protection laws, including the Data Privacy Act
                of 2012.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">4. Data Security</h2>
              <p>
                We implement reasonable and appropriate organizational,
                physical, and technical security measures to protect your
                information from unauthorized access, use, alteration,
                disclosure, or destruction. These measures include:
              </p>
              <ul className="list-disc list-inside space-y-2 pl-2">
                <li>
                  Utilizing the security features provided by Cloudflare,
                  including but not limited to DDoS protection, SSL/TLS
                  encryption, and web application firewall.
                </li>
                <li>
                  Securely managing access to personal information, ensuring
                  that only authorized personnel have access on a need-to-know
                  basis.
                </li>
                <li>
                  Implementing measures to protect the confidentiality,
                  integrity, and availability of your personal information.
                </li>
                <li>
                  Regularly reviewing and updating our security practices to
                  address new and emerging security threats.
                </li>
                <li>
                  Utilizing reputable payment processors with robust security
                  measures to handle payment transactions securely. We do not
                  store sensitive payment information directly on our servers.
                </li>
                <li>
                  Employing secure API communication protocols for interacting
                  with the Google Gemini API and Upstash.
                </li>
              </ul>
              <p>
                However, no method of transmission over the internet or
                electronic storage is completely secure, and while we strive to
                use commercially acceptable means to protect your personal
                information, we cannot guarantee absolute security. In the event
                of a data breach, we will comply with all applicable legal
                requirements, including notification obligations under the Data
                Privacy Act of 2012.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">5. Your Rights</h2>
              <p>
                As a user, you have certain rights regarding your personal data
                under the Data Privacy Act of 2012. These rights include:
              </p>
              <ul className="list-disc list-inside space-y-2 pl-2">
                <li>
                  <span className="font-medium">Right to be Informed:</span> You
                  have the right to be informed about how your personal data is
                  being collected and used. This Privacy Policy serves to
                  fulfill this right.
                </li>
                <li>
                  <span className="font-medium">Right to Access:</span> You have
                  the right to request access to the personal data we hold about
                  you.
                </li>
                <li>
                  <span className="font-medium">Right to Rectification:</span>{" "}
                  You have the right to request correction of inaccurate or
                  incomplete personal data.
                </li>
                <li>
                  <span className="font-medium">
                    Right to Erasure or Blocking:
                  </span>{" "}
                  You have the right to request the erasure or blocking of your
                  personal data under certain circumstances.
                </li>
                <li>
                  <span className="font-medium">
                    Right to Data Portability:
                  </span>{" "}
                  You have the right to obtain and reuse your personal data for
                  your own purposes across different services.
                </li>
                <li>
                  <span className="font-medium">Right to Object:</span> You have
                  the right to object to the processing of your personal data
                  under certain circumstances.
                </li>
                <li>
                  <span className="font-medium">
                    Right to File a Complaint:
                  </span>{" "}
                  You have the right to lodge a complaint with the National
                  Privacy Commission (NPC) if you believe your rights have been
                  violated.
                </li>
                <li>
                  <span className="font-medium">Right to Damages:</span> You
                  have the right to be compensated for damages sustained due to
                  inaccurate, incomplete, outdated, false, unlawfully obtained
                  or unauthorized use of personal data.
                </li>
              </ul>
              <p>
                To exercise any of these rights, or for any inquiries regarding
                your data and privacy, please contact us using the information
                provided in the Contact Us section below. We may require you to
                verify your identity before processing your request.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">6. Governing Law</h2>
              <p>
                This Privacy Policy is governed by and construed in accordance
                with the laws of the Republic of the Philippines, including the
                Data Privacy Act of 2012 and its Implementing Rules and
                Regulations. Any disputes arising from or in connection with
                this Privacy Policy shall be subject to the exclusive
                jurisdiction of the courts of the Philippines.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                7. Modifications to Privacy Policy
              </h2>
              <p>
                We reserve the right to modify this Privacy Policy at any time
                to reflect changes in our data practices, legal requirements, or
                for other operational, legal, or regulatory reasons. Any changes
                will be effective immediately upon posting of the updated
                Privacy Policy on this website, with the updated revision date.
                We encourage you to review this Privacy Policy periodically for
                any updates or changes. Your continued use of the NQESH Reviewer
                web application after the posting of changes constitutes your
                acceptance of such changes.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">8. Contact Us</h2>
              <p>
                If you have any questions, concerns, or requests regarding this
                Privacy Policy or our data practices, please contact our Data
                Protection Officer, Mark Anthony Llego, at:
              </p>
              <p>
                Email:{" "}
                <a href="mailto:support@nqesh.com" className="text-blue-600 dark:text-blue-400 hover:underline">support@nqesh.com</a>
              </p>
              <p>
                We are committed to addressing your inquiries and resolving any
                concerns you may have about your privacy.
              </p>
            </section>

            <div className="flex justify-center mt-6">
              <Link 
                to={href("/")}
                className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
              >
                Return to NQESH Reviewer
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}