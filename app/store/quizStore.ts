import { create } from 'zustand';
import { z } from 'zod';

// Define schemas for type validation
export const CategorySchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string(),
  icon: z.string(),
});

export const ReferenceSchema = z.object({
  title: z.string(),
  url: z.string().url(),
  copyright: z.string(),
});

export const QuestionSchema = z.object({
  id: z.number(),
  question: z.string(),
  options: z.array(z.string()),
  correctAnswer: z.number(),
  explanation: z.string(),
  reference: ReferenceSchema,
});

export type Category = z.infer<typeof CategorySchema>;
export type Question = z.infer<typeof QuestionSchema>;

interface QuizState {
  currentCategoryId: number | null;
  currentQuestionIndex: number;
  selectedAnswers: Record<number, number | null>; // questionId -> selectedOptionIndex
  timeRemaining: number; // in seconds
  isTimerActive: boolean;
  isQuizEnded: boolean;

  // Actions
  setCurrentCategory: (categoryId: number) => void;
  setCurrentQuestionIndex: (index: number) => void;
  selectAnswer: (questionId: number, optionIndex: number) => void;
  startTimer: () => void;
  stopTimer: () => void;
  resetTimer: () => void;
  decrementTimer: () => void;
  endQuiz: () => void;
  resetQuiz: () => void;
}

export const useQuizStore = create<QuizState>((set) => ({
  currentCategoryId: null,
  currentQuestionIndex: 0,
  selectedAnswers: {},
  timeRemaining: 120, // 2 minutes in seconds
  isTimerActive: false,
  isQuizEnded: false,

  setCurrentCategory: (categoryId) => {
    set({
      currentCategoryId: categoryId,
      currentQuestionIndex: 0,
      selectedAnswers: {},
      isQuizEnded: false,
      timeRemaining: 120,
      isTimerActive: true
    });
  },

  setCurrentQuestionIndex: (index) => set(() => ({
    currentQuestionIndex: index,
    timeRemaining: 120,
    isTimerActive: true
  })),

  selectAnswer: (questionId, optionIndex) => set((state) => ({
    selectedAnswers: { ...state.selectedAnswers, [questionId]: optionIndex },
    isTimerActive: false,
  })),

  startTimer: () => set({ isTimerActive: true }),

  stopTimer: () => set({ isTimerActive: false }),

  resetTimer: () => set({ timeRemaining: 120, isTimerActive: true }),

  decrementTimer: () => set((state) => {
    if (state.timeRemaining <= 0) {
      return {
        timeRemaining: 0,
        isTimerActive: false
      };
    }
    return {
      timeRemaining: state.timeRemaining - 1
    };
  }),

  endQuiz: () => set({ isQuizEnded: true, isTimerActive: false }),

  resetQuiz: () => set({
    currentQuestionIndex: 0,
    selectedAnswers: {},
    timeRemaining: 120,
    isTimerActive: true,
    isQuizEnded: false,
  }),

}));
