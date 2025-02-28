import { Link } from 'react-router';
import type { Route } from './+types/payment-methods';

export const meta: Route.MetaFunction = () => {
  return [
    { title: "NQESH Reviewer - Payment Methods" },
    { name: "description", content: "Available payment methods for NQESH Reviewer Pro and how to complete your purchase" },
  ];
};

export default function PaymentMethods() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 py-8 md:py-12">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 p-8 mb-8">
          <div className="text-center mb-8">
            <span className="text-4xl mb-4 inline-block">💳</span>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Payment Methods</h1>
            <p className="text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
              We offer several convenient payment options for your NQESH Reviewer Pro subscription
            </p>
          </div>

          <div className="space-y-8 text-gray-700 dark:text-gray-300">
            <section>
              <div className="flex items-center mb-4">
                <div className="bg-green-100 dark:bg-green-900 rounded-full p-3 mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600 dark:text-green-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="5" width="20" height="14" rx="2" />
                    <line x1="2" y1="10" x2="22" y2="10" />
                  </svg>
                </div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Payment Overview</h2>
              </div>
              <p className="mb-3">
                The NQESH Reviewer Pro plan costs <span className="font-medium">₱1,499</span> as a one-time payment, providing you with 12 months of access to all Pro features from the date of your account activation.
              </p>
              <p>
                After selecting your preferred payment method and completing your payment, your Pro account will be activated within 24 hours (usually much faster during business hours).
              </p>
            </section>

            <div className="grid md:grid-cols-2 gap-6">
              {/* GCash */}
              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 flex-shrink-0 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mr-4">
                    <span className="text-2xl">G</span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">GCash</h3>
                </div>
                <p className="mb-3">Send payment to our GCash account:</p>
                <div className="bg-white dark:bg-gray-900 rounded-lg p-4 mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-500 dark:text-gray-400">Account Name:</span>
                    <span className="font-medium text-gray-900 dark:text-white">Mark Anthony Llego</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500 dark:text-gray-400">GCash Number:</span>
                    <span className="font-medium text-gray-900 dark:text-white">0926-021-1602</span>
                  </div>
                </div>
                <h4 className="font-medium text-gray-900 dark:text-white mb-2">Payment Steps:</h4>
                <ol className="list-decimal list-inside space-y-1 mb-4">
                  <li>Open your GCash app</li>
                  <li>Tap "Send Money"</li>
                  <li>Select "Send to GCash Account"</li>
                  <li>Enter the mobile number: 09260211602</li>
                  <li>Enter the amount: ₱1,499</li>
                  <li>Add "NQESH PRO" and your email in the message field</li>
                  <li>Confirm and send payment</li>
                </ol>
                <p className="text-sm italic">
                  After payment, send a screenshot to <a href="mailto:support@nqesh.com" className="text-blue-600 dark:text-blue-400 hover:underline">support@nqesh.com</a> with your full name and email.
                </p>
              </div>

              {/* Maya */}
              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 flex-shrink-0 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mr-4">
                    <span className="text-2xl">M</span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Maya</h3>
                </div>
                <p className="mb-3">Send payment to our Maya account:</p>
                <div className="bg-white dark:bg-gray-900 rounded-lg p-4 mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-500 dark:text-gray-400">Account Name:</span>
                    <span className="font-medium text-gray-900 dark:text-white">Mark Anthony Llego</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500 dark:text-gray-400">Maya Number:</span>
                    <span className="font-medium text-gray-900 dark:text-white">0926-021-1602</span>
                  </div>
                </div>
                <h4 className="font-medium text-gray-900 dark:text-white mb-2">Payment Steps:</h4>
                <ol className="list-decimal list-inside space-y-1 mb-4">
                  <li>Open your Maya app</li>
                  <li>Tap "Send Money"</li>
                  <li>Enter the mobile number: 09260211602</li>
                  <li>Enter the amount: ₱1,499</li>
                  <li>Add "NQESH PRO" and your email in the message field</li>
                  <li>Confirm and send payment</li>
                </ol>
                <p className="text-sm italic">
                  After payment, send a screenshot to <a href="mailto:support@nqesh.com" className="text-blue-600 dark:text-blue-400 hover:underline">support@nqesh.com</a> with your full name and email.
                </p>
              </div>
            </div>

            {/* Bank Transfer */}
            <section className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 flex-shrink-0 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600 dark:text-green-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                    <line x1="16" y1="2" x2="16" y2="6"></line>
                    <line x1="8" y1="2" x2="8" y2="6"></line>
                    <line x1="3" y1="10" x2="21" y2="10"></line>
                    <path d="M8 14h.01"></path>
                    <path d="M12 14h.01"></path>
                    <path d="M16 14h.01"></path>
                    <path d="M8 18h.01"></path>
                    <path d="M12 18h.01"></path>
                    <path d="M16 18h.01"></path>
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Bank Transfer</h3>
              </div>
              <p className="mb-3">We accept bank transfers to the following accounts:</p>
              
              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div className="bg-white dark:bg-gray-900 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 dark:text-white mb-2">BDO (Banco de Oro)</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-500 dark:text-gray-400">Account Name:</span>
                      <span className="font-medium text-gray-900 dark:text-white">Mark Anthony Llego</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-500 dark:text-gray-400">Account Number:</span>
                      <span className="font-medium text-gray-900 dark:text-white">002460789123</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-500 dark:text-gray-400">Account Type:</span>
                      <span className="font-medium text-gray-900 dark:text-white">Savings</span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white dark:bg-gray-900 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 dark:text-white mb-2">BPI (Bank of the Philippine Islands)</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-500 dark:text-gray-400">Account Name:</span>
                      <span className="font-medium text-gray-900 dark:text-white">Mark Anthony Llego</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-500 dark:text-gray-400">Account Number:</span>
                      <span className="font-medium text-gray-900 dark:text-white">1234-5678-90</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-500 dark:text-gray-400">Account Type:</span>
                      <span className="font-medium text-gray-900 dark:text-white">Savings</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div className="bg-white dark:bg-gray-900 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 dark:text-white mb-2">UnionBank</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-500 dark:text-gray-400">Account Name:</span>
                      <span className="font-medium text-gray-900 dark:text-white">Mark Anthony Llego</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-500 dark:text-gray-400">Account Number:</span>
                      <span className="font-medium text-gray-900 dark:text-white">109876543210</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-500 dark:text-gray-400">Account Type:</span>
                      <span className="font-medium text-gray-900 dark:text-white">Savings</span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white dark:bg-gray-900 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 dark:text-white mb-2">Metrobank</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-500 dark:text-gray-400">Account Name:</span>
                      <span className="font-medium text-gray-900 dark:text-white">Mark Anthony Llego</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-500 dark:text-gray-400">Account Number:</span>
                      <span className="font-medium text-gray-900 dark:text-white">123-4-12345678-9</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-500 dark:text-gray-400">Account Type:</span>
                      <span className="font-medium text-gray-900 dark:text-white">Savings</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <h4 className="font-medium text-gray-900 dark:text-white mb-2">Bank Transfer Steps:</h4>
              <ol className="list-decimal list-inside space-y-1 mb-4">
                <li>Log in to your online banking account or visit your bank branch</li>
                <li>Choose the "Transfer to Another Account" option</li>
                <li>Enter the account details from one of the banks above</li>
                <li>Enter the amount: ₱1,499</li>
                <li>Complete the transfer</li>
                <li>Save the transaction receipt or take a screenshot</li>
              </ol>
              
              <div className="bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-4">
                <p className="font-medium text-blue-800 dark:text-blue-300 mb-2">
                  Important: After completing your bank transfer, please email the following information to <a href="mailto:support@nqesh.com" className="text-blue-600 dark:text-blue-400 hover:underline">support@nqesh.com</a>:
                </p>
                <ul className="list-disc list-inside space-y-1 text-blue-700 dark:text-blue-400">
                  <li>Transaction receipt or screenshot</li>
                  <li>Date and time of transfer</li>
                  <li>Bank used for the transfer</li>
                  <li>Your full name</li>
                  <li>Email address for your NQESH Reviewer account</li>
                  <li>Reference/Transaction number (if available)</li>
                </ul>
              </div>
              
              <p className="text-sm italic">
                Account activation may take 24-48 hours after bank transfers due to verification processes.
              </p>
            </section>

            {/* Account Activation */}
            <section className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 flex-shrink-0 bg-yellow-100 dark:bg-yellow-900 rounded-full flex items-center justify-center mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-600 dark:text-yellow-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z"></path>
                    <path d="M12 8v4"></path>
                    <path d="M12 16h.01"></path>
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Account Activation Process</h3>
              </div>
              
              <ol className="list-decimal list-inside space-y-2 mb-4">
                <li>
                  <span className="font-medium">Make Payment:</span> Complete payment using one of the methods above
                </li>
                <li>
                  <span className="font-medium">Send Confirmation:</span> Email your payment details to <a href="mailto:support@nqesh.com" className="text-blue-600 dark:text-blue-400 hover:underline">support@nqesh.com</a>
                </li>
                <li>
                  <span className="font-medium">Verification:</span> Our team will verify your payment (usually within 24 hours)
                </li>
                <li>
                  <span className="font-medium">Activation:</span> Once verified, we'll activate your Pro access
                </li>
                <li>
                  <span className="font-medium">Confirmation Email:</span> You'll receive a confirmation email with your Pro account details
                </li>
              </ol>
              
              <div className="bg-yellow-50 dark:bg-yellow-900/30 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
                <p className="text-yellow-800 dark:text-yellow-300">
                  <span className="font-medium">Processing Times:</span> Account activation is typically completed within 24 hours during business days (Monday to Friday, 8:00 AM to 5:00 PM Philippine time). Payments made on weekends or holidays may take longer to process.
                </p>
              </div>
            </section>

            {/* Help and Support */}
            <section className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-800 text-center">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                Need Help with Payment?
              </h3>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                If you encounter any issues during the payment process or have questions about your subscription, our support team is here to help.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/contact"
                  className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
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
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}