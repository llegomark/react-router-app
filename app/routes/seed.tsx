import { data } from 'react-router';
import * as schema from '~/database/schema';

export function meta() {
  return [
    { title: "Seed Database" },
    { name: "description", content: "Seed the database with quiz data" },
  ];
}

export async function action({ context }: any) {
  // Sample quiz data based on the example
  const categories = [
    {
      id: 1234567,
      name: "School Leadership and Management",
      description: "Questions focusing on leadership theories, management principles, and best practices in a school setting.",
      icon: "🏫",
    },
    // Add more categories as needed
    {
      id: 7654321,
      name: "Educational Technology",
      description: "Questions about integrating technology effectively in educational settings and digital learning tools.",
      icon: "💻",
    },
    {
      id: 9876543,
      name: "Classroom Management",
      description: "Questions about creating a positive learning environment and managing student behavior effectively.",
      icon: "📚",
    }
  ];
  
  const questions = [
    {
      id: 1553214,
      categoryId: 1234567,
      question: "You are a newly appointed school head in a school with a history of low academic performance. Initial data suggests poor teacher morale and a lack of clear direction. Which leadership approach would be MOST effective in initiating positive change?",
      options: JSON.stringify([
        "Autocratic leadership, to quickly establish control and order.",
        "Laissez-faire leadership, to empower teachers to find their own solutions.",
        "Transformational leadership, to inspire and motivate teachers towards a shared vision.",
        "Transactional leadership, to focus on immediate rewards and punishments for performance.",
      ]),
      correctAnswer: 2,
      explanation: "Transformational leadership focuses on inspiring and motivating followers to achieve significant outcomes and organizational change, which is crucial in a school needing improvement in morale and direction.",
      referenceTitle: "EDCOM II Year Two Report",
      referenceUrl: "https://deped.gov.ph",
      referenceCopyright: "Mark Anthony Llego",
    },
    {
      id: 2314321,
      categoryId: 1234567,
      question: "During a faculty meeting, teachers express frustration about unclear communication channels and inconsistent implementation of school policies. As the school head, what initial step should you take to address this issue?",
      options: JSON.stringify([
        "Immediately revise all school policies and communication protocols.",
        "Form a committee to investigate the source of communication breakdown.",
        "Facilitate an open forum to discuss communication challenges and collaboratively develop solutions.",
        "Issue a memo reminding everyone to adhere to existing policies and communication channels.",
      ]),
      correctAnswer: 2,
      explanation: "Facilitating an open forum promotes collaboration and shared ownership in identifying and resolving communication issues. It encourages teachers to voice their concerns and contribute to solutions.",
      referenceTitle: "EDCOM II Year Two Report",
      referenceUrl: "https://deped.gov.ph",
      referenceCopyright: "Mark Anthony Llego",
    },
    // Educational Technology questions
    {
      id: 3456789,
      categoryId: 7654321,
      question: "Which of the following is most important when evaluating educational technology tools for classroom use?",
      options: JSON.stringify([
        "The cost of the technology and available budget.",
        "How recently the technology was released to the market.",
        "Alignment with curriculum objectives and student learning needs.",
        "The popularity of the technology among other schools.",
      ]),
      correctAnswer: 2,
      explanation: "When evaluating educational technology, the most important consideration is how well it aligns with curriculum objectives and student learning needs. Tools should enhance teaching and learning rather than being used simply because they are new or popular.",
      referenceTitle: "Educational Technology Integration Guide",
      referenceUrl: "https://edtech.education.gov",
      referenceCopyright: "Mark Anthony Llego",
    },
    // Classroom Management questions
    {
      id: 5678901,
      categoryId: 9876543,
      question: "A student consistently disrupts your class with inappropriate comments. Which approach would be most effective?",
      options: JSON.stringify([
        "Immediately send the student to the principal's office with each disruption.",
        "Ignore the behavior to avoid giving the student attention.",
        "Speak with the student privately to understand underlying issues and set clear expectations.",
        "Move the student's seat to an isolated part of the classroom.",
      ]),
      correctAnswer: 2,
      explanation: "Speaking privately with the student shows respect while addressing the issue directly. This approach helps identify potential underlying causes for the behavior (such as learning difficulties or home issues) and allows for collaborative problem-solving without public embarrassment.",
      referenceTitle: "Positive Classroom Management Strategies",
      referenceUrl: "https://teachersupport.edu",
      referenceCopyright: "Mark Anthony Llego",
    }
  ];
  
  // Clear existing data
  try {
    try {
      // Try to delete existing data if tables exist
      await context.db.delete(schema.questions);
      await context.db.delete(schema.categories);
    } catch (error: unknown) {
      if (typeof error === 'object' && error !== null && 'toString' in error && 
          !error.toString().includes("no such table")) {
        throw error; // Re-throw if it's not a "no such table" error
      }
      // Otherwise, tables don't exist yet, which is fine for seeding
      return data({
        success: false,
        message: "Database migration required. Please run 'npm run db:migrate' first.",
        needsMigration: true
      }, { status: 400 });
    }
    
    // If we get here, tables exist and we can seed
    // Insert categories
    for (const category of categories) {
      await context.db.insert(schema.categories).values(category);
    }
    
    // Insert questions
    for (const question of questions) {
      await context.db.insert(schema.questions).values(question);
    }
    
    return data({ 
      success: true, 
      message: "Database seeded successfully! Quiz data is ready to use." 
    });
  } catch (error) {
    console.error("Failed to seed database:", error);
    return data(
      { 
        success: false, 
        message: "Failed to seed database. See server logs for details." 
      },
      { status: 500 }
    );
  }
}

export default function Seed({ actionData }: any) {
  return (
    <div className="container mx-auto p-4 max-w-lg">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
        <h1 className="text-2xl font-bold mb-6 text-center">Seed Quiz Database</h1>
        
        {actionData && (
          <div className={`p-4 mb-6 rounded-lg ${
            actionData.success 
              ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200' 
              : 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200'
          }`}>
            {actionData.message}
            
            {actionData.needsMigration && (
              <div className="mt-4 p-4 bg-yellow-100 dark:bg-yellow-900 rounded-lg">
                <p className="font-medium mb-2">Please run this command in your terminal:</p>
                <div className="bg-gray-800 text-white p-3 rounded-md text-left font-mono overflow-x-auto">
                  npm run db:migrate
                </div>
                <p className="mt-2">Then return to this page to seed the database.</p>
              </div>
            )}
          </div>
        )}
        
        <div className="mb-8">
          <p className="mb-4">This page will populate the database with sample quiz data including categories and questions.</p>
          <p className="mb-4 font-medium">Warning: This will delete any existing quiz data!</p>
        </div>
        
        <form method="post" className="text-center">
          <button
            type="submit"
            className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium"
          >
            Seed Database
          </button>
        </form>
        
        <div className="mt-8 border-t pt-6">
          <h2 className="text-lg font-medium mb-3">Having Database Issues?</h2>
          <p className="mb-3">If you're seeing database errors, please try the following steps:</p>
          <ol className="list-decimal list-inside space-y-2 mb-4">
            <li>Run migrations: <code className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">npm run db:migrate</code></li>
            <li>Return to this page and seed the database</li>
            <li>If issues persist, check the console for detailed errors</li>
          </ol>
        </div>
      </div>
    </div>
  );
}
