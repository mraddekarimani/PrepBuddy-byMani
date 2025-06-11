import React from 'react';
import { Lightbulb } from 'lucide-react';

const tips = [
  'Break large tasks into smaller, manageable ones',
  'Stay consistent to build your streak',
  'Prioritize tasks with high impact on your placement',
  'Set clear, achievable goals for each day',
  'Use categories to organize different areas of preparation',
  'Reflect on your progress daily and adjust as needed'
];

const TipsSection: React.FC = () => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-5">
      <div className="flex items-center mb-4">
        <Lightbulb className="h-5 w-5 text-amber-500 mr-2" />
        <h3 className="text-lg font-medium">Tips for Success</h3>
      </div>
      
      <ul className="space-y-3">
        {tips.map((tip, index) => (
          <li key={index} className="flex items-start">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 mr-2"></span>
            <span className="text-sm text-gray-700 dark:text-gray-300">{tip}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TipsSection;