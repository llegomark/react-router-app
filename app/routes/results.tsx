import { useState, useRef, useEffect } from 'react';
import { useNavigate, redirect } from 'react-router';
import * as schema from '~/database/schema';
import { useQuizStore } from '~/store/quizStore';

export function meta({ data }: any) {
  if (!data?.category) {
    return [
      { title: "Quiz - Error" },
      { name: "description", content: "Results not found" },
    ];
  }
  
  return [
    { title: `${data.category.name} - Results` },
    { name: "description", content: "Your quiz results" },
  ];
}

export async function loader({ params, context }: any) {
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

export default function Results({ loaderData }: any) {
  const { category, questions } = loaderData;
  const navigate = useNavigate();
  const { selectedAnswers, resetQuiz, resetShuffledQuestions } = useQuizStore();
  
  // Navigation state
  const [isNavigating, setIsNavigating] = useState(false);
  const navigationTarget = useRef<string | null>(null);
  
  // Calculate score
  const totalQuestions = questions.length;
  const answeredQuestions = Object.keys(selectedAnswers).length;
  const correctAnswers = questions.filter(
    (q: any) => selectedAnswers[q.id] === q.correctAnswer
  ).length;
  
  const score = totalQuestions > 0 ? Math.round((correctAnswers / totalQuestions) * 100) : 0;
  
  // Use effect to handle navigation after state updates
  useEffect(() => {
    if (isNavigating && navigationTarget.current) {
      const target = navigationTarget.current;
      
      // Reset quiz state
      resetQuiz();
      resetShuffledQuestions(category.id);
      
      // Navigate using the stored target
      navigate(target);
    }
  }, [isNavigating, navigate, resetQuiz, resetShuffledQuestions, category.id]);
  
  // Handle try again action
  const handleTryAgain = () => {
    // Set target for first question
    const firstQuestionUrl = questions.length > 0 
      ? `/category/${category.id}/${questions[0].id}` 
      : `/category/${category.id}/1`;
    
    navigationTarget.current = firstQuestionUrl;
    setIsNavigating(true);
  };
  
  // Handle back to home action
  const handleBackToHome = () => {
    navigationTarget.current = '/';
    setIsNavigating(true);
  };
  
  // Get performance message based on score
  const getPerformanceMessage = (score: number) => {
    if (score >= 90) return "Excellent! You've mastered this topic!";
    if (score >= 75) return "Great job! You have a solid understanding.";
    if (score >= 60) return "Good effort! You're on the right track.";
    if (score >= 40) return "Keep practicing! You're making progress.";
    return "Don't give up! Try again to improve your score.";
  };
  
  // Hide warning message completely if navigating
  if (isNavigating) {
    return (
      <div className="container mx-auto p-4 max-w-lg">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h1 className="text-2xl font-bold text-center mb-6">{category.name} - Quiz Results</h1>
          <div className="text-center">
            <div className="text-5xl font-bold mb-2">{score}%</div>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto p-4 max-w-lg">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-center mb-6">{category.name} - Quiz Results</h1>
        
        <div className="text-center mb-6">
          <div className="text-5xl font-bold mb-2">
            {score}%
          </div>
          <p className="text-lg mb-3">
            You answered {correctAnswers} out of {totalQuestions} questions correctly.
          </p>
          <p className="text-base italic">
            {getPerformanceMessage(score)}
          </p>
        </div>
        
        {answeredQuestions < totalQuestions && (
          <div className="mb-6 p-3 bg-yellow-100 dark:bg-yellow-900 rounded-lg text-center text-sm">
            <p>You didn't complete all questions in the quiz.</p>
          </div>
        )}
        
        <div className="flex flex-col space-y-3 sm:flex-row sm:space-y-0 sm:space-x-4 justify-center">
          <button
            onClick={handleTryAgain}
            className="px-5 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium cursor-pointer"
          >
            Try Again
          </button>
          <button
            onClick={handleBackToHome}
            className="px-5 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg font-medium cursor-pointer"
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}