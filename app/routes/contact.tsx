import { organization } from "@forge42/seo-tools/structured-data/organization"
import { useState, useEffect } from 'react';
import { Link, data, useSubmit, href } from 'react-router';
import { z } from 'zod';
import { contactSubmissions } from '~/database/schema';
import type { Route } from './+types/contact';

export const meta: Route.MetaFunction = ({ location }) => {
  const url = location.pathname
  const domain = "https://nqesh.com"
  const fullUrl = `${domain}${url}`

  return [
    { title: "NQESH Reviewer - Contact Us" },
    { name: "description", content: "Contact the NQESH Reviewer team for support, feedback, or inquiries about our exam preparation platform" },
    { property: "og:title", content: "NQESH Reviewer - Contact Us" },
    { property: "og:description", content: "Contact the NQESH Reviewer team for support, feedback, or inquiries about our exam preparation platform" },
    { property: "og:url", content: fullUrl },
    { property: "og:type", content: "website" },
    { property: "og:image", content: `${domain}/og-image.jpg` },
    { property: "og:image:width", content: "1200" },
    { property: "og:image:height", content: "630" },
    { property: "og:image:alt", content: "NQESH Reviewer Contact Us" },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:site", content: "@nqeshreviewer" },
    { name: "twitter:title", content: "NQESH Reviewer - Contact Us" },
    { name: "twitter:description", content: "Contact the NQESH Reviewer team for support, feedback, or inquiries about our exam preparation platform" },
    { name: "twitter:image", content: `${domain}/twitter-image.jpg` },
    { rel: "canonical", href: fullUrl },
    {
      "script:ld+json": organization({
        "@context": "https://schema.org",
        "@type": "Organization",
        "url": "https://nqesh.com",
        "name": "NQESH Reviewer",
        "description": "Comprehensive preparation platform for the National Qualifying Examination for School Heads",
        "email": "support@nqesh.com",
        "telephone": "+63-926-021-1602",
        "contactPoint": {
          "@type": "ContactPoint",
          "contactType": "customer support",
          "email": "support@nqesh.com",
          "telephone": "+63-926-021-1602",
          "availableLanguage": ["English", "Filipino"]
        }
      })
    }
  ]
};

// Define Zod schema for form validation
const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  mobileNumber: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters"),
  privacyPolicy: z.boolean().refine(val => val === true, {
    message: "You must agree to the Privacy Policy"
  }),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

// Define the return type for our action function
interface ContactActionData {
  success: boolean;
  error?: string;
  errors?: Record<string, any>;
}

export async function action({ request, context }: Route.ActionArgs) {
  try {
    const formData = await request.formData();
    const formValues = {
      name: formData.get('name'),
      email: formData.get('email'),
      mobileNumber: formData.get('mobileNumber') || undefined,
      message: formData.get('message'),
      privacyPolicy: formData.get('privacyPolicy') !== null,
    };

    // Validate form data
    const validationResult = contactFormSchema.safeParse(formValues);
    
    if (!validationResult.success) {
      console.error("Form validation failed:", validationResult.error.format());
      return data({
        success: false,
        errors: validationResult.error.format(),
        error: "Please correct the errors in the form."
      } as ContactActionData, { status: 400 });
    }

    const { name, email, message, mobileNumber } = validationResult.data;

    try {
      // Save to database
      await context.db.insert(contactSubmissions).values({
        name,
        email,
        mobileNumber: mobileNumber || null,
        message,
        status: "unread",
        createdAt: new Date().toISOString(),
      });

      return data({ success: true } as ContactActionData);
    } catch (dbError) {
      console.error("Database error:", dbError);
      return data({
        success: false, 
        error: "Failed to save your message. Please try again later."
      } as ContactActionData, { status: 500 });
    }
  } catch (error) {
    console.error("Error processing contact form submission:", error);
    return data({
      success: false,
      error: error instanceof Error ? error.message : "An unexpected error occurred"
    } as ContactActionData, { status: 500 });
  }
}

export default function Contact({ actionData }: Route.ComponentProps) {
  const submit = useSubmit();
  const [formData, setFormData] = useState<ContactFormValues>({
    name: '',
    email: '',
    mobileNumber: '',
    message: '',
    privacyPolicy: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  
  // Update server error when actionData changes
  useEffect(() => {
    if (actionData && !actionData.success && actionData.error) {
      setServerError(actionData.error);
      setIsSubmitting(false);
    } else if (actionData && actionData.success) {
      setFormSubmitted(true);
      setIsSubmitting(false);
    }
  }, [actionData]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setServerError(null);

    try {
      // Validate form data with Zod
      const result = contactFormSchema.safeParse(formData);
      
      if (!result.success) {
        // Format and set errors
        const formattedErrors: Record<string, string> = {};
        result.error.errors.forEach(err => {
          if (err.path.length > 0) {
            formattedErrors[err.path[0].toString()] = err.message;
          }
        });
        
        setErrors(formattedErrors);
        setIsSubmitting(false);
        return;
      }

      // If validation passes, submit the form
      submit(e.currentTarget, {
        method: 'post',
        encType: 'application/x-www-form-urlencoded',
      });

      // We'll handle the success/error state in the useEffect that watches actionData
    } catch (error) {
      console.error('Form submission error:', error);
      setServerError('An unexpected error occurred. Please try again later.');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 py-8 md:py-12">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 p-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-purple-100 dark:bg-purple-900 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-purple-600 dark:text-purple-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 17a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9.5C2 7 4 5 6.5 5H18c2.2 0 4 1.8 4 4v8Z"></path>
                <polyline points="15,9 18,9 18,11"></polyline>
                <path d="M6.5 5C9 5 11 7 11 9.5V17a2 2 0 0 1-2 2v0"></path>
                <line x1="6" x2="8" y1="10" y2="10"></line>
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Contact Us</h1>
          </div>

          <div className="space-y-6 text-gray-700 dark:text-gray-300">
            <p>
              If you have any questions, purchase inquiries, feedback, or require support, please feel free to reach out using the form below. We will get back to you as soon as possible.
            </p>
            <p>
              For users who contact us via this form, please note that you will receive a response from our team via email from <span className="font-medium">support@nqesh.com</span>.
            </p>

            {formSubmitted ? (
              <div className="bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800 rounded-lg p-6 my-8 text-center">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-12 w-12 mx-auto mb-4 text-green-500 dark:text-green-400" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <h3 className="text-lg font-semibold text-green-800 dark:text-green-300 mb-2">Message Sent Successfully!</h3>
                <p className="text-green-700 dark:text-green-400 mb-4">Thank you for reaching out. We'll get back to you as soon as possible.</p>
                <button
                  onClick={() => {
                    setFormSubmitted(false);
                    setFormData({
                      name: '',
                      email: '',
                      mobileNumber: '',
                      message: '',
                      privacyPolicy: false,
                    });
                  }}
                  className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                {serverError && (
                  <div className="bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 text-red-800 dark:text-red-300 p-4 rounded-lg mb-6">
                    {serverError}
                  </div>
                )}
              
                <div>
                  <label htmlFor="name" className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
                    Name<span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className={`w-full p-3 border rounded-lg focus:ring-3 focus:ring-blue-500 focus:border-blue-500 outline-hidden dark:bg-gray-800 text-gray-900 dark:text-gray-100 ${
                      errors.name 
                        ? 'border-red-500 dark:border-red-700 focus:ring-red-500 focus:border-red-500' 
                        : 'border-gray-300 dark:border-gray-700'
                    }`}
                    placeholder="Mark Anthony Llego"
                    required
                  />
                  {errors.name && (
                    <p className="mt-1 text-red-600 dark:text-red-400 text-sm">{errors.name}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="email" className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
                    Email<span className="text-red-600">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`w-full p-3 border rounded-lg focus:ring-3 focus:ring-blue-500 focus:border-blue-500 outline-hidden dark:bg-gray-800 text-gray-900 dark:text-gray-100 ${
                      errors.email 
                        ? 'border-red-500 dark:border-red-700 focus:ring-red-500 focus:border-red-500' 
                        : 'border-gray-300 dark:border-gray-700'
                    }`}
                    placeholder="markllego@gmail.com"
                    required
                  />
                  {errors.email && (
                    <p className="mt-1 text-red-600 dark:text-red-400 text-sm">{errors.email}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="mobileNumber" className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
                    Mobile Number (optional)
                  </label>
                  <input
                    type="tel"
                    id="mobileNumber"
                    name="mobileNumber"
                    value={formData.mobileNumber}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-3 focus:ring-blue-500 focus:border-blue-500 outline-hidden dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                    placeholder="09260211602"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
                    Message<span className="text-red-600">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={5}
                    className={`w-full p-3 border rounded-lg focus:ring-3 focus:ring-blue-500 focus:border-blue-500 outline-hidden dark:bg-gray-800 text-gray-900 dark:text-gray-100 ${
                      errors.message 
                        ? 'border-red-500 dark:border-red-700 focus:ring-red-500 focus:border-red-500' 
                        : 'border-gray-300 dark:border-gray-700'
                    }`}
                    placeholder="Please provide details about your inquiry or feedback"
                    required
                  />
                  {errors.message && (
                    <p className="mt-1 text-red-600 dark:text-red-400 text-sm">{errors.message}</p>
                  )}
                </div>

                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="privacyPolicy"
                      name="privacyPolicy"
                      type="checkbox"
                      checked={formData.privacyPolicy === true}
                      onChange={handleInputChange}
                      className={`w-4 h-4 border rounded focus:ring-3 focus:ring-blue-500 cursor-pointer ${
                        errors.privacyPolicy 
                          ? 'border-red-500 dark:border-red-700 text-red-600 focus:ring-red-500' 
                          : 'border-gray-300 dark:border-gray-700 text-blue-600'
                      }`}
                      required
                    />
                  </div>
                  <label htmlFor="privacyPolicy" className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                    I agree to the{" "}
                    <Link
                      to={href("/privacy")}
                      className="text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      Privacy Policy
                    </Link>
                    <span className="text-red-600">*</span>
                  </label>
                </div>
                {errors.privacyPolicy && (
                  <p className="mt-1 text-red-600 dark:text-red-400 text-sm">{errors.privacyPolicy}</p>
                )}

                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full px-5 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Sending...
                      </span>
                    ) : (
                      "Send Message"
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}