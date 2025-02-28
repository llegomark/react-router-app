import { useEffect, useState } from 'react';
import { useNavigate, redirect } from 'react-router';
import { useQuizStore } from '~/store/quizStore';
import type { Route } from './+types/question';

export const meta: Route.MetaFunction = ({ data }) => {
  if (!data?.category) {
    return [
      { title: "Quiz - Error" },
      { name: "description", content: "Question not found" },
    ];
  }
  
  return [
    { title: `${data.category.name} - Question ${data.currentQuestionNumber}` },
    { name: "description", content: "Answer the quiz question" },
  ];
};

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
    throw redirect('/');
  }
  
  // Get all questions for this category
  const allQuestions = await context.db.query.questions.findMany({
    where: (questions: any, { eq }: any) => eq(questions.categoryId, categoryId),
  });
  
  if (allQuestions.length === 0) {
    throw redirect('/');
  }
  
  // Find the current question
  const question = allQuestions.find((q: any) => q.id === questionId);
  
  if (!question) {
    // If question not found, redirect to the first question of the category
    throw redirect(`/category/${categoryId}/${allQuestions[0].id}`);
  }
  
  // Create shuffled question list from session storage if it doesn't exist
  let shuffledQuestions;
  
  // Check if we're in the browser where sessionStorage is available
  const isClient = typeof window !== 'undefined';
  
  if (isClient && window.sessionStorage) {
    try {
      const storedQuestionsJson = window.sessionStorage.getItem(`shuffled_questions_${categoryId}`);
      
      if (!storedQuestionsJson) {
        // Shuffle the questions using a Fisher-Yates algorithm
        shuffledQuestions = [...allQuestions];
        for (let i = shuffledQuestions.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [shuffledQuestions[i], shuffledQuestions[j]] = [shuffledQuestions[j], shuffledQuestions[i]];
        }
        
        // Store shuffled questions in session storage
        try {
          window.sessionStorage.setItem(`shuffled_questions_${categoryId}`, JSON.stringify(shuffledQuestions.map((q: any) => q.id)));
        } catch (e) {
          console.error("Failed to store shuffled questions in session storage:", e);
        }
      } else {
        // Use the stored shuffled order
        const shuffledIds = JSON.parse(storedQuestionsJson);
        shuffledQuestions = shuffledIds.map((id: number) => allQuestions.find((q: any) => q.id === id)).filter(Boolean);
        
        // If we somehow have fewer questions than before, reset the shuffle
        if (shuffledQuestions.length !== allQuestions.length) {
          shuffledQuestions = [...allQuestions];
          try {
            window.sessionStorage.setItem(`shuffled_questions_${categoryId}`, JSON.stringify(shuffledQuestions.map((q: any) => q.id)));
          } catch (e) {
            console.error("Failed to update shuffled questions in session storage:", e);
          }
        }
      }
    } catch (error) {
      console.error("Failed to access sessionStorage:", error);
      shuffledQuestions = [...allQuestions];
    }
  } else {
    // On server-side, use the default order
    shuffledQuestions = [...allQuestions];
  }
  
  // Find the current index in the shuffled array
  const currentIndex = shuffledQuestions.findIndex((q: any) => q.id === question.id);
  const currentQuestionNumber = currentIndex + 1;
  const totalQuestions = shuffledQuestions.length;
  
  // Determine next question from the shuffled array
  const nextQuestion = currentIndex < totalQuestions - 1 
    ? shuffledQuestions[currentIndex + 1] 
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
    nextQuestionId: nextQuestion?.id,
  };
}

export default function Question({ loaderData }: Route.ComponentProps) {
  const { 
    category, 
    question, 
    currentQuestionNumber, 
    totalQuestions, 
    nextQuestionId 
  } = loaderData as any;
  
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  
  const { 
    timeRemaining, 
    isTimerActive, 
    selectAnswer, 
    startTimer, 
    decrementTimer, 
    resetTimer, 
    selectedAnswers,
    resetQuiz,
    resetShuffledQuestions, 
    endQuiz,
    setCurrentCategory,
    currentCategoryId
  } = useQuizStore();
  
  const selectedAnswer = selectedAnswers[question.id] ?? null;
  const hasAnswered = selectedAnswer !== null;
  
  // Set current category when component mounts or category changes
  useEffect(() => {
    // Only set the category once when it changes
    if (currentCategoryId !== category.id) {
      setCurrentCategory(category.id);
    }
  }, [category.id, currentCategoryId, setCurrentCategory]);

  // Handle timer in a separate effect - FIXED
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
      setIsLoading(true); // Show loading state
      resetTimer(); // Reset timer before navigation
      
      // Add a slight delay to ensure state updates before navigation
      setTimeout(() => {
        navigate(`/category/${category.id}/${nextQuestionId}`);
        // Loading state will be cleared when new component mounts
      }, 300);
    } else {
      // No more questions, go to results
      navigate(`/category/${category.id}/results`);
    }
  };
  
  // FIXED: handleEndQuiz now completely resets the quiz state and shuffled questions
  const handleEndQuiz = () => {
    // First end the quiz (sets isQuizEnded to true and stops timer)
    endQuiz();
    
    // Then completely reset all quiz state
    resetQuiz();
    
    // Also clear the shuffled questions for this category
    resetShuffledQuestions(category.id);
    
    // Clear any other relevant session storage items
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
        console.error("Failed to clean up session storage:", e);
      }
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
  
  // Clear loading state when component fully mounts with new question
  useEffect(() => {
    setIsLoading(false);
  }, [question.id]);
  
  return (
    <div className="container mx-auto p-4 max-w-2xl">
      {isLoading ? (
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-lg font-medium">Loading next question...</p>
        </div>
      ) : (
        <>
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-center mb-4">{category.name}</h1>
            <div className="flex justify-between items-center mb-2">
              <div className="font-medium">QID: {question.id}</div>
              <div className={`font-bold ${timeRemaining < 30 ? 'text-red-500' : ''}`}>
                Timer: {formatTime(timeRemaining)}
              </div>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 h-2 rounded-full overflow-hidden">
              <div 
                className="bg-blue-500 h-full transition-all duration-1000 ease-linear"
                style={{ width: `${(timeRemaining / 120) * 100}%` }}
              ></div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 mb-4">
            <h2 className="text-lg font-semibold mb-4">{question.question}</h2>
            
            <div className="space-y-3 mb-4">
              {question.options.map((option: string, index: number) => (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  disabled={hasAnswered || timeRemaining === 0}
                  className={`w-full text-left p-3 rounded-lg border transition-colors cursor-pointer ${
                    hasAnswered
                      ? index === question.correctAnswer
                        ? 'bg-green-100 dark:bg-green-900 border-green-500'
                        : index === selectedAnswer
                        ? 'bg-red-100 dark:bg-red-900 border-red-500'
                        : 'bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600'
                      : 'bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
            
            {(hasAnswered || timeRemaining === 0) && (
              <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900 rounded-lg">
                <h3 className="font-semibold mb-2">Explanation:</h3>
                <p className="mb-4">{question.explanation}</p>
                <div className="text-sm mt-4">
                  <p className="font-medium">Reference:</p>
                  <p>{question.referenceTitle} - <a href={question.referenceUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">{question.referenceUrl}</a></p>
                  <p className="mt-1">© {question.referenceCopyright}</p>
                </div>
              </div>
            )}
          </div>
          
          <div className="flex justify-between items-center">
            <button
              onClick={handleEndQuiz}
              className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg cursor-pointer"
            >
              End Quiz
            </button>
            
            <div className="text-sm font-medium">
              Question {currentQuestionNumber} of {totalQuestions}
            </div>
            
            {(hasAnswered || timeRemaining === 0) && (
              <button
                onClick={handleNextQuestion}
                className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg cursor-pointer"
              >
                {nextQuestionId ? 'Next Question' : 'See Results'}
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
}