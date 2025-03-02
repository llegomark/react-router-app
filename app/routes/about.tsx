import { Link, href } from 'react-router';
import type { Route } from './+types/about';

export const meta: Route.MetaFunction = () => {
  return [
    { title: "NQESH Reviewer - About Us" },
    { name: "description", content: "Learn more about the NQESH Reviewer application" },
  ];
};

export default function AboutUs() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 py-8 md:py-12">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 p-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-green-100 dark:bg-green-900 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-green-600 dark:text-green-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 6H5a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h13l4-3.5L18 6Z"></path>
                <path d="M12 13v8"></path>
                <path d="M5 13v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-6"></path>
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">About NQESH Reviewer</h1>
          </div>

          <div className="space-y-6 text-gray-700 dark:text-gray-300">
            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Our Purpose</h2>
              <p>
                At NQESH Reviewer, our purpose is to empower aspiring school leaders across the Philippines by providing a comprehensive, accessible, and effective preparation platform for the National Qualifying Examination for School Heads (NQESH).
              </p>
              <p>
                We understand the critical role that school leaders play in shaping the future of education. By helping educators prepare thoroughly for the NQESH, we contribute to the development of capable and visionary school leaders who will positively impact countless students and communities throughout the Philippines.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">About the NQESH</h2>
              <p>
                The National Qualifying Examination for School Heads (NQESH) is administered by the Department of Education (DepEd) in the Philippines. This rigorous examination serves as a gateway for educators aspiring to become school principals and administrators. It assesses candidates' knowledge and competencies in various critical areas:
              </p>
              <ul className="list-disc list-inside space-y-2 pl-2">
                <li>School Leadership and Management</li>
                <li>Instructional Leadership</li>
                <li>Educational Policy and Governance</li>
                <li>Human Resource Management</li>
                <li>Strategic Planning and School Improvement</li>
                <li>Resource Management</li>
                <li>Community Engagement</li>
              </ul>
              <p>
                Success in the NQESH signifies that an educator has demonstrated the necessary knowledge and competencies to lead and manage a school effectively, supporting both academic excellence and holistic student development.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Our Approach</h2>
              <p>
                The NQESH Reviewer application takes a comprehensive approach to exam preparation:
              </p>
              <ul className="list-disc list-inside space-y-2 pl-2">
                <li>
                  <span className="font-medium">Research-Based Content:</span> Our questions and explanations are meticulously researched and aligned with the latest NQESH framework, DepEd orders, and educational policies.
                </li>
                <li>
                  <span className="font-medium">Practical Focus:</span> Beyond theoretical knowledge, we emphasize practical applications and real-world scenarios that school heads face.
                </li>
                <li>
                  <span className="font-medium">User-Centered Design:</span> Our intuitive interface and thoughtful features were developed with the busy educator in mind, allowing for efficient and flexible study sessions.
                </li>
                <li>
                  <span className="font-medium">Continuous Improvement:</span> We regularly update our content based on feedback, policy changes, and emerging best practices in educational leadership.
                </li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Key Features</h2>
              <ul className="list-disc list-inside space-y-2 pl-2">
                <li>Comprehensive question bank covering all NQESH domains</li>
                <li>Detailed explanations with references for each question</li>
                <li>Categorized content for targeted studying</li>
                <li>Timed quiz sessions that simulate the actual exam conditions</li>
                <li>Performance tracking to identify areas for improvement</li>
                <li>Mobile-friendly design for studying on the go</li>
                <li>Dark mode support for comfortable reading in any environment</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Our Vision</h2>
              <p>
                We envision a future where every school in the Philippines is led by a competent, innovative, and compassionate leader. By democratizing access to high-quality NQESH preparation materials, we aim to contribute to this vision by helping talented educators successfully transition into impactful leadership roles.
              </p>
              <p>
                Our long-term goal is to build a community of practice among aspiring and current school leaders, fostering professional growth and excellence in educational leadership across the country.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">The Team</h2>
              <p>
                NQESH Reviewer was created by Mark Anthony Llego, an educational technology specialist with a passion for improving educational leadership in the Philippines. Built with input from experienced school administrators, educational policy experts, and NQESH passers, the platform reflects a collaborative effort to raise the standard of school leadership nationwide.
              </p>
              <p>
                We work closely with educators across the country to continually refine our content and ensure it remains relevant, accurate, and effective for NQESH preparation.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Join Us</h2>
              <p>
                Whether you're a teacher taking your first steps toward school leadership or an experienced educator looking to advance your career, NQESH Reviewer is designed to support your journey. We believe that with the right preparation, you can not only pass the NQESH but also develop the knowledge and skills needed to become an exceptional school leader.
              </p>
              <p>
                Start your preparation today, and take the first step toward making a broader impact on education in the Philippines.
              </p>
            </section>

            <div className="flex justify-center mt-6">
              <Link 
                to={href("/")}
                className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
              >
                Explore NQESH Reviewer
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}