import { Link, href } from 'react-router';
import type { Route } from './+types/terms';

export const meta: Route.MetaFunction = ({ location }) => {
  const url = location.pathname
  const domain = "https://nqesh.com" // Use your actual domain in production
  const fullUrl = `${domain}${url}`

  return [
    { title: "NQESH Reviewer - Terms of Use" },
    { name: "description", content: "View the Terms of Use for the NQESH Reviewer application. Understand your rights and responsibilities when using our platform." },
    { property: "og:title", content: "NQESH Reviewer - Terms of Use" },
    { property: "og:description", content: "View the Terms of Use for the NQESH Reviewer application. Understand your rights and responsibilities when using our platform." },
    { property: "og:url", content: fullUrl },
    { property: "og:type", content: "website" },
    { name: "twitter:title", content: "NQESH Reviewer - Terms of Use" },
    { name: "twitter:description", content: "View the Terms of Use for the NQESH Reviewer application. Understand your rights and responsibilities when using our platform." },
    { name: "twitter:card", content: "summary_large_image" },
    { rel: "canonical", href: fullUrl },
  ];
};

export default function TermsOfUse() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 py-8 md:py-12">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 p-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-amber-100 dark:bg-amber-900 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-amber-600 dark:text-amber-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                <path d="M12 8v4"></path>
                <path d="M12 16h.01"></path>
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Terms of Use</h1>
          </div>

          <div className="space-y-6 text-gray-700 dark:text-gray-300">
            <p>
              Welcome to the NQESH Reviewer web application. By accessing and
              using this website, you agree to comply with and be bound by the
              following Terms of Use. Please read these terms carefully.
            </p>

            <section className="space-y-3">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                1. Copyright and Intellectual Property
              </h2>
              <p>
                The NQESH Reviewer Materials, including but not limited to quiz
                questions, explanations, text, graphics, logos, icons, images,
                and source code, are copyrighted by Mark Anthony Llego and
                Eduventure Web Development Services. All rights are reserved.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">2. Restrictions on Use</h2>
              <p>
                Users are expressly prohibited from copying, reproducing,
                distributing, modifying, creating derivative works of, publicly
                displaying, or publicly performing any content or materials from
                this website, including the NQESH Reviewer Materials, without
                the express prior written permission of Mark Anthony Llego.
              </p>
              <p>
                This includes, but is not limited to, the quiz questions,
                options, explanations, category descriptions, and any other
                textual or visual content provided on this website.
              </p>
              <p>
                You agree not to use any automated systems, robots, or software
                to extract data from this website for any purpose, including but
                not limited to commercial purposes.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                3. Consequences of Unauthorized Use
              </h2>
              <p>
                Engaging in any prohibited activities, including but not limited
                to the unauthorized copying, reproduction, distribution, or
                modification of the NQESH Reviewer Materials, may result in the
                following consequences:
              </p>
              <ul className="list-disc list-inside space-y-1 pl-2">
                <li>
                  Immediate termination of your access to the NQESH Reviewer
                  website.
                </li>
                <li>
                  Legal action for copyright infringement and other applicable
                  violations under Philippine law. This may include claims for
                  damages and injunctive relief.
                </li>
                <li>
                  Reporting of your activities to relevant authorities,
                  including but not limited to the Department of Education, if
                  applicable, considering the professional context of our users.
                </li>
                <li>
                  Reporting of your actions to the Professional Regulation
                  Commission (PRC), which may have implications for your
                  professional license as educators.
                </li>
              </ul>
              <p>
                We take the protection of our intellectual property rights
                seriously and will pursue all available legal remedies to
                address any unauthorized use of the NQESH Reviewer Materials.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">4. Acceptance of Terms</h2>
              <p>
                By using the NQESH Reviewer web application, you acknowledge
                that you have read, understood, and agree to be bound by these
                Terms of Use. If you do not agree to these terms, you are not
                permitted to use this website.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                5. Modifications to Terms
              </h2>
              <p>
                We reserve the right to modify these Terms of Use at any time.
                Any changes will be effective immediately upon posting on this
                website. Your continued use of the website after any such
                changes constitutes your acceptance of the new Terms of Use.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">6. Disclaimer</h2>
              <p>
                The NQESH Reviewer is provided for educational and review
                purposes only. While we strive to ensure the accuracy of the
                content, we make no warranties or representations about the
                completeness, accuracy, reliability, suitability, or
                availability with respect to the website or the information,
                products, services, or related graphics contained on the website
                for any purpose. Any reliance you place on such information is
                therefore strictly at your own risk.
              </p>
              <p>
                Specifically regarding the AI Chat feature, please understand
                that it is provided for informational and educational support.
                While we aim for helpful and accurate responses, the AI Chat
                utilizes artificial intelligence and may not always be correct,
                complete, or up-to-date. The AI Chat is not a substitute for
                professional advice, and responses should not be taken as
                official opinions or factual guarantees. Use of the AI Chat
                feature is at your own discretion and risk.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                7. AI Chat Feature Usage
              </h2>
              <p>By using the AI Chat feature, you agree to the following:</p>
              <ul className="list-disc list-inside space-y-1 pl-2">
                <li>
                  <span className="font-medium">Acceptable Use:</span> You agree
                  to use the AI Chat feature responsibly and ethically, in
                  accordance with these Terms of Use and all applicable laws and
                  regulations. You must not use the AI Chat for any unlawful,
                  harmful, or malicious purposes, including but not limited to
                  generating or disseminating misinformation, engaging in
                  harassment, or violating privacy.
                </li>
                <li>
                  <span className="font-medium">Rate Limits:</span> Use of the
                  AI Chat feature is subject to rate limits to ensure fair usage
                  and prevent abuse. We reserve the right to enforce and modify
                  these limits at our discretion. Exceeding these limits may
                  result in temporary or permanent restriction of access to the
                  AI Chat feature.
                </li>
                <li>
                  <span className="font-medium">
                    No Storage of Conversations:
                  </span>
                  We do not store or retain your chat messages or conversations
                  within our application's databases or systems. Your chat
                  interactions are transient and are not saved by us.
                </li>
                <li>
                  <span className="font-medium">Third-Party AI Model:</span> You
                  acknowledge that the AI Chat feature is powered by a
                  third-party AI model (Google Gemini API), and your
                  interactions are subject to the terms and privacy policies of
                  that third party. Please refer to the{" "}
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
                  for details on their data handling practices.
                </li>
                <li>
                  <span className="font-medium">User Responsibility:</span> You
                  are solely responsible for the prompts, inputs, and
                  information you provide to the AI Chat feature and for your
                  interpretation and use of the responses generated by the AI.
                </li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">8. Governing Law</h2>
              <p>
                These Terms of Use shall be governed by and construed in
                accordance with the laws of the Republic of the Philippines. Any
                legal action or proceeding arising out of or relating to these
                Terms of Use or the use of this website shall be brought
                exclusively in the courts of competent jurisdiction in the
                Philippines.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                9. Limitation of Liability
              </h2>
              <p>
                To the maximum extent permitted by applicable law, Mark Anthony
                Llego shall not be liable for any indirect, incidental, special,
                consequential, or punitive damages, or any loss of profits or
                revenues, whether incurred directly or indirectly, or any loss
                of data, use, goodwill, or other intangible losses, resulting
                from (a) your use or inability to use the NQESH Reviewer
                website; (b) any unauthorized access to or use of our servers
                and/or any personal information stored therein; (c) any
                interruption or cessation of transmission to or from the
                website; (d) any bugs, viruses, trojan horses, or the like that
                may be transmitted to or through our website by any third party;
                (e) any errors or omissions in any content; or (f) for any loss
                or damage of any kind incurred as a result of your use of any
                content posted, emailed, transmitted, or otherwise made
                available via the NQESH Reviewer website, whether based on
                warranty, contract, tort (including negligence), or any other
                legal theory, whether or not we have been informed of the
                possibility of such damage.
              </p>
              <p>
                This limitation of liability extends to the use of the AI Chat
                feature, including but not limited to any errors, inaccuracies,
                or omissions in the responses provided by the AI, or any
                consequences resulting from your reliance on such responses.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">10. Contact Us</h2>
              <p>
                If you have any questions regarding these Terms of Use or need
                to request permission for any use of the NQESH Reviewer
                Materials not explicitly permitted herein, please contact us at:
              </p>
              <p>
                Email:{" "}
                <a href="mailto:support@nqesh.com" className="text-blue-600 dark:text-blue-400 hover:underline">support@nqesh.com</a>
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