import { useEffect, useState } from 'react';
import { useNavigate, redirect, data } from 'react-router';
import { useQuizStore } from '~/store/quizStore';
import type { Route } from './+types/question';

export const meta: Route.MetaFunction = ({ data, location }) => {
  const url = location.pathname
  const domain = "https://nqesh.com"
  const fullUrl = `${domain}${url}`

  let title = "Question - NQESH Reviewer";
  let description = "Answer the quiz question";

  if (data?.category) {
    title = `${data.category.name} - Question ${data.currentQuestionNumber} - NQESH Reviewer`;
    description = `Answer question ${data.currentQuestionNumber} in the ${data.category.name} category for your NQESH exam preparation.`;
  } else {
    title = "Error - NQESH Reviewer";
    description = "Error: Question not found for NQESH Reviewer Quiz.";
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
    { property: "og:image:alt", content: "NQESH Reviewer Quiz Question" },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:site", content: "@nqeshreviewer" },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
    { name: "twitter:image", content: `${domain}/twitter-image.jpg` },
    { rel: "canonical", href: fullUrl },
  ];
};

interface Category {
  id: number;
  name: string;
  description: string;
  icon: string;
}

interface Question {
  id: number;
  categoryId: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  referenceTitle: string;
  referenceUrl: string;
  referenceCopyright: string;
}

interface LoaderData {
  category: Category;
  question: Question;
  currentQuestionNumber: number;
  totalQuestions: number;
  nextQuestionId: number | null;
}

export async function loader({ params, context }: Route.LoaderArgs) {
  const categoryId = Number(params.categoryId);
  const questionId = Number(params.questionId);

  if (isNaN(categoryId) || isNaN(questionId)) {
    throw redirect('/');
  }

  // Get the category
  const category = await context.db.query.categories.findFirst({
    where: (categories: any, { eq }: any) => eq(categories.id, categoryId)
  });

  if (!category) {
    throw data({ message: "Category not found" }, { status: 404 });
  }

  // Get all questions for this category
  const allQuestions = await context.db.query.questions.findMany({
    where: (questions: any, { eq }: any) => eq(questions.categoryId, categoryId),
  });

  if (allQuestions.length === 0) {
    throw data({ message: "No questions found for this category" }, { status: 404 });
  }

  // Find the current question
  const question = allQuestions.find((q: any) => q.id === questionId);

  if (!question) {
    // If question not found, redirect to the first question of the category
    throw redirect(`/category/${categoryId}/${allQuestions[0].id}`);
  }

  // Find the current index in the original array for numbering
  const currentIndex = allQuestions.findIndex((q: any) => q.id === question.id);
  const currentQuestionNumber = currentIndex + 1;
  const totalQuestions = allQuestions.length;

  // Determine next question from the ordered array
  const nextQuestion = currentIndex < totalQuestions - 1
    ? allQuestions[currentIndex + 1]
    : null;

  // Parse options which are stored as JSON string
  const parsedOptions = JSON.parse(question.options);

  return {
    category,
    question: {
      ...question,
      options: parsedOptions
    },
    currentQuestionNumber,
    totalQuestions,
    nextQuestionId: nextQuestion?.id
  } as LoaderData;
}

export default function Question({ loaderData }: Route.ComponentProps) {
  const {
    category,
    question,
    currentQuestionNumber,
    totalQuestions,
    nextQuestionId
  } = loaderData as LoaderData;

  const navigate = useNavigate();
  const [isVerified, setIsVerified] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const {
    timeRemaining,
    isTimerActive,
    selectAnswer,
    startTimer,
    decrementTimer,
    resetTimer,
    selectedAnswers,
    resetQuiz,
    endQuiz,
    setCurrentCategory,
    currentCategoryId
  } = useQuizStore();

  const selectedAnswer = selectedAnswers[question.id] ?? null;
  const hasAnswered = selectedAnswer !== null;

  // Check if user has completed Turnstile verification
  useEffect(() => {
    // Check verification status
    const checkVerification = () => {
      try {
        const verificationData = localStorage.getItem('turnstile_verified');
        
        if (!verificationData) {
          setIsVerified(false);
          setIsLoading(false);
          return;
        }
        
        setIsVerified(true);
        setIsLoading(false);
      } catch (error) {
        console.error("Error checking verification status:", error);
        setIsVerified(false);
        setIsLoading(false);
      }
    };
    
    checkVerification();
  }, []);

  // If verification status has been determined and user is not verified, redirect
  useEffect(() => {
    if (isVerified === false && !isLoading) {
      // Redirect to reviewer page
      navigate('/reviewer', { 
        state: { 
          redirectReason: 'verification_required',
          returnPath: window.location.pathname
        }
      });
    }
  }, [isVerified, isLoading, navigate]);

  // Set current category when component mounts or category changes
  useEffect(() => {
    // Only set the category once when it changes
    if (currentCategoryId !== category.id) {
      setCurrentCategory(category.id);
    }
  }, [category.id, currentCategoryId, setCurrentCategory]);

  // Handle timer in a separate effect
  useEffect(() => {
    // Reset and start timer when question changes (unless already answered)
    const alreadyAnswered = selectedAnswers[question.id] !== undefined;
    if (!alreadyAnswered) {
      resetTimer(); // This resets to 120 seconds and activates the timer
    }
  }, [question.id, resetTimer, selectedAnswers]);

  // Setup timer effect
  useEffect(() => {
    const interval = setInterval(() => {
      if (isTimerActive && !hasAnswered) {
        decrementTimer();
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [isTimerActive, decrementTimer, hasAnswered]);

  // Handle timer expiration
  useEffect(() => {
    if (timeRemaining === 0 && !hasAnswered) {
      // Timer expired, automatically mark as answered with no selection
      selectAnswer(question.id, -1);
    }
  }, [timeRemaining, hasAnswered, selectAnswer, question.id]);

  const handleAnswerSelect = (optionIndex: number) => {
    if (!hasAnswered && timeRemaining > 0) {
      selectAnswer(question.id, optionIndex);
    }
  };

  const handleNextQuestion = () => {
    if (nextQuestionId) {
      resetTimer(); // Reset timer before navigation
      navigate(`/category/${category.id}/${nextQuestionId}`);
    } else {
      // No more questions, go to results
      navigate(`/category/${category.id}/results`);
    }
  };

  const handleEndQuiz = () => {
    // First end the quiz (sets isQuizEnded to true and stops timer)
    endQuiz();

    // Then completely reset all quiz state
    resetQuiz();

    // Clear any other relevant session storage items
    try {
      // Clear any other session storage related to this quiz
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
      console.error("Failed to clean up session storage:", e);
    }

    // Navigate back to home
    navigate('/');
  };

  // Format time remaining
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  // Show loading state while checking verification
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center">
        <div className="text-center p-8">
          <div className="animate-spin h-10 w-10 mx-auto mb-4 border-4 border-blue-600 dark:border-blue-400 border-t-transparent rounded-full"></div>
          <p className="text-gray-700 dark:text-gray-300">Loading question...</p>
        </div>
      </div>
    );
  }

  // Main content is only shown if user is verified
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 py-8 md:py-12">
      <div className="container mx-auto px-4 max-w-2xl">
        <div className="mb-8 bg-white dark:bg-gray-900 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800">
          <h1 className="text-2xl font-bold text-center mb-6 text-gray-900 dark:text-white">{category.name}</h1>
          <div className="flex justify-between items-center mb-3">
            <div className="font-medium text-gray-700 dark:text-gray-300">Question {currentQuestionNumber} of {totalQuestions}</div>
            <div className={`font-bold ${timeRemaining < 30 ? 'text-red-600 dark:text-red-400' : 'text-blue-600 dark:text-blue-400'}`}>
              Time: {formatTime(timeRemaining)}
            </div>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 h-2.5 rounded-full overflow-hidden mb-6">
            <div
              className="bg-blue-600 h-full transition-all duration-1000 ease-linear"
              style={{ width: `${(timeRemaining / 120) * 100}%` }}
            ></div>
          </div>

          <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 mb-6">
            <h2 className="text-lg font-semibold mb-6 text-gray-900 dark:text-white">{question.question}</h2>

            <div className="space-y-3 mb-6">
              {question.options.map((option: string, index: number) => (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  disabled={hasAnswered || timeRemaining === 0}
                  className={`w-full text-left p-4 rounded-lg border transition-colors cursor-pointer ${hasAnswered
                      ? index === question.correctAnswer
                        ? 'bg-green-50 dark:bg-green-950 border-green-500 text-green-900 dark:text-green-300'
                        : index === selectedAnswer
                          ? 'bg-red-50 dark:bg-red-950 border-red-500 text-red-900 dark:text-red-300'
                          : 'bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300'
                      : 'bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
                    }`}
                >
                  {option}
                </button>
              ))}
            </div>

            {(hasAnswered || timeRemaining === 0) && (
              <div className="mt-8 p-6 bg-blue-50 dark:bg-blue-950 rounded-xl border border-blue-200 dark:border-blue-900">
                <h3 className="font-semibold mb-3 text-blue-900 dark:text-blue-300">Explanation:</h3>
                <p className="mb-6 text-gray-700 dark:text-gray-300">{question.explanation}</p>
                <div className="text-sm mt-4 border-t border-blue-200 dark:border-blue-900 pt-4">
                  <p className="font-medium text-gray-700 dark:text-gray-300">Reference:</p>
                  <p className="text-gray-600 dark:text-gray-400">
                    {question.referenceTitle} -
                    <a
                      href={question.referenceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 dark:text-blue-400 hover:underline ml-1"
                    >
                      {question.referenceUrl}
                    </a>
                  </p>
                  <p className="mt-1 text-gray-500 dark:text-gray-500">© {question.referenceCopyright}</p>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-between items-center bg-white dark:bg-gray-900 p-4 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800">
          <button
            onClick={handleEndQuiz}
            className="px-5 py-2.5 bg-gray-500 hover:bg-gray-600 text-white rounded-lg font-medium transition-colors cursor-pointer"
          >
            Exit Review
          </button>

          {(hasAnswered || timeRemaining === 0) && (
            <button
              onClick={handleNextQuestion}
              className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors cursor-pointer"
            >
              {nextQuestionId ? 'Next Question' : 'See Results'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}