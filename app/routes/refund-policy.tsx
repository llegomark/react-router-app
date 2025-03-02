import { Link, href } from 'react-router';
import type { Route } from './+types/refund-policy';

export const meta: Route.MetaFunction = () => {
  return [
    { title: "NQESH Reviewer - Refund Policy" },
    { name: "description", content: "Our refund policy for NQESH Reviewer Pro subscriptions" },
  ];
};

export default function RefundPolicy() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 py-8 md:py-12">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 p-8">
          <div className="text-center mb-8">
            <span className="text-4xl mb-4 inline-block">🔄</span>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Refund Policy</h1>
            <p className="text-gray-700 dark:text-gray-300">
              Last Updated: March 1, 2025
            </p>
          </div>

          <div className="space-y-6 text-gray-700 dark:text-gray-300">
            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Overview</h2>
              <p>
                At NQESH Reviewer, we are committed to ensuring your satisfaction with our services. This refund policy outlines the conditions under which we offer refunds for purchases of our Pro plan. By purchasing the NQESH Reviewer Pro plan, you agree to the terms of this refund policy.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">7-Day Money-Back Guarantee</h2>
              <p>
                We offer a 7-day money-back guarantee for all Pro plan purchases. If you are not satisfied with your Pro plan subscription for any reason, you may request a full refund within 7 calendar days from the date of purchase.
              </p>
              <p>
                To initiate a refund request within this 7-day period, please contact our support team through our <Link to="/contact" className="text-blue-600 dark:text-blue-400 hover:underline">Contact page</Link> or by emailing <a href="mailto:support@nqesh.com" className="text-blue-600 dark:text-blue-400 hover:underline">support@nqesh.com</a> with the subject line "Refund Request" and including your transaction details.
              </p>
              <div className="bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mt-2">
                <p className="font-medium text-blue-800 dark:text-blue-300">
                  Please note: The 7-day period begins from the date of payment confirmation, not from the date you first access or use the Pro features.
                </p>
              </div>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Refund Process</h2>
              <p>
                When requesting a refund, please provide the following information:
              </p>
              <ul className="list-disc list-inside space-y-2 pl-2">
                <li>Full name used during purchase</li>
                <li>Email address associated with your account</li>
                <li>Date of purchase</li>
                <li>Transaction reference number/receipt</li>
                <li>Payment method used</li>
                <li>Reason for the refund request</li>
              </ul>
              <p>
                Upon receiving your refund request, our team will review it and respond within 2-3 business days. If your refund is approved, it will be processed back to the original payment method used for the purchase.
              </p>
              <p>
                Please be aware that the time it takes for the refund to appear in your account depends on the payment method:
              </p>
              <ul className="list-disc list-inside space-y-2 pl-2">
                <li><span className="font-medium">GCash and Maya:</span> 3-5 business days</li>
                <li><span className="font-medium">Bank Transfer:</span> 5-10 business days, depending on your bank's processing time</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Refunds After the 7-Day Period</h2>
              <p>
                After the initial 7-day money-back guarantee period has expired, refunds are generally not provided. However, we understand that exceptional circumstances may arise. In such cases, refund requests will be evaluated on a case-by-case basis.
              </p>
              <p>
                Exceptional circumstances that may warrant a refund consideration include:
              </p>
              <ul className="list-disc list-inside space-y-2 pl-2">
                <li>Technical issues that prevent access to Pro features, which our support team has been unable to resolve within a reasonable timeframe</li>
                <li>Service unavailability for extended periods (more than 72 consecutive hours)</li>
                <li>Error in billing where you were charged multiple times for the same subscription</li>
              </ul>
              <div className="bg-yellow-50 dark:bg-yellow-900/30 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 mt-2">
                <p className="font-medium text-yellow-800 dark:text-yellow-300">
                  Please note: Refunds after the 7-day period are not guaranteed and are provided at the sole discretion of NQESH Reviewer management.
                </p>
              </div>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Non-Refundable Situations</h2>
              <p>
                Refunds will not be provided in the following situations:
              </p>
              <ul className="list-disc list-inside space-y-2 pl-2">
                <li>After the 7-day money-back guarantee period has expired, unless exceptional circumstances apply as described above</li>
                <li>If you have used a significant portion of the Pro features or content (such as accessing more than 50% of the Pro categories or content)</li>
                <li>If your request is based on reasons outside our control, such as changes to the NQESH examination format or rescheduling of the examination by DepEd</li>
                <li>If you have violated our Terms of Service or have been found to be sharing your account access with others</li>
                <li>If you have already received a refund for a previous purchase</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Alternative to Refunds</h2>
              <p>
                In some cases where a full refund is not applicable, we may offer alternatives such as:
              </p>
              <ul className="list-disc list-inside space-y-2 pl-2">
                <li>Extending your subscription period</li>
                <li>Providing additional support or training</li>
                <li>Partial refund based on the unused portion of your subscription</li>
                <li>Credit towards future purchases or subscription renewals</li>
              </ul>
              <p>
                These alternatives will be offered at our discretion based on the specific circumstances of your case.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Cancellation of Subscription</h2>
              <p>
                It's important to note that requesting a refund will also result in the cancellation of your Pro plan subscription. Upon refund approval, your account will revert to the free plan, and you will lose access to all Pro features.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Changes to This Policy</h2>
              <p>
                We reserve the right to modify this refund policy at any time. Changes will be effective immediately upon posting on this page, with the "Last Updated" date at the top of the policy reflecting the most recent revision.
              </p>
              <p>
                Refund requests will be processed according to the policy in effect at the time of purchase.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Contact Us</h2>
              <p>
                If you have any questions about our refund policy or would like to request a refund, please contact us through our <Link to="/contact" className="text-blue-600 dark:text-blue-400 hover:underline">Contact page</Link> or by emailing <a href="mailto:support@nqesh.com" className="text-blue-600 dark:text-blue-400 hover:underline">support@nqesh.com</a>.
              </p>
              <p>
                Our support team is available to assist you Monday through Friday, 8:00 AM to 5:00 PM Philippine Standard Time (PST), excluding holidays.
              </p>
            </section>

            <div className="flex justify-center mt-8 pt-4 border-t border-gray-200 dark:border-gray-800">
              <Link
                to={href("/pricing")}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
              >
                View Pricing Plans
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}