import { useState } from 'react';
import { data } from 'react-router';
import * as schema from '~/database/schema';

export function meta() {
  return [
    { title: "Quiz Admin Panel" },
    { name: "description", content: "Manage quiz categories and questions" },
  ];
}

export async function loader({ context }: any) {
  try {
    const categories = await context.db.query.categories.findMany();
    return { categories };
  } catch (error) {
    console.error("Failed to load categories:", error);
    return { categories: [], error: "Failed to load categories" };
  }
}

export async function action({ context, request }: any) {
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
        return data({ success: false, message: "All fields are required" }, { status: 400 });
      }
      
      await context.db.insert(schema.categories).values({
        id, name, description, icon
      });
      
      return data({ success: true, message: "Category added successfully" });
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
        return data({ success: false, message: "All fields are required and must be valid" }, { status: 400 });
      }
      
      if (!isValidUrl(referenceUrl)) {
        return data({ 
          success: false, 
          message: "Reference URL must be a valid URL format" 
        }, { status: 400 });
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
      
      return data({ success: true, message: "Question added successfully" });
    }
    
    return data({ success: false, message: "Unknown action" }, { status: 400 });
  } catch (error: any) {
    console.error("Action error:", error);
    return data({ 
      success: false, 
      message: `Error: ${error?.message || "Unknown error"}` 
    }, { status: 500 });
  }
}

export default function Admin({ loaderData, actionData }: any) {
  const { categories } = loaderData;
  const [activeTab, setActiveTab] = useState('categories');
  
  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <h1 className="text-3xl font-bold mb-4 text-center">Quiz Admin Panel</h1>
      
      {actionData && (
        <div className={`p-4 mb-4 rounded-lg ${
          actionData.success 
            ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200' 
            : 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200'
        }`}>
          {actionData.message}
        </div>
      )}
      
      <div className="mb-6">
        <div className="flex border-b border-gray-200 dark:border-gray-700">
          <button 
            className={`py-2 px-4 font-medium ${activeTab === 'categories' ? 'border-b-2 border-blue-500' : ''}`}
            onClick={() => setActiveTab('categories')}
          >
            Categories
          </button>
          <button 
            className={`py-2 px-4 font-medium ${activeTab === 'questions' ? 'border-b-2 border-blue-500' : ''}`}
            onClick={() => setActiveTab('questions')}
          >
            Questions
          </button>
        </div>
      </div>
      
      {activeTab === 'categories' && (
        <div>
          <h2 className="text-xl font-bold mb-4">Add New Category</h2>
          <form method="post" className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow mb-6">
            <input type="hidden" name="action" value="add-category" />
            <div className="grid grid-cols-1 gap-4 mb-4">
              <div>
                <label className="block mb-1">ID (numeric):</label>
                <input 
                  type="number" 
                  name="id" 
                  className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                  required
                />
              </div>
              
              <div>
                <label className="block mb-1">Name:</label>
                <input 
                  type="text" 
                  name="name" 
                  className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                  required
                />
              </div>
              
              <div>
                <label className="block mb-1">Description:</label>
                <textarea 
                  name="description" 
                  className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                  rows={3}
                  required
                ></textarea>
              </div>
              
              <div>
                <label className="block mb-1">Icon (emoji):</label>
                <input 
                  type="text" 
                  name="icon" 
                  className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                  placeholder="🏫"
                  required
                />
              </div>
            </div>
            
            <button 
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 cursor-pointer"
            >
              Add Category
            </button>
          </form>
          
          <h2 className="text-xl font-bold mb-4">Existing Categories</h2>
          {categories.length === 0 ? (
            <p>No categories yet. Add one above!</p>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {categories.map((category: any) => (
                <div key={category.id} className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
                  <div className="flex items-center mb-2">
                    <span className="text-3xl mr-3">{category.icon}</span>
                    <h3 className="text-lg font-semibold">{category.name}</h3>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-300">{category.description}</p>
                  <p className="text-xs text-gray-500 mt-2">ID: {category.id}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
      
      {activeTab === 'questions' && (
        <div>
          <h2 className="text-xl font-bold mb-4">Add New Question</h2>
          <form method="post" className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow mb-6">
            <input type="hidden" name="action" value="add-question" />
            <div className="grid grid-cols-1 gap-4 mb-4">
              <div>
                <label className="block mb-1">ID (numeric):</label>
                <input 
                  type="number" 
                  name="id" 
                  className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                  required
                />
              </div>
              
              <div>
                <label className="block mb-1">Category:</label>
                <select 
                  name="categoryId" 
                  className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                  required
                >
                  <option value="">Select a category</option>
                  {categories.map((category: any) => (
                    <option key={category.id} value={category.id}>{category.name}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block mb-1">Question:</label>
                <textarea 
                  name="question" 
                  className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                  rows={3}
                  required
                ></textarea>
              </div>
              
              <div>
                <label className="block mb-1">Option 1:</label>
                <input 
                  type="text" 
                  name="option1" 
                  className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                  required
                />
              </div>
              
              <div>
                <label className="block mb-1">Option 2:</label>
                <input 
                  type="text" 
                  name="option2" 
                  className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                  required
                />
              </div>
              
              <div>
                <label className="block mb-1">Option 3:</label>
                <input 
                  type="text" 
                  name="option3" 
                  className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                  required
                />
              </div>
              
              <div>
                <label className="block mb-1">Option 4:</label>
                <input 
                  type="text" 
                  name="option4" 
                  className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                  required
                />
              </div>
              
              <div>
                <label className="block mb-1">Correct Answer (0-3):</label>
                <select 
                  name="correctAnswer" 
                  className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                  required
                >
                  <option value="0">Option 1</option>
                  <option value="1">Option 2</option>
                  <option value="2">Option 3</option>
                  <option value="3">Option 4</option>
                </select>
              </div>
              
              <div>
                <label className="block mb-1">Explanation:</label>
                <textarea 
                  name="explanation" 
                  className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                  rows={3}
                  required
                ></textarea>
              </div>
              
              <div>
                <label className="block mb-1">Reference Title:</label>
                <input 
                  type="text" 
                  name="referenceTitle" 
                  className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                  required
                />
              </div>
              
              <div>
                <label className="block mb-1">Reference URL:</label>
                <input 
                  type="url" 
                  name="referenceUrl" 
                  className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                  required
                />
              </div>
              
              <div>
                <label className="block mb-1">Reference Copyright:</label>
                <input 
                  type="text" 
                  name="referenceCopyright" 
                  className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                  required
                />
              </div>
            </div>
            
            <button 
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 cursor-pointer"
            >
              Add Question
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
