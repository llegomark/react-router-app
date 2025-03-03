import { useNavigate, redirect } from 'react-router';
import { useQuizStore } from '~/store/quizStore';
import type { Route } from './+types/results';

export const meta: Route.MetaFunction = ({ data, location }) => {
  const url = location.pathname
  const domain = "https://nqesh.com"
  const fullUrl = `${domain}${url}`

  let title = "NQESH Review Results - NQESH Reviewer";
  let description = "NQESH Reviewer quiz results";

  if (data?.category) {
    title = `${data.category.name} Review Results - NQESH Reviewer`;
    description = `Review your results for the ${data.category.name} category NQESH practice quiz. See your score and identify areas for improvement.`;
  } else {
    title = "Review Results Error - NQESH Reviewer";
    description = "Error: Results not found for NQESH Reviewer Quiz.";
  }

  return [
    { title: title },
    { name: "description", content: description },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:url", content: fullUrl },
    { property: "og:type", content: "website" },
    { property: "og:image", content: `${domain}/og-image.jpg` },
    { property: "og:image:width", content: "1200" },
    { property: "og:image:height", content: "630" },
    { property: "og:image:alt", content: "NQESH Reviewer Quiz Results" },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:site", content: "@nqeshreviewer" },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
    { name: "twitter:image", content: `${domain}/twitter-image.jpg` },
    { rel: "canonical", href: fullUrl },
  ];
};

export async function loader({ params, context }: Route.LoaderArgs) {
  const categoryId = Number(params.categoryId);

  if (isNaN(categoryId)) {
    throw redirect('/');
  }

  // Get the category
  const category = await context.db.query.categories.findFirst({
    where: (categories: any, { eq }: any) => eq(categories.id, categoryId)
  });

  if (!category) {
    throw redirect('/');
  }

  // Get all questions for this category
  const questions = await context.db.query.questions.findMany({
    where: (questions: any, { eq }: any) => eq(questions.categoryId, categoryId)
  });

  return {
    category,
    questions,
  };
}

export default function Results({ loaderData }: Route.ComponentProps) {
  const { category, questions } = loaderData as any;
  const navigate = useNavigate();
  const { selectedAnswers, resetQuiz } = useQuizStore(); // Removed resetShuffledQuestions

  // Calculate score
  const totalQuestions = questions.length;
  const answeredQuestions = Object.keys(selectedAnswers).length;
  const correctAnswers = questions.filter(
    (q: any) => selectedAnswers[q.id] === q.correctAnswer
  ).length;

  const score = totalQuestions > 0 ? Math.round((correctAnswers / totalQuestions) * 100) : 0;

  // Handle try again action
  const handleTryAgain = () => {
    // Reset quiz state first
    resetQuiz();

    // Navigate directly
    const firstQuestionUrl = questions.length > 0
      ? `/category/${category.id}/${questions[0].id}`
      : `/category/${category.id}/1`;

    navigate(firstQuestionUrl);
  };

  // Handle back to home action to reset quiz state
  const handleBackToHome = () => {
    // Reset quiz state first
    resetQuiz();

    // Clear any other relevant session storage items, similar to End Quiz for consistency
    if (typeof window !== 'undefined' && window.sessionStorage) {
      try {
        // Optional: Clear any other session storage related to this quiz
        // This ensures a completely clean slate when the user returns
        const keysToRemove = [];
        for (let i = 0; i < window.sessionStorage.length; i++) {
          const key = window.sessionStorage.key(i);
          if (key && key.includes(`${category.id}`)) {
            keysToRemove.push(key);
          }
        }

        keysToRemove.forEach(key => window.sessionStorage.removeItem(key));
      } catch (e) {
        console.error("Failed to clean up session storage on Back to Home:", e);
      }
    }

    // Navigate directly to home
    navigate('/');
  };

  // Get performance message based on score
  const getPerformanceMessage = (score: number) => {
    if (score >= 90) return "Excellent! You've mastered this topic!";
    if (score >= 75) return "Great job! You have a solid understanding.";
    if (score >= 60) return "Good effort! You're on the right track.";
    if (score >= 40) return "Keep practicing! You're making progress.";
    return "Don't give up! Try again to improve your score.";
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 py-8 md:py-12">
      <div className="container mx-auto px-4 max-w-2xl">
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 p-8">
          <h1 className="text-2xl font-bold text-center mb-8 text-gray-900 dark:text-white">
            {category.name} - Review Results
          </h1>

          <div className="text-center mb-8">
            <div className={`text-6xl font-bold mb-4 ${
              score >= 75 ? 'text-green-600 dark:text-green-400' : 
              score >= 50 ? 'text-yellow-600 dark:text-yellow-400' : 
              'text-red-600 dark:text-red-400'
            }`}>
              {score}%
            </div>
            <p className="text-lg mb-4 text-gray-700 dark:text-gray-300">
              You answered {correctAnswers} out of {totalQuestions} questions correctly.
            </p>
            <p className="text-base italic text-gray-600 dark:text-gray-400">
              {getPerformanceMessage(score)}
            </p>
          </div>

          {answeredQuestions < totalQuestions && (
            <div className="mb-8 p-4 bg-yellow-50 dark:bg-yellow-950 rounded-lg border border-yellow-200 dark:border-yellow-900 text-center">
              <p className="text-yellow-800 dark:text-yellow-300">You didn't complete all questions in the quiz.</p>
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handleTryAgain}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors cursor-pointer"
            >
              Try Again
            </button>
            <button
              onClick={handleBackToHome}
              className="px-6 py-3 bg-gray-500 hover:bg-gray-600 text-white rounded-lg font-medium transition-colors cursor-pointer"
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
