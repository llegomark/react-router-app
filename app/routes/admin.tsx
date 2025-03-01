import { useState, useEffect } from 'react';
import { data, useFetcher, useSearchParams } from 'react-router';
import { sql } from 'drizzle-orm';
import * as schema from '~/database/schema';
import type { Route } from './+types/admin';

// Define page size for questions
const QUESTIONS_PER_PAGE = 50;

// Define proper type interfaces for loader data
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
  options: string;
  correctAnswer: number;
  explanation: string;
  referenceTitle: string;
  referenceUrl: string;
  referenceCopyright: string;
}

interface ContactMessage {
  id: number;
  name: string;
  email: string;
  mobileNumber: string | null;
  message: string;
  status: string;
  createdAt: string;
}

interface LoaderData {
  categories: Category[];
  contactMessages: ContactMessage[];
  allQuestions: Question[];
  pagination: {
    currentPage: number;
    totalPages: number;
  };
  error?: string;
}

export const meta: Route.MetaFunction = () => {
  return [
    { title: "NQESH Reviewer Admin Panel" },
    { name: "description", content: "Manage quiz categories and questions" },
  ];
};

export async function loader({ context, request }: Route.LoaderArgs) {
  try {
    const categories = await context.db.query.categories.findMany();

    // Pagination logic for all questions
    const url = new URL(request.url);
    const page = Number(url.searchParams.get('page')) || 1; // Default to page 1
    const offset = (page - 1) * QUESTIONS_PER_PAGE;
    const limit = QUESTIONS_PER_PAGE;

    // Fetch paginated questions WITHOUT relations
    const allQuestions = await context.db.query.questions.findMany({
      limit,
      offset,
    });

    // Fetch total count of questions for pagination
    const totalQuestionsCount = await context.db.query.questions.findMany();

    // Use sql`` template literal for orderBy to fix the type error
    const contactMessages = await context.db.select().from(schema.contactSubmissions)
      .orderBy(sql`created_at DESC`);

    return {
      categories,
      contactMessages,
      allQuestions,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(totalQuestionsCount.length / QUESTIONS_PER_PAGE),
      }
    } as LoaderData;
  } catch (error) {
    console.error("Failed to load data:", error);
    // Instead of returning an object with error, throw a Response for consistent error handling
    throw data({ 
      message: "Failed to load admin data" 
    }, { 
      status: 500 
    });
  }
}

interface ActionData {
  success: boolean;
  message: string;
  category?: Category;
  messageId?: number;
  newStatus?: string;
}

export async function action({ context, request }: Route.ActionArgs) {
  const formData = await request.formData();
  const action = formData.get('action');

  const isValidUrl = (url: string) => {
    try {
      new URL(url);
      return true;
    } catch (e) {
      return false;
    }
  };

  try {
    // Add a new category
    if (action === 'add-category') {
      const id = Number(formData.get('id'));
      const name = formData.get('name') as string;
      const description = formData.get('description') as string;
      const icon = formData.get('icon') as string;

      if (!id || !name || !description || !icon) {
        return data({ 
          success: false, 
          message: "All fields are required" 
        } as ActionData, { 
          status: 400 
        });
      }

      const newCategory = { id, name, description, icon }; // Create new category object
      await context.db.insert(schema.categories).values(newCategory);

      return data({ 
        success: true, 
        message: "Category added successfully", 
        category: newCategory 
      } as ActionData);
    }

    // Add a new question
    if (action === 'add-question') {
      const id = Number(formData.get('id'));
      const categoryId = Number(formData.get('categoryId'));
      const question = formData.get('question') as string;
      const option1 = formData.get('option1') as string;
      const option2 = formData.get('option2') as string;
      const option3 = formData.get('option3') as string;
      const option4 = formData.get('option4') as string;
      const correctAnswer = Number(formData.get('correctAnswer'));
      const explanation = formData.get('explanation') as string;
      const referenceTitle = formData.get('referenceTitle') as string;
      const referenceUrl = formData.get('referenceUrl') as string;
      const referenceCopyright = formData.get('referenceCopyright') as string;

      if (!id || !categoryId || !question ||
        !option1 || !option2 || !option3 || !option4 ||
        (correctAnswer < 0 || correctAnswer > 3) ||
        !explanation || !referenceTitle || !referenceUrl || !referenceCopyright) {
        return data({ 
          success: false, 
          message: "All fields are required and must be valid" 
        } as ActionData, { 
          status: 400 
        });
      }

      if (!isValidUrl(referenceUrl)) {
        return data({
          success: false,
          message: "Reference URL must be a valid URL format"
        } as ActionData, { 
          status: 400 
        });
      }

      const options = JSON.stringify([option1, option2, option3, option4]);

      await context.db.insert(schema.questions).values({
        id,
        categoryId,
        question,
        options,
        correctAnswer,
        explanation,
        referenceTitle,
        referenceUrl,
        referenceCopyright
      });

      return data({ 
        success: true, 
        message: "Question added successfully" 
      } as ActionData);
    }

    // Toggle message status
    if (action === 'toggle-message-status') {
      const messageId = Number(formData.get('messageId'));
      const currentStatus = formData.get('currentStatus') as string;
      const newStatus = currentStatus === 'unread' ? 'read' : 'unread';

      if (!messageId) {
        return data({ 
          success: false, 
          message: "Invalid message ID" 
        } as ActionData, { 
          status: 400 
        });
      }

      await context.db.update(schema.contactSubmissions)
        .set({ status: newStatus })
        .where(sql`id = ${messageId}`);

      return data({
        success: true,
        message: `Message marked as ${newStatus}`,
        messageId,
        newStatus
      } as ActionData);
    }

    return data({ 
      success: false, 
      message: "Unknown action" 
    } as ActionData, { 
      status: 400 
    });
  } catch (error: any) {
    console.error("Action error:", error);
    throw data({
      message: `Error: ${error?.message || "Unknown error"}`
    }, { status: 500 });
  }
}

export default function Admin({ loaderData, actionData }: Route.ComponentProps) {
  const {
    categories: initialCategories,
    contactMessages: initialMessages,
    allQuestions: initialQuestions,
    pagination: initialPagination,
  } = loaderData as LoaderData;

  const [categories, setCategories] = useState(initialCategories || []);
  const [messages, setMessages] = useState(initialMessages || []);
  const [questions, setQuestions] = useState(initialQuestions || []);
  const [pagination, setPagination] = useState(initialPagination);
  const [activeTab, setActiveTab] = useState<'categories' | 'questions' | 'allquestions' | 'messages'>('categories');
  const addCategoryFetcher = useFetcher();
  const addQuestionFetcher = useFetcher();
  const messageStatusFetcher = useFetcher();
  const [searchParams, setSearchParams] = useSearchParams();

  // Optimistically update categories on successful category add
  useEffect(() => {
    if (addCategoryFetcher.data && addCategoryFetcher.data.success && addCategoryFetcher.data.category) {
      setCategories(prevCategories => [...prevCategories, addCategoryFetcher.data.category]);
    }
  }, [addCategoryFetcher.data]);

  // Optimistically update message status
  useEffect(() => {
    if (messageStatusFetcher.data && messageStatusFetcher.data.success) {
      setMessages(prevMessages =>
        prevMessages.map(message =>
          message.id === messageStatusFetcher.data.messageId
            ? { ...message, status: messageStatusFetcher.data.newStatus }
            : message
        )
      );
    }
  }, [messageStatusFetcher.data]);

  // Update questions and pagination when loaderData changes
  useEffect(() => {
    setQuestions(initialQuestions);
    setPagination(initialPagination);
  }, [initialQuestions, initialPagination]);

  const handlePageChange = (newPage: number) => {
    setSearchParams({ page: String(newPage) });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 py-8">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 mb-8">
          <h1 className="text-3xl font-bold p-6 text-center text-gray-900 dark:text-white">NQESH Reviewer Admin Panel</h1>

          {/* Simple, clean tabs design */}
          <div className="border-t border-gray-200 dark:border-gray-800">
            <div className="grid grid-cols-2 sm:grid-cols-4">
              <button
                onClick={() => setActiveTab('categories')}
                className={`py-3 text-center font-medium transition-colors ${activeTab === 'categories'
                    ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800/70'
                  }`}
              >
                Categories
              </button>
              <button
                onClick={() => setActiveTab('questions')}
                className={`py-3 text-center font-medium transition-colors ${activeTab === 'questions'
                    ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800/70'
                  }`}
              >
                Add Question
              </button>
              <button
                onClick={() => setActiveTab('allquestions')}
                className={`py-3 text-center font-medium transition-colors ${activeTab === 'allquestions'
                    ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800/70'
                  }`}
              >
                All Questions
              </button>
              <button
                onClick={() => setActiveTab('messages')}
                className={`py-3 text-center font-medium transition-colors ${activeTab === 'messages'
                    ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800/70'
                  }`}
              >
                Messages
              </button>
            </div>
          </div>
        </div>

        {actionData && (
          <div className={`p-4 mb-6 rounded-lg ${(actionData as ActionData).success
            ? 'bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-900 text-green-800 dark:text-green-300'
            : 'bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-900 text-red-800 dark:text-red-300'
            }`}>
            {(actionData as ActionData).message}
          </div>
        )}

        {activeTab === 'categories' && (
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800">
            <h2 className="text-xl font-bold p-6 border-b border-gray-200 dark:border-gray-800 text-gray-900 dark:text-white">Add New Category</h2>
            <addCategoryFetcher.Form method="post" className="p-6">
              <input type="hidden" name="action" value="add-category" />
              <div className="grid grid-cols-1 gap-4 mb-6">
                <div>
                  <label className="block mb-2 text-gray-700 dark:text-gray-300 font-medium">ID (numeric):</label>
                  <input
                    type="number"
                    name="id"
                    className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-3 focus:ring-blue-500 focus:border-blue-500 outline-hidden"
                    required
                  />
                </div>

                <div>
                  <label className="block mb-2 text-gray-700 dark:text-gray-300 font-medium">Name:</label>
                  <input
                    type="text"
                    name="name"
                    className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-3 focus:ring-blue-500 focus:border-blue-500 outline-hidden"
                    required
                  />
                </div>

                <div>
                  <label className="block mb-2 text-gray-700 dark:text-gray-300 font-medium">Description:</label>
                  <textarea
                    name="description"
                    className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-3 focus:ring-blue-500 focus:border-blue-500 outline-hidden"
                    rows={3}
                    required
                  ></textarea>
                </div>

                <div>
                  <label className="block mb-2 text-gray-700 dark:text-gray-300 font-medium">Icon (emoji):</label>
                  <input
                    type="text"
                    name="icon"
                    className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-3 focus:ring-blue-500 focus:border-blue-500 outline-hidden"
                    placeholder="🏫"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={addCategoryFetcher.state !== 'idle'}
                className="w-full px-5 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors cursor-pointer"
              >
                {addCategoryFetcher.state !== 'idle' ? 'Adding Category...' : 'Add Category'}
              </button>
            </addCategoryFetcher.Form>

            <div className="border-t border-gray-200 dark:border-gray-800">
              <h2 className="text-xl font-bold p-6 text-gray-900 dark:text-white">Existing Categories</h2>
              <div className="px-6 pb-6">
                {categories.length === 0 ? (
                  <p className="text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-800 p-6 rounded-lg text-center">
                    No categories yet. Add one above!
                  </p>
                ) : (
                  <div className="grid grid-cols-1 gap-4">
                    {categories.map((category: Category) => (
                      <div key={category.id} className="bg-gray-50 dark:bg-gray-800 p-5 rounded-lg">
                        <div className="flex items-center mb-3">
                          <span className="text-4xl mr-4">{category.icon}</span>
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{category.name}</h3>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{category.description}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">ID: {category.id}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'questions' && (
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800">
            <h2 className="text-xl font-bold p-6 border-b border-gray-200 dark:border-gray-800 text-gray-900 dark:text-white">Add New Question</h2>
            <addQuestionFetcher.Form method="post" className="p-6">
              <input type="hidden" name="action" value="add-question" />
              <div className="grid grid-cols-1 gap-4 mb-6">
                <div>
                  <label className="block mb-2 text-gray-700 dark:text-gray-300 font-medium">ID (numeric):</label>
                  <input
                    type="number"
                    name="id"
                    className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-3 focus:ring-blue-500 focus:border-blue-500 outline-hidden"
                    required
                  />
                </div>

                <div>
                  <label className="block mb-2 text-gray-700 dark:text-gray-300 font-medium">Category:</label>
                  <select
                    name="categoryId"
                    className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-3 focus:ring-blue-500 focus:border-blue-500 outline-hidden"
                    required
                  >
                    <option value="">Select a category</option>
                    {categories.map((category: Category) => (
                      <option key={category.id} value={category.id}>{category.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block mb-2 text-gray-700 dark:text-gray-300 font-medium">Question:</label>
                  <textarea
                    name="question"
                    className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-3 focus:ring-blue-500 focus:border-blue-500 outline-hidden"
                    rows={3}
                    required
                  ></textarea>
                </div>

                <div>
                  <label className="block mb-2 text-gray-700 dark:text-gray-300 font-medium">Option 1:</label>
                  <input
                    type="text"
                    name="option1"
                    className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-3 focus:ring-blue-500 focus:border-blue-500 outline-hidden"
                    required
                  />
                </div>

                <div>
                  <label className="block mb-2 text-gray-700 dark:text-gray-300 font-medium">Option 2:</label>
                  <input
                    type="text"
                    name="option2"
                    className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-3 focus:ring-blue-500 focus:border-blue-500 outline-hidden"
                    required
                  />
                </div>

                <div>
                  <label className="block mb-2 text-gray-700 dark:text-gray-300 font-medium">Option 3:</label>
                  <input
                    type="text"
                    name="option3"
                    className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-3 focus:ring-blue-500 focus:border-blue-500 outline-hidden"
                    required
                  />
                </div>

                <div>
                  <label className="block mb-2 text-gray-700 dark:text-gray-300 font-medium">Option 4:</label>
                  <input
                    type="text"
                    name="option4"
                    className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-3 focus:ring-blue-500 focus:border-blue-500 outline-hidden"
                    required
                  />
                </div>

                <div>
                  <label className="block mb-2 text-gray-700 dark:text-gray-300 font-medium">Correct Answer (0-3):</label>
                  <select
                    name="correctAnswer"
                    className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-3 focus:ring-blue-500 focus:border-blue-500 outline-hidden"
                    required
                  >
                    <option value="0">Option 1</option>
                    <option value="1">Option 2</option>
                    <option value="2">Option 3</option>
                    <option value="3">Option 4</option>
                  </select>
                </div>

                <div>
                  <label className="block mb-2 text-gray-700 dark:text-gray-300 font-medium">Explanation:</label>
                  <textarea
                    name="explanation"
                    className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-3 focus:ring-blue-500 focus:border-blue-500 outline-hidden"
                    rows={3}
                    required
                  ></textarea>
                </div>

                <div>
                  <label className="block mb-2 text-gray-700 dark:text-gray-300 font-medium">Reference Title:</label>
                  <input
                    type="text"
                    name="referenceTitle"
                    className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-3 focus:ring-blue-500 focus:border-blue-500 outline-hidden"
                    required
                  />
                </div>

                <div>
                  <label className="block mb-2 text-gray-700 dark:text-gray-300 font-medium">Reference URL:</label>
                  <input
                    type="url"
                    name="referenceUrl"
                    className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-3 focus:ring-blue-500 focus:border-blue-500 outline-hidden"
                    required
                  />
                </div>

                <div>
                  <label className="block mb-2 text-gray-700 dark:text-gray-300 font-medium">Reference Copyright:</label>
                  <input
                    type="text"
                    name="referenceCopyright"
                    className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-3 focus:ring-blue-500 focus:border-blue-500 outline-hidden"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={addQuestionFetcher.state !== 'idle'}
                className="w-full px-5 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors cursor-pointer"
              >
                {addQuestionFetcher.state !== 'idle' ? 'Adding Question...' : 'Add Question'}
              </button>
            </addQuestionFetcher.Form>
          </div>
        )}

        {activeTab === 'allquestions' && (
          <>
            <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 mb-6">
              <h2 className="text-xl font-bold p-6 border-b border-gray-200 dark:border-gray-800 text-gray-900 dark:text-white">All Questions</h2>
              <div className="p-6">
                {questions.length === 0 ? (
                  <p className="text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-800 p-6 rounded-lg text-center">
                    No questions available. Add questions using the "Add Question" tab.
                  </p>
                ) : (
                  <div className="space-y-4">
                    {questions.map((question: Question) => {
                      // Find category for this question from the categories array
                      const category = categories.find((cat: Category) => cat.id === question.categoryId);
                      // Parse options from JSON string
                      const options = JSON.parse(question.options);

                      return (
                        <div key={question.id} className="bg-gray-50 dark:bg-gray-800 p-5 rounded-lg">
                          <div className="mb-3">
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{question.question}</h3>
                            <div className="mb-3">
                              {options.map((option: string, index: number) => (
                                <div
                                  key={index}
                                  className={`mb-1 p-2 rounded ${index === question.correctAnswer
                                      ? 'bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800'
                                      : 'bg-white dark:bg-gray-900/50'
                                    }`}
                                >
                                  <span className={index === question.correctAnswer ? 'font-medium' : ''}>
                                    {index === question.correctAnswer && '✓ '}{option}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>

                          <div className="bg-white dark:bg-gray-900 p-3 rounded-lg mt-2">
                            <p className="text-sm text-gray-700 dark:text-gray-300"><span className="font-medium">Explanation:</span> {question.explanation}</p>
                          </div>

                          <div className="mt-3 text-xs text-gray-500 dark:text-gray-400 flex flex-wrap justify-between items-center">
                            <div className="space-x-2">
                              <span>ID: {question.id}</span>
                              {category && (
                                <span className="px-2 py-0.5 bg-blue-50 dark:bg-blue-900/30 rounded-full text-blue-800 dark:text-blue-300 font-medium">
                                  {category.name}
                                </span>
                              )}
                            </div>
                            <span>Reference: {question.referenceTitle}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>

            {/* Simple pagination controls */}
            {pagination.totalPages > 1 && (
              <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 p-4 flex justify-center">
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handlePageChange(pagination.currentPage - 1)}
                    disabled={pagination.currentPage <= 1}
                    className="px-3 py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg disabled:opacity-50"
                  >
                    Previous
                  </button>

                  <div className="text-sm text-gray-700 dark:text-gray-300 px-3">
                    Page {pagination.currentPage} of {pagination.totalPages}
                  </div>

                  <button
                    onClick={() => handlePageChange(pagination.currentPage + 1)}
                    disabled={pagination.currentPage >= pagination.totalPages}
                    className="px-3 py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg disabled:opacity-50"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </>
        )}

        {activeTab === 'messages' && (
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800">
            <h2 className="text-xl font-bold p-6 border-b border-gray-200 dark:border-gray-800 text-gray-900 dark:text-white">Contact Messages</h2>
            <div className="p-6">
              {messages && messages.length === 0 ? (
                <p className="text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-800 p-6 rounded-lg text-center">
                  No contact messages yet.
                </p>
              ) : (
                <div className="grid grid-cols-1 gap-4">
                  {messages && messages.map((message: ContactMessage) => (
                    <div
                      key={message.id}
                      className={`bg-gray-50 dark:bg-gray-800 p-5 rounded-lg ${message.status === 'unread'
                          ? 'border-l-4 border-blue-500 dark:border-blue-700'
                          : ''
                        }`}
                    >
                      <div className="flex justify-between items-start mb-3 flex-wrap gap-2">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{message.name}</h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{message.email}</p>
                          {message.mobileNumber && (
                            <p className="text-sm text-gray-600 dark:text-gray-400">{message.mobileNumber}</p>
                          )}
                        </div>
                        <div className="flex items-center">
                          <span className={`px-2 py-1 text-xs rounded-full mr-2 ${message.status === 'unread'
                              ? 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-300'
                              : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300'
                            }`}>
                            {message.status}
                          </span>

                          <messageStatusFetcher.Form method="post">
                            <input type="hidden" name="action" value="toggle-message-status" />
                            <input type="hidden" name="messageId" value={message.id} />
                            <input type="hidden" name="currentStatus" value={message.status} />

                            {/* Desktop version (text button) */}
                            <button
                              type="submit"
                              className="hidden sm:block px-2 py-1.5 rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 transition-colors"
                              title={message.status === 'unread' ? "Mark as read" : "Mark as unread"}
                              disabled={messageStatusFetcher.state !== 'idle'}
                            >
                              {message.status === 'unread' ? 'Mark read' : 'Mark unread'}
                            </button>

                            {/* Mobile version (icon button) */}
                            <button
                              type="submit"
                              className="sm:hidden p-2 rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 transition-colors"
                              title={message.status === 'unread' ? "Mark as read" : "Mark as unread"}
                              disabled={messageStatusFetcher.state !== 'idle'}
                            >
                              {message.status === 'unread'
                                ? (
                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <polyline points="20 6 9 17 4 12"></polyline>
                                  </svg>
                                )
                                : (
                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                                    <polyline points="15 3 21 3 21 9"></polyline>
                                    <line x1="10" y1="14" x2="21" y2="3"></line>
                                  </svg>
                                )
                              }
                            </button>
                          </messageStatusFetcher.Form>
                        </div>
                      </div>
                      <div className="bg-white dark:bg-gray-900 p-3 rounded-lg mb-2">
                        <p className="text-gray-800 dark:text-gray-200 whitespace-pre-wrap">{message.message}</p>
                      </div>
                      <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">
                        Received: {new Date(message.createdAt).toLocaleString()}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}