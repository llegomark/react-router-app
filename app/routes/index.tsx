import { useState, useEffect } from 'react';
import { Link, href } from 'react-router';
import { organization } from "@forge42/seo-tools/structured-data/organization";
import type { Route } from './+types/index';

// Define question interface for type safety
interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  chartType?: 'bar' | 'line' | 'pie' | 'area' | 'radar' | 'composed';
  chartData?: any;
}

// Sample questions for the showcase with chart data
const sampleQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: "Based on the student performance trend chart below, which intervention strategy would be MOST appropriate for the school year 2025-2026?",
    options: [
      "Implement remedial classes focusing on Math since it shows the steepest decline",
      "Prioritize Science interventions as it has the lowest overall performance",
      "Develop a comprehensive intervention program addressing all subjects with emphasis on English",
      "Focus resources primarily on Reading as it shows inconsistent performance patterns"
    ],
    correctAnswer: 2,
    explanation: "The chart shows declining trends across all subjects, with Science consistently scoring the lowest. However, a comprehensive intervention program (option C) is the most appropriate because all subjects show concerning patterns with English having a significant recent decline. A holistic approach addressing all subjects, with particular emphasis on the areas showing the steepest recent declines (English) would be most effective for overall school improvement.",
    chartType: 'line',
    chartData: [
      { year: '2021', Math: 78, Science: 65, English: 82, Reading: 75 },
      { year: '2022', Math: 75, Science: 63, English: 80, Reading: 69 },
      { year: '2023', Math: 72, Science: 61, English: 79, Reading: 72 },
      { year: '2024', Math: 68, Science: 60, English: 73, Reading: 70 },
      { year: '2025', Math: 65, Science: 58, English: 67, Reading: 68 }
    ]
  },
  {
    id: 2,
    question: "The chart shows budget allocation across different departments in a school. As a new principal reviewing this distribution, which area requires the MOST urgent reallocation of resources to align with effective instructional leadership principles?",
    options: [
      "Increase allocation for administration to improve overall school management",
      "Redirect funds from facilities to teacher development to prioritize instruction",
      "Maintain current distribution as it appears balanced for school operations",
      "Reduce technology spending to strengthen core academic programs"
    ],
    correctAnswer: 1,
    explanation: "The chart shows that teacher development receives one of the smallest portions of the budget (8%) while facilities and administration receive significantly higher allocations. According to effective instructional leadership principles, investing in teacher development has the highest impact on student outcomes. Therefore, redirecting some resources from facilities (which receives 25%, the highest allocation) to teacher development would better align the budget with evidence-based leadership practices that prioritize instructional quality and teacher growth.",
    chartType: 'pie',
    chartData: [
      { name: 'Administration', value: 22 },
      { name: 'Facilities', value: 25 },
      { name: 'Academic Programs', value: 18 },
      { name: 'Technology', value: 15 },
      { name: 'Teacher Development', value: 8 },
      { name: 'Student Services', value: 12 }
    ]
  },
  {
    id: 3,
    question: "As a school principal analyzing the enrollment data shown in the chart, which strategic planning priority should be established for the upcoming school year?",
    options: [
      "Expand Grade 7 classrooms to accommodate growing enrollment",
      "Develop retention strategies specifically targeting the transition from Grade 8 to Grade 9",
      "Allocate additional resources to support the larger Grade 10 population",
      "Focus on recruitment efforts to increase overall enrollment across all grade levels"
    ],
    correctAnswer: 1,
    explanation: "The chart shows a significant drop in enrollment between Grade 8 and Grade 9 (from 425 to 350 students, approximately a 17.6% decrease). This pattern suggests a retention issue at this transition point. While Grade 10 has even fewer students, addressing the root cause at the Grade 8-9 transition would have a cascading positive effect on upper grades. Therefore, developing targeted retention strategies at this critical juncture would be the most strategic priority to stabilize enrollment throughout the upper grades.",
    chartType: 'bar',
    chartData: [
      { grade: 'Grade 7', male: 220, female: 230, total: 450 },
      { grade: 'Grade 8', male: 210, female: 215, total: 425 },
      { grade: 'Grade 9', male: 170, female: 180, total: 350 },
      { grade: 'Grade 10', male: 160, female: 170, total: 330 },
      { grade: 'Grade 11', male: 155, female: 165, total: 320 },
      { grade: 'Grade 12', male: 140, female: 150, total: 290 }
    ]
  },
  {
    id: 4,
    question: "The radar chart shows a school's performance across six key areas compared to district averages. Which area should the new school head prioritize for immediate improvement initiatives?",
    options: [
      "Teacher Quality, as it shows the largest positive gap above district average",
      "Student Achievement, as it represents the primary mission of education",
      "Parent Engagement, as it shows the largest negative gap below district average",
      "School Climate, as it affects all other performance areas"
    ],
    correctAnswer: 2,
    explanation: "According to the radar chart, Parent Engagement shows the largest gap below the district average (school score of 56 compared to district average of 75, representing a negative gap of 19 points). This significant shortfall indicates a critical area of weakness. Research consistently shows that parent engagement is strongly correlated with student success, and improving this area can positively impact multiple other performance domains. As a school head, addressing the area with the largest performance gap below standards should be prioritized for immediate improvement initiatives.",
    chartType: 'radar',
    chartData: [
      { category: 'Student Achievement', school: 72, district: 78 },
      { category: 'Teacher Quality', school: 85, district: 80 },
      { category: 'Curriculum Implementation', school: 68, district: 75 },
      { category: 'School Climate', school: 70, district: 72 },
      { category: 'Resource Management', school: 65, district: 70 },
      { category: 'Parent Engagement', school: 56, district: 75 }
    ]
  },
  {
    id: 5,
    question: "The composite chart shows teacher attendance rates and professional development completion across departments. Based on this data, which departmental leadership approach requires the MOST significant intervention?",
    options: [
      "Mathematics Department: Implement stricter attendance policies and simplified PD requirements",
      "Science Department: Provide targeted support for PD completion while maintaining good attendance culture",
      "English Department: Restructure both attendance monitoring and PD tracking systems completely",
      "Social Studies Department: Focus on incentivizing higher attendance while recognizing strong PD completion"
    ],
    correctAnswer: 2,
    explanation: "The English Department shows the most concerning pattern with the lowest teacher attendance rate (78%) and the second-lowest professional development completion rate (65%). This combination suggests systematic leadership issues affecting both daily operations and professional growth. The Mathematics Department has lower PD completion but maintains reasonable attendance. The Science Department needs targeted PD support but has good attendance rates. The Social Studies Department has attendance challenges but strong PD completion. Therefore, the English Department requires the most comprehensive intervention to address deficiencies in both critical areas.",
    chartType: 'composed',
    chartData: [
      { department: 'Mathematics', attendance: 85, professional_development: 60 },
      { department: 'Science', attendance: 88, professional_development: 70 },
      { department: 'English', attendance: 78, professional_development: 65 },
      { department: 'Social Studies', attendance: 82, professional_development: 85 },
      { department: 'Physical Education', attendance: 90, professional_development: 75 }
    ]
  }
];

export const meta: Route.MetaFunction = ({ location }) => {
  const url = location.pathname;
  const domain = "https://nqesh.com";
  const fullUrl = `${domain}${url}`;
  
  return [
    { title: "Prepare for the National Qualifying Examination for School Heads (NQESH) - NQESH Reviewer" },
    { name: "description", content: "Comprehensive preparation platform for the National Qualifying Examination for School Heads in the Philippines" },
    { property: "og:title", content: "Prepare for the National Qualifying Examination for School Heads (NQESH) - NQESH Reviewer" },
    { property: "og:description", content: "Comprehensive preparation platform for the National Qualifying Examination for School Heads in the Philippines" },
    { property: "og:url", content: fullUrl },
    { property: "og:type", content: "website" },
    { property: "og:image", content: `${domain}/og-image.jpg` },
    { property: "og:image:width", content: "1200" },
    { property: "og:image:height", content: "630" },
    { property: "og:image:alt", content: "NQESH Reviewer" },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:site", content: "@nqeshreviewer" },
    { name: "twitter:title", content: "Prepare for the National Qualifying Examination for School Heads (NQESH) - NQESH Reviewer" },
    { name: "twitter:description", content: "Comprehensive preparation platform for the National Qualifying Examination for School Heads" },
    { name: "twitter:image", content: `${domain}/twitter-image.jpg` },
    { rel: "canonical", href: fullUrl },
    { 
      "script:ld+json": organization({
        "@context": "https://schema.org",
        "@type": "Organization",
        "url": "https://nqesh.com",
        "sameAs": [
          "https://facebook.com/nqeshreviewer", 
          "https://twitter.com/nqeshreviewer"
        ],
        "logo": "https://nqesh.com/logo.png",
        "name": "NQESH Reviewer",
        "description": "Comprehensive preparation platform for the National Qualifying Examination for School Heads in the Philippines",
        "email": "support@nqesh.com",
        "telephone": "+63-926-021-1602"
      })
    }
  ];
};

// Create a placeholder for charts during SSR
function ChartPlaceholder({ type }: { type: string }) {
  return (
    <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700 flex items-center justify-center h-64">
      <div className="text-center">
        <div className="text-4xl mb-4">📊</div>
        <p className="text-gray-700 dark:text-gray-300 font-medium">{type} Chart</p>
        <p className="text-sm text-gray-500 dark:text-gray-400">Loading visualization...</p>
      </div>
    </div>
  );
}

// Client-side only chart renderer component
function ChartRenderer({ question }: { question: QuizQuestion }) {
  const [mounted, setMounted] = useState(false);
  const [Chart, setChart] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  
  // Colors for charts
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];
  
  useEffect(() => {
    // Only load recharts on client-side
    if (typeof window !== 'undefined') {
      import('recharts')
        .then((module) => {
          setChart(module);
          setMounted(true);
        })
        .catch((err) => {
          console.error("Failed to load Recharts:", err);
          setError("Failed to load chart library");
        });
    }
  }, []);
  
  if (error) {
    return (
      <div className="bg-red-50 dark:bg-red-900/30 p-4 rounded-lg text-center">
        <p className="text-red-700 dark:text-red-300">
          {error}. Please refresh the page to try again.
        </p>
      </div>
    );
  }
  
  if (!mounted || !Chart) {
    return <ChartPlaceholder type={question.chartType || "Data"} />;
  }
  
  // Render the appropriate chart based on question type
  switch (question.chartType) {
    case 'line':
      return (
        <Chart.ResponsiveContainer width="100%" height={300}>
          <Chart.LineChart data={question.chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <Chart.CartesianGrid strokeDasharray="3 3" />
            <Chart.XAxis dataKey="year" />
            <Chart.YAxis />
            <Chart.Tooltip />
            <Chart.Legend />
            <Chart.Line type="monotone" dataKey="Math" stroke="#0088FE" activeDot={{ r: 8 }} />
            <Chart.Line type="monotone" dataKey="Science" stroke="#00C49F" />
            <Chart.Line type="monotone" dataKey="English" stroke="#FFBB28" />
            <Chart.Line type="monotone" dataKey="Reading" stroke="#FF8042" />
          </Chart.LineChart>
        </Chart.ResponsiveContainer>
      );
    
    case 'bar':
      return (
        <Chart.ResponsiveContainer width="100%" height={300}>
          <Chart.BarChart data={question.chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <Chart.CartesianGrid strokeDasharray="3 3" />
            <Chart.XAxis dataKey="grade" />
            <Chart.YAxis />
            <Chart.Tooltip />
            <Chart.Legend />
            <Chart.Bar dataKey="male" fill="#0088FE" name="Male Students" />
            <Chart.Bar dataKey="female" fill="#FF8042" name="Female Students" />
          </Chart.BarChart>
        </Chart.ResponsiveContainer>
      );
    
    case 'pie':
      return (
        <Chart.ResponsiveContainer width="100%" height={300}>
          <Chart.PieChart>
            <Chart.Pie
              data={question.chartData}
              cx="50%"
              cy="50%"
              labelLine={true}
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
              nameKey="name"
              label={({ name, percent }: { name: string; percent: number }) => `${name}: ${(percent * 100).toFixed(0)}%`}
            >
              {question.chartData.map((entry: any, index: number) => (
                <Chart.Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Chart.Pie>
            <Chart.Tooltip />
          </Chart.PieChart>
        </Chart.ResponsiveContainer>
      );
    
    case 'radar':
      return (
        <Chart.ResponsiveContainer width="100%" height={300}>
          <Chart.RadarChart cx="50%" cy="50%" outerRadius={150} data={question.chartData}>
            <Chart.PolarGrid />
            <Chart.PolarAngleAxis dataKey="category" />
            <Chart.PolarRadiusAxis angle={30} domain={[0, 100]} />
            <Chart.Radar name="School" dataKey="school" stroke="#0088FE" fill="#0088FE" fillOpacity={0.6} />
            <Chart.Radar name="District Average" dataKey="district" stroke="#FF8042" fill="#FF8042" fillOpacity={0.6} />
            <Chart.Legend />
            <Chart.Tooltip />
          </Chart.RadarChart>
        </Chart.ResponsiveContainer>
      );
    
    case 'composed':
      return (
        <Chart.ResponsiveContainer width="100%" height={300}>
          <Chart.ComposedChart data={question.chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <Chart.CartesianGrid strokeDasharray="3 3" />
            <Chart.XAxis dataKey="department" />
            <Chart.YAxis domain={[0, 100]} />
            <Chart.Tooltip />
            <Chart.Legend />
            <Chart.Bar dataKey="attendance" name="Attendance Rate (%)" fill="#0088FE" />
            <Chart.Line type="monotone" dataKey="professional_development" name="PD Completion (%)" stroke="#FF8042" />
          </Chart.ComposedChart>
        </Chart.ResponsiveContainer>
      );
    
    default:
      return <ChartPlaceholder type="Data" />;
  }
}

// Client-side only chart showcase component
function DataVisualizationShowcase() {
  const [mounted, setMounted] = useState(false);
  const [Chart, setChart] = useState<any>(null);
  
  // Sample data for the showcase
  const performanceData = [
    { month: 'Jan', score: 65 },
    { month: 'Feb', score: 70 },
    { month: 'Mar', score: 68 },
    { month: 'Apr', score: 75 },
    { month: 'May', score: 82 },
    { month: 'Jun', score: 87 }
  ];
  
  const budgetData = [
    { name: 'Teaching', value: 45 },
    { name: 'Operations', value: 25 },
    { name: 'Admin', value: 15 },
    { name: 'Development', value: 15 }
  ];
  
  const enrollmentData = [
    { year: '2020', students: 350 },
    { year: '2021', students: 420 },
    { year: '2022', students: 480 },
    { year: '2023', students: 550 },
    { year: '2024', students: 650 },
    { year: '2025', students: 720 }
  ];
  
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
  
  useEffect(() => {
    // Only load recharts on client-side
    if (typeof window !== 'undefined') {
      import('recharts')
        .then((module) => {
          setChart(module);
          setMounted(true);
        })
        .catch((err) => {
          console.error("Failed to load Recharts:", err);
        });
    }
  }, []);
  
  if (!mounted || !Chart) {
    return (
      <div className="my-12">
        <h3 className="text-xl font-semibold mb-4 text-center text-gray-900 dark:text-white">
          Interactive Data Visualizations
        </h3>
        <p className="mb-6 text-center text-gray-700 dark:text-gray-300">
          Our Pro version includes advanced interactive charts and data visualizations to help you analyze educational data.
        </p>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <ChartPlaceholder type="Line" />
          <ChartPlaceholder type="Pie" />
          <ChartPlaceholder type="Bar" />
        </div>
      </div>
    );
  }
  
  return (
    <div className="my-12">
      <h3 className="text-xl font-semibold mb-4 text-center text-gray-900 dark:text-white">
        Interactive Data Visualizations
      </h3>
      <p className="mb-6 text-center text-gray-700 dark:text-gray-300">
        Our Pro version includes advanced interactive charts and data visualizations to help you analyze educational data.
      </p>
      
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-gray-900 p-4 rounded-lg border border-gray-200 dark:border-gray-800">
          <Chart.ResponsiveContainer width="100%" height={200}>
            <Chart.LineChart data={performanceData}>
              <Chart.CartesianGrid strokeDasharray="3 3" />
              <Chart.XAxis dataKey="month" />
              <Chart.YAxis />
              <Chart.Tooltip />
              <Chart.Line type="monotone" dataKey="score" stroke="#0088FE" activeDot={{ r: 8 }} />
            </Chart.LineChart>
          </Chart.ResponsiveContainer>
          <p className="mt-3 text-center text-gray-600 dark:text-gray-400 text-sm">Performance Tracking</p>
        </div>
        
        <div className="bg-white dark:bg-gray-900 p-4 rounded-lg border border-gray-200 dark:border-gray-800">
          <Chart.ResponsiveContainer width="100%" height={200}>
            <Chart.PieChart>
              <Chart.Pie
                data={budgetData}
                cx="50%"
                cy="50%"
                innerRadius={40}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {budgetData.map((entry, index) => (
                  <Chart.Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Chart.Pie>
              <Chart.Tooltip />
            </Chart.PieChart>
          </Chart.ResponsiveContainer>
          <p className="mt-3 text-center text-gray-600 dark:text-gray-400 text-sm">Budget Allocation</p>
        </div>
        
        <div className="bg-white dark:bg-gray-900 p-4 rounded-lg border border-gray-200 dark:border-gray-800">
          <Chart.ResponsiveContainer width="100%" height={200}>
            <Chart.BarChart data={enrollmentData}>
              <Chart.CartesianGrid strokeDasharray="3 3" />
              <Chart.XAxis dataKey="year" />
              <Chart.YAxis />
              <Chart.Tooltip />
              <Chart.Bar dataKey="students" fill="#00C49F" />
            </Chart.BarChart>
          </Chart.ResponsiveContainer>
          <p className="mt-3 text-center text-gray-600 dark:text-gray-400 text-sm">Enrollment Trends</p>
        </div>
      </div>
    </div>
  );
}

function QuestionShowcase({ question, onQuestionAnswered }: { 
  question: QuizQuestion; 
  onQuestionAnswered: (questionIndex: number) => void;
}) {
  // Wrap useState in a try-catch to handle potential React initialization errors
  let selectedAnswerState;
  try {
    selectedAnswerState = useState<number | null>(null);
  } catch (error) {
    console.error("Error initializing React hook:", error);
    return (
      <div className="bg-red-50 dark:bg-red-900 p-6 rounded-xl text-red-800 dark:text-red-200">
        There was an error loading this component. Please refresh the page.
      </div>
    );
  }
  
  const [selectedAnswer, setSelectedAnswer] = selectedAnswerState;
  const hasAnswered = selectedAnswer !== null;
  
  const handleAnswerSelect = (optionIndex: number) => {
    if (!hasAnswered) {
      setSelectedAnswer(optionIndex);
      // Notify parent component that this question has been answered
      onQuestionAnswered(question.id);
    }
  };
  
  return (
    <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800">
      <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">{question.question}</h3>
      
      {/* Chart Area - Client-Side Only Rendering */}
      {question.chartType && (
        <div className="mb-6 bg-gray-50 dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
          <ChartRenderer question={question} />
          <p className="mt-3 text-xs text-center text-gray-500 dark:text-gray-400">
            {question.chartType === 'line' && "Student Performance Trends (2021-2025)"}
            {question.chartType === 'bar' && "Student Enrollment by Grade Level and Gender"}
            {question.chartType === 'pie' && "School Budget Allocation (% of Total Budget)"}
            {question.chartType === 'radar' && "School Performance vs District Average (Score out of 100)"}
            {question.chartType === 'composed' && "Teacher Attendance and Professional Development Completion by Department"}
          </p>
        </div>
      )}
      
      <div className="space-y-3 mb-6">
        {question.options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleAnswerSelect(index)}
            disabled={hasAnswered}
            className={`w-full text-left p-4 rounded-lg border transition-colors cursor-pointer ${
              hasAnswered
                ? index === question.correctAnswer
                  ? 'bg-green-50 dark:bg-green-950 border-green-500 text-green-900 dark:text-green-300'
                  : index === selectedAnswer
                    ? 'bg-red-50 dark:bg-red-950 border-red-500 text-red-900 dark:text-red-300'
                    : 'bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300'
                : 'bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
            } ${hasAnswered ? 'cursor-default' : 'cursor-pointer'}`}
          >
            {option}
          </button>
        ))}
      </div>
      
      {hasAnswered && (
        <div className="p-4 bg-blue-50 dark:bg-blue-950 rounded-lg border border-blue-200 dark:border-blue-900">
          <h4 className="font-semibold mb-2 text-blue-900 dark:text-blue-300">Explanation:</h4>
          <p className="text-gray-700 dark:text-gray-300">{question.explanation}</p>
        </div>
      )}
    </div>
  );
}

export default function Landing() {
  // Wrap useState in a try-catch to handle potential React initialization errors
  let currentQuestionIndexState;
  try {
    currentQuestionIndexState = useState(0);
  } catch (error) {
    console.error("Error initializing React hook:", error);
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 py-8 md:py-12">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="bg-red-50 dark:bg-red-900 p-6 rounded-xl text-red-800 dark:text-red-200 text-center">
            <h1 className="text-2xl font-bold mb-4">Application Error</h1>
            <p>There was an error loading this page. Please refresh the browser.</p>
            <button 
              onClick={() => window.location.reload()}
              className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 cursor-pointer"
            >
              Refresh Page
            </button>
          </div>
        </div>
      </div>
    );
  }
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = currentQuestionIndexState;
  
  // Track whether all questions have been viewed
  let hasSeenAllQuestionsState;
  try {
    hasSeenAllQuestionsState = useState(false);
  } catch (error) {
    console.error("Error initializing React hook:", error);
    return null;
  }
  const [hasSeenAllQuestions, setHasSeenAllQuestions] = hasSeenAllQuestionsState;
  
  // Keep track of which questions the user has answered
  let answeredQuestionsState;
  try {
    answeredQuestionsState = useState<Set<number>>(new Set()); // Start with empty set - no questions answered
  } catch (error) {
    console.error("Error initializing React hook:", error);
    return null;
  }
  const [answeredQuestions, setAnsweredQuestions] = answeredQuestionsState;
  
  // Track how many times we've cycled through all questions
  let cycleCountState;
  try {
    cycleCountState = useState(0);
  } catch (error) {
    console.error("Error initializing React hook:", error);
    return null;
  }
  const [cycleCount, setCycleCount] = useState(0);

  const nextQuestion = () => {
    // Check if we're about to loop back to the beginning
    const newIndex = (currentQuestionIndex + 1) % sampleQuestions.length;
    if (newIndex === 0) {
      // We've completed a full cycle through the questions
      setCycleCount(prev => prev + 1);
    }
    
    setCurrentQuestionIndex(newIndex);
    
    // Only show the upsell if:
    // 1. We've completed at least 1 full cycle (gone through all questions)
    // 2. The user has answered all questions
    if (cycleCount >= 1 && answeredQuestions.size === sampleQuestions.length) {
      setHasSeenAllQuestions(true);
    }
  };
  
  // Function to handle when a question is answered
  const handleQuestionAnswered = (questionId: number) => {
    // Add this question to the answered questions set
    const newAnsweredQuestions = new Set(answeredQuestions);
    newAnsweredQuestions.add(questionId);
    setAnsweredQuestions(newAnsweredQuestions);
    
    // If this is the last question and we've seen all questions, show upsell next
    if (answeredQuestions.size === sampleQuestions.length - 1) {
      // We now have all questions answered
      if (cycleCount >= 1) {
        setHasSeenAllQuestions(true);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 py-8 md:py-12">
      <div className="container mx-auto px-4 max-w-5xl">
        {/* Enhanced Hero Section with gradient background */}
        <div className="bg-gradient-to-br from-blue-600 to-blue-800 dark:from-blue-800 dark:to-blue-950 rounded-xl shadow-lg overflow-hidden mb-12">
          <div className="p-8 md:p-12">
            <div className="flex flex-col items-center text-center mb-8">
              <span className="text-6xl mb-6">🏫</span>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">NQESH Reviewer</h1>
              <p className="text-xl font-medium mb-4 text-blue-100">
                Empower Your Journey to Educational Leadership
              </p>
              <p className="text-blue-100 mb-8 max-w-2xl">
                Prepare effectively for the National Qualifying Examination for School Heads 
                with our comprehensive review platform designed specifically for Filipino 
                educators seeking leadership positions.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  to={href("/reviewer")}
                  className="px-8 py-4 bg-white hover:bg-gray-100 text-blue-600 font-bold rounded-lg transition-colors text-center shadow-md cursor-pointer"
                >
                  Start Reviewing Now
                </Link>
                <Link 
                  to={href("/about")}
                  className="px-8 py-4 bg-blue-700 hover:bg-blue-600 text-white rounded-lg font-bold transition-colors text-center border border-blue-500 cursor-pointer"
                >
                  Learn More
                </Link>
              </div>
            </div>
            
            {/* Stats Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-12">
              <div className="bg-white/10 rounded-lg p-4 text-center">
                <div className="text-3xl font-bold text-white mb-1">7,000+</div>
                <div className="text-blue-100">Educators Prepared</div>
              </div>
              <div className="bg-white/10 rounded-lg p-4 text-center">
                <div className="text-3xl font-bold text-white mb-1">1,000+</div>
                <div className="text-blue-100">Practice Questions</div>
              </div>
              <div className="bg-white/10 rounded-lg p-4 text-center">
                <div className="text-3xl font-bold text-white mb-1">85%</div>
                <div className="text-blue-100">Pass Rate</div>
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Question Showcase */}
        <div className="mb-12">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">Try a Sample Question</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-2">
              Experience the NQESH reviewer firsthand. Select an answer to see the explanation!
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-8">
              Question {currentQuestionIndex + 1} of {sampleQuestions.length} • {answeredQuestions.size} of {sampleQuestions.length} answered
            </p>
          </div>
          
          {hasSeenAllQuestions ? (
            <div className="bg-gradient-to-br from-blue-600 to-purple-600 dark:from-blue-800 dark:to-purple-800 rounded-xl shadow-lg overflow-hidden mb-6 p-8 text-white">
              <div className="flex flex-col items-center">
                <div className="bg-white/20 p-4 rounded-full mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 7h-9"></path>
                    <path d="M14 17H5"></path>
                    <circle cx="17" cy="17" r="3"></circle>
                    <circle cx="7" cy="7" r="3"></circle>
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-4">Unlock the Full Experience!</h3>
                <p className="text-center mb-6 text-blue-100 max-w-lg">
                  Great job working through our challenging sample questions! Ready to access our full database of 1,000+ NQESH practice questions with advanced data visualization and detailed explanations?
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-md">
                  <Link 
                    to={href("/pricing")} 
                    className="px-6 py-3 bg-white text-blue-600 hover:bg-gray-100 rounded-lg font-bold transition-colors text-center shadow-lg cursor-pointer"
                  >
                    See Plans
                  </Link>
                  <button 
                    onClick={() => {
                      setHasSeenAllQuestions(false);
                      setCurrentQuestionIndex(0);
                      setCycleCount(0);
                      setAnsweredQuestions(new Set());
                    }}
                    className="px-6 py-3 bg-blue-500 hover:bg-blue-400 text-white border border-blue-400 rounded-lg font-medium transition-colors text-center cursor-pointer"
                  >
                    Try More Samples
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="mb-6">
              {/* Adding a key prop that changes with currentQuestionIndex to reset component state */}
              <QuestionShowcase 
                key={currentQuestionIndex} 
                question={sampleQuestions[currentQuestionIndex]}
                onQuestionAnswered={handleQuestionAnswered}
              />
            </div>
          )}
          
          {!hasSeenAllQuestions && (
            <div className="text-center">
              <button 
                onClick={nextQuestion}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors inline-flex items-center cursor-pointer"
              >
                <span>Try Another Question</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14"></path>
                  <path d="m12 5 7 7-7 7"></path>
                </svg>
              </button>
            </div>
          )}
        </div>

        {/* Client-side only chart showcase */}
        <DataVisualizationShowcase />

        {/* Enhanced Features Section */}
        <div className="mb-12">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">Why Choose NQESH Reviewer</h2>
            <p className="text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
              Our platform is developed by educational experts with a deep understanding 
              of the NQESH requirements and the Philippine educational system.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 p-6 hover:shadow-md transition-shadow">
              <div className="bg-blue-50 dark:bg-blue-950 w-14 h-14 rounded-xl flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-blue-600 dark:text-blue-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Comprehensive Content</h3>
              <p className="text-gray-700 dark:text-gray-300">
                Access questions and materials covering all domains required for the NQESH examination, meticulously researched and updated.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 p-6 hover:shadow-md transition-shadow">
              <div className="bg-blue-50 dark:bg-blue-950 w-14 h-14 rounded-xl flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-blue-600 dark:text-blue-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <polyline points="12 6 12 12 16 14"></polyline>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Timed Practice</h3>
              <p className="text-gray-700 dark:text-gray-300">
                Practice under exam-like conditions with our timed quizzes, helping you build the speed and confidence needed for the actual examination.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 p-6 hover:shadow-md transition-shadow">
              <div className="bg-blue-50 dark:bg-blue-950 w-14 h-14 rounded-xl flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-blue-600 dark:text-blue-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                  <line x1="8" y1="21" x2="16" y2="21"></line>
                  <line x1="12" y1="17" x2="12" y2="21"></line>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Mobile-Friendly</h3>
              <p className="text-gray-700 dark:text-gray-300">
                Study anytime, anywhere with our responsive design that works perfectly on desktops, tablets, and mobile phones.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 p-6 hover:shadow-md transition-shadow">
              <div className="bg-blue-50 dark:bg-blue-950 w-14 h-14 rounded-xl flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-blue-600 dark:text-blue-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="12" y1="2" x2="12" y2="6"></line>
                  <line x1="12" y1="18" x2="12" y2="22"></line>
                  <line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line>
                  <line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line>
                  <line x1="2" y1="12" x2="6" y2="12"></line>
                  <line x1="18" y1="12" x2="22" y2="12"></line>
                  <line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line>
                  <line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Detailed Explanations</h3>
              <p className="text-gray-700 dark:text-gray-300">
                Every question comes with comprehensive explanations and reliable references for deeper understanding of concepts.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 p-6 hover:shadow-md transition-shadow">
              <div className="bg-blue-50 dark:bg-blue-950 w-14 h-14 rounded-xl flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-blue-600 dark:text-blue-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="22 12 16 12 14 15 10 15 8 12 2 12"></polyline>
                  <path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Organized Categories</h3>
              <p className="text-gray-700 dark:text-gray-300">
                Study specific areas of the exam with our organized category system for targeted preparation and improved learning.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 p-6 hover:shadow-md transition-shadow">
              <div className="bg-blue-50 dark:bg-blue-950 w-14 h-14 rounded-xl flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-blue-600 dark:text-blue-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 20h9"></path>
                  <path d="M12 4h9"></path>
                  <path d="M12 12h9"></path>
                  <path d="M3 20l2-2 2 2"></path>
                  <path d="M3 4l2 2 2-2"></path>
                  <path d="M3 12l2-2 2 2"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Performance Tracking</h3>
              <p className="text-gray-700 dark:text-gray-300">
                Monitor your progress and identify areas for improvement with our results analysis and performance metrics.
              </p>
            </div>
          </div>
        </div>

        {/* Testimonials Section */}
        <div className="mb-12 bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 overflow-hidden">
          <div className="p-8">
            <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-8">
              What Our Users Say
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
                <div className="flex items-center mb-4">
                  <div className="h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-xl font-bold text-blue-600 dark:text-blue-400 mr-4">
                    MR
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white">Maria Reyes</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Passed NQESH 2023</p>
                  </div>
                </div>
                <p className="text-gray-700 dark:text-gray-300 italic">
                  "NQESH Reviewer was instrumental in my success. The comprehensive question bank and detailed explanations helped me understand complex concepts. I recommend it to all aspiring school heads!"
                </p>
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
                <div className="flex items-center mb-4">
                  <div className="h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-xl font-bold text-blue-600 dark:text-blue-400 mr-4">
                    JD
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white">Juan Dela Cruz</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">School Principal</p>
                  </div>
                </div>
                <p className="text-gray-700 dark:text-gray-300 italic">
                  "The timed practice tests were exactly what I needed to build my confidence. The platform's user-friendly interface made studying efficient and effective. Now I'm leading my own school!"
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced CTA Section with gradient background */}
        <div className="bg-gradient-to-br from-blue-600 to-blue-800 dark:from-blue-800 dark:to-blue-950 rounded-xl shadow-sm p-10 text-center">
          <h2 className="text-3xl font-bold mb-4 text-white">Ready to Excel in Your NQESH Journey?</h2>
          <p className="mb-8 max-w-2xl mx-auto text-blue-100">
            Join thousands of aspiring school leaders who have successfully prepared for the NQESH examination with our comprehensive reviewer.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link 
              to="/reviewer" 
              className="px-8 py-4 bg-white text-blue-600 hover:bg-gray-100 rounded-lg font-bold transition-colors shadow-lg cursor-pointer"
            >
              Start Reviewing Now
            </Link>
            <Link 
              to="/pricing" 
              className="px-8 py-4 bg-blue-700 hover:bg-blue-600 text-white border border-blue-500 rounded-lg font-bold transition-colors cursor-pointer"
            >
              View Pricing Plans
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}