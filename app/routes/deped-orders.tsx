import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import type { Route } from './+types/deped-orders';

export const meta: Route.MetaFunction = () => {
  return [
    { title: "NQESH Reviewer - DepEd Orders" },
    { name: "description", content: "Browse Department of Education Orders relevant for NQESH examination" },
  ];
};

interface DepEdOrder {
  id: number;
  year: number;
  orderNo: string;
  date: string;
  title: string;
  viewLink: string;
  downloadLink: string;
}

// Sample data for DepEd Orders
const sampleOrders: DepEdOrder[] = [
  {
    id: 1,
    year: 2023,
    orderNo: "DO 034, s. 2023",
    date: "2023-08-15",
    title: "Implementation of the National Qualifying Examination for School Heads (NQESH) 2023",
    viewLink: "https://www.deped.gov.ph/do-034-s-2023",
    downloadLink: "https://www.deped.gov.ph/downloads/do-034-s-2023.pdf"
  },
  {
    id: 2,
    year: 2023,
    orderNo: "DO 025, s. 2023",
    date: "2023-06-20",
    title: "Guidelines on the Hiring, Deployment, and Development of School Principals",
    viewLink: "https://www.deped.gov.ph/do-025-s-2023",
    downloadLink: "https://www.deped.gov.ph/downloads/do-025-s-2023.pdf"
  },
  {
    id: 3,
    year: 2022,
    orderNo: "DO 042, s. 2022",
    date: "2022-11-10",
    title: "Results of the 2022 National Qualifying Examination for School Heads",
    viewLink: "https://www.deped.gov.ph/do-042-s-2022",
    downloadLink: "https://www.deped.gov.ph/downloads/do-042-s-2022.pdf"
  },
  {
    id: 4,
    year: 2022,
    orderNo: "DO 018, s. 2022",
    date: "2022-05-05",
    title: "Implementation of the National Qualifying Examination for School Heads (NQESH) 2022",
    viewLink: "https://www.deped.gov.ph/do-018-s-2022",
    downloadLink: "https://www.deped.gov.ph/downloads/do-018-s-2022.pdf"
  },
  {
    id: 5,
    year: 2021,
    orderNo: "DO 031, s. 2021",
    date: "2021-09-22",
    title: "Policy Guidelines on the Implementation of Interim Performance Appraisal for School Heads",
    viewLink: "https://www.deped.gov.ph/do-031-s-2021",
    downloadLink: "https://www.deped.gov.ph/downloads/do-031-s-2021.pdf"
  },
  {
    id: 6,
    year: 2021,
    orderNo: "DO 003, s. 2021",
    date: "2021-01-15",
    title: "Creation of a Technical Working Group for the Development of NQESH Review Materials",
    viewLink: "https://www.deped.gov.ph/do-003-s-2021",
    downloadLink: "https://www.deped.gov.ph/downloads/do-003-s-2021.pdf"
  },
  {
    id: 7,
    year: 2020,
    orderNo: "DO 024, s. 2020",
    date: "2020-06-30",
    title: "Amendment to DepEd Order No. 007, s. 2020 (School Calendar and Activities for School Year 2020-2021)",
    viewLink: "https://www.deped.gov.ph/do-024-s-2020",
    downloadLink: "https://www.deped.gov.ph/downloads/do-024-s-2020.pdf"
  },
  {
    id: 8,
    year: 2020,
    orderNo: "DO 012, s. 2020",
    date: "2020-03-15",
    title: "Guidelines on the Basic Education Enrollment for School Year 2020-2021 in Light of the COVID-19 Pandemic",
    viewLink: "https://www.deped.gov.ph/do-012-s-2020",
    downloadLink: "https://www.deped.gov.ph/downloads/do-012-s-2020.pdf"
  },
  {
    id: 9,
    year: 2019,
    orderNo: "DO 037, s. 2019",
    date: "2019-11-11",
    title: "Results of the 2019 National Qualifying Examination for School Heads",
    viewLink: "https://www.deped.gov.ph/do-037-s-2019",
    downloadLink: "https://www.deped.gov.ph/downloads/do-037-s-2019.pdf"
  },
  {
    id: 10,
    year: 2019,
    orderNo: "DO 012, s. 2019",
    date: "2019-03-22",
    title: "Implementation of the National Qualifying Examination for School Heads (NQESH) 2019",
    viewLink: "https://www.deped.gov.ph/do-012-s-2019",
    downloadLink: "https://www.deped.gov.ph/downloads/do-012-s-2019.pdf"
  }
];

export default function DepEdOrders() {
  const [orders, setOrders] = useState<DepEdOrder[]>(sampleOrders);
  const [sortConfig, setSortConfig] = useState<{ key: 'year' | 'date'; direction: 'ascending' | 'descending' }>({
    key: 'year',
    direction: 'descending'
  });

  // Sort the orders when the sort configuration changes
  useEffect(() => {
    const sortedOrders = [...sampleOrders];
    sortedOrders.sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === 'ascending' ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === 'ascending' ? 1 : -1;
      }
      return 0;
    });
    
    setOrders(sortedOrders);
  }, [sortConfig]);

  // Handle sorting when a column header is clicked
  const requestSort = (key: 'year' | 'date') => {
    let direction: 'ascending' | 'descending' = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  // Helper function to get sort direction indicator
  const getSortDirectionIndicator = (key: 'year' | 'date') => {
    if (sortConfig.key !== key) return null;
    return sortConfig.direction === 'ascending' ? '↑' : '↓';
  };

  // Format date function
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-PH', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 py-8">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 p-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-blue-600 dark:text-blue-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
                <line x1="16" y1="13" x2="8" y2="13"></line>
                <line x1="16" y1="17" x2="8" y2="17"></line>
                <polyline points="10 9 9 9 8 9"></polyline>
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">DepEd Orders</h1>
            <p className="text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
              Browse Department of Education Orders that are relevant for the National Qualifying Examination for School Heads (NQESH).
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-50 dark:bg-gray-800 text-left">
                  <th 
                    className="px-4 py-3 border-b border-gray-200 dark:border-gray-700 font-medium text-gray-600 dark:text-gray-400 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    onClick={() => requestSort('year')}
                  >
                    Year {getSortDirectionIndicator('year')}
                  </th>
                  <th className="px-4 py-3 border-b border-gray-200 dark:border-gray-700 font-medium text-gray-600 dark:text-gray-400">
                    DepEd Order No.
                  </th>
                  <th 
                    className="px-4 py-3 border-b border-gray-200 dark:border-gray-700 font-medium text-gray-600 dark:text-gray-400 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    onClick={() => requestSort('date')}
                  >
                    Date {getSortDirectionIndicator('date')}
                  </th>
                  <th className="px-4 py-3 border-b border-gray-200 dark:border-gray-700 font-medium text-gray-600 dark:text-gray-400">
                    Title of DepEd Order
                  </th>
                  <th className="px-4 py-3 border-b border-gray-200 dark:border-gray-700 font-medium text-gray-600 dark:text-gray-400 text-center">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id} className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                    <td className="px-4 py-4 text-gray-700 dark:text-gray-300 whitespace-nowrap">
                      {order.year}
                    </td>
                    <td className="px-4 py-4 text-gray-700 dark:text-gray-300 whitespace-nowrap">
                      {order.orderNo}
                    </td>
                    <td className="px-4 py-4 text-gray-700 dark:text-gray-300 whitespace-nowrap">
                      {formatDate(order.date)}
                    </td>
                    <td className="px-4 py-4 text-gray-700 dark:text-gray-300">
                      {order.title}
                    </td>
                    <td className="px-4 py-4 text-center">
                      <div className="flex justify-center gap-2">
                        <a 
                          href={order.viewLink} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors"
                        >
                          View
                        </a>
                        <a 
                          href={order.downloadLink} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="px-3 py-1.5 bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg text-sm font-medium transition-colors"
                        >
                          Download
                        </a>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {orders.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-500 dark:text-gray-400">No DepEd Orders found.</p>
            </div>
          )}

          <div className="mt-8 text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Note: Click on the Year or Date column headers to sort the table.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}